
const ProductCard = ({ product, bidFunc }) => {

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