import ProductCounter from "./ProductCounter";

type Product = {
  image: string;
  name: string;
  price: number;
  // streamType: string;
  // liveStreamName: string;
  userId: string;
  id: string;
};

type ProductCardProps = {
  product: Product;
  bidFunc: Function;
};

const ProductCard = ({ product, bidFunc, type }: ProductCardProps) => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const bid = {
    productId: product.id,
    userId: currentUser.id,
    price: product.price + 100,
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-between my-2 w-full p-2 absolute z-40 top-20">
        <div className="flex flex-row items-center justify-betwee w-[80%] mx-auto bg-white text-black p-2 rounded-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-[78px] h-[78px] rounded-lg border mr-4"
          />
          <div className="flex flex-col border">
            <p>{product.name}</p>
            {/* <p>{product.productDesc}</p> */}
            <p>{product.price}</p>
          </div>
        </div>
      </div>
      {/* <button onClick={() => bidFunc(bid)}>Bid </button> */}
      {type === "buyer" && (
        <div className="fixed bottom-0 w-full z-40 bg-modal-black p-3.5">
          <ProductCounter price={product.price} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
