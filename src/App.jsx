import { useState } from 'react'
import ItemList from './components/ItemList'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Restaurant Menu</h1>
      </header>
      <div className="app-content">
        <ItemList onAddToCart={addToCart} />
        <Cart
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          totalPrice={getTotalPrice()}
        />
      </div>
    </div>
  )
}

export default App

