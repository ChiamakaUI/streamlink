"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type Product = {
  image: string;
  name: string;
  price: number;
  streamType: string;
  liveStreamName: string;
  userId: string;
};

export const createProduct = async (values: Product[]) => {
  const res = await db.product.createMany({
    data: values,
  });
  console.log(res)
  // revalidatePath("/(room)/[id]", "layout");
  return res;
};

export const getProductsByUserId = async (id: string) => {
  const products = await db.product.findMany({
    where: {
      userId: id,
    },
  });
  return products;
};

export const getProductsByStream = async (streamId: string) => {
  const products = await db.product.findMany({
    where: {
      liveStreamName: streamId,
    },
  });
  // console.log(products)
  // revalidatePath("/(room)/[id]", "page")
  return products;
};

export const getProductsByAuction = async (streamId: string) => {
  const products = await db.product.findMany({
    where: {
      liveStreamName: streamId,
      streamType: "auction",
    },
  });
  // console.log(products)
  return products;
};

export const getCurrentProduct = async (streamId: string) => {
  console.log("heyyyy from product")
  const product = await db.product.findFirst({
    where: {
      streamType: "auction",
      liveStreamName: streamId,
      auctionEnded: null,
      auctionStarted: {
        not: null
      },
    }
  });

  console.log(product);
  console.log("byeee from product")
  // const testProducts = await getProductsByAuction(streamId)
  // console.log(testProducts)
  return product;
};
// export const getCurrentProduct = async (id: string) => {
//   const products = getProductsByAuction(id)

// }   revalidatePath("/(room)/[id]", "page")

// import { revalidatePath } from 'next/cache'
// revalidatePath('/blog/[slug]', 'page')
// // or with route groups
// revalidatePath('/(main)/post/[slug]', 'page')
