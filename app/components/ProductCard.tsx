import ProductCounter from "./ProductCounter";
import { useQuery } from "@tanstack/react-query";
import { getCurrentProduct } from "@/actions/product";

// type Product = {
//   image: string;
//   name: string;
//   price: number;
//   streamType: string;
//   liveStreamName: string;
//   userId: string;
//   id: string;
//   auctionEnded?: string
//   auctionStarted?: string
//   description?: string
// };

type ProductCardProps = {
  // product: Product;
  bidFunc?: Function;
  type: string;
  meetingId: string;
};
// {
//   id: 'cluii93jf000310nkwk0rz6ae',
//   image: 'https://res.cloudinary.com/adaeze/image/upload/v1712069916/fyppmuvoegurifoxa86g.jpg',
//   name: 'Chicken Suya',
//   userId: 'clu9s9b9a00005epzafrp6wic',
//   price: 3500,
//   streamType: 'auction',
//   description: '',
//   liveStreamName: 'u1ev-j7yg-q7mv',
//   auctionStarted: 2024-04-02T15:02:40.042Z,
//   auctionEnded: 2024-04-02T15:02:41.561Z
// }

const ProductCard = ({ bidFunc, type, meetingId }: ProductCardProps) => {
  // const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // const bid = {
  //   productId: product.id,
  //   userId: currentUser.id,
  //   price: product.price + 100,
  // };

  const { data, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const data = await getCurrentProduct(meetingId)
      return data
    },
    refetchInterval: 60000,
    })

    console.log({data})
    console.log({error})
  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-between my-2 w-full p-2 absolute z-40 top-20">
        <div className="flex flex-row items-center justify-betwee w-[80%] mx-auto bg-white text-black p-2 rounded-md">
          <img
            src={data?.image}
            alt={data?.name}
            className="w-[78px] h-[78px] rounded-lg border mr-4"
          />
          <div className="flex flex-col border">
            <p>{data?.name}</p>
            {/* <p>{data?.description}</p> */}
            <p>{data?.price}</p>
          </div>
        </div>
      </div>
      {/* <button onClick={() => bidFunc(bid)}>Bid </button> */}
      {type === "buyer" && (
        <div className="fixed bottom-0 w-full z-40 bg-modal-black p-3.5">
          <ProductCounter price={data?.price ?? 0} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
