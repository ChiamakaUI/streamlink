// @ts-nocheck
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const createSocketServer = require("./app/websocket/server.ts");
const { PrismaClient } = require("@prisma/client")

 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
const db = new PrismaClient()

const appCallback = async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
 
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }

const initApp = async () => {
    const server = await createServer(appCallback);

    server.once('error', (err) => {
        console.error(err)
        process.exit(1)
      });

    createSocketServer(server, db)

    server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
    })
}
 
app.prepare().then(initApp)

