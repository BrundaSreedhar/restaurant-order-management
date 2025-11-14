function Cart({ cart, onRemove, onUpdateQuantity, totalPrice }) {
  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2>Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2>Cart ({cart.length})</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <button
                className="quantity-button"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                className="quantity-button"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="remove-button"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
            <p className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  )
}

export default Cart

