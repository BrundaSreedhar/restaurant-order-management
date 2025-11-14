import { useState } from 'react'

const menuItems = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, description: 'Classic tomato and mozzarella' },
  { id: 2, name: 'Pepperoni Pizza', price: 14.99, description: 'Pepperoni and cheese' },
  { id: 3, name: 'Caesar Salad', price: 9.99, description: 'Fresh romaine with caesar dressing' },
  { id: 4, name: 'Chicken Burger', price: 11.99, description: 'Grilled chicken with vegetables' },
  { id: 5, name: 'Pasta Carbonara', price: 13.99, description: 'Creamy pasta with bacon' },
  { id: 6, name: 'Fish & Chips', price: 15.99, description: 'Battered fish with fries' },
  { id: 7, name: 'Chocolate Cake', price: 6.99, description: 'Rich chocolate dessert' },
  { id: 8, name: 'Ice Cream', price: 4.99, description: 'Vanilla ice cream' },
  { id: 9, name: 'Spaghetti', price: 14.00, description: 'Authentic Spaghetti' },
]

function ItemList({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="item-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="items-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="item-card">
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <p className="item-price">${item.price.toFixed(2)}</p>
            </div>
            <button
              className="add-button"
              onClick={() => onAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList

