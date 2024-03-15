
type Product = {
  image: string;
  name: string;
  price: number;
  streamType: string;
  liveStreamName: string;
  userId: string;
  id: string;
}

type ProductCardProps = {
  product: Product;
  bidFunc: Function;
}

const ProductCard = ({ product, bidFunc }: ProductCardProps) => {

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    
    const bid = {
        productId: product.id,
        userId: currentUser.id,
        price: product.price + 100,
      };

  return (
       <div className="border p-5">
      <p>{product.price}</p>

      <button onClick={() => bidFunc(bid)}>Bid </button>
    </div>
  )
}

export default ProductCard