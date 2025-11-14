import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the restaurant menu header', () => {
    render(<App />)
    expect(screen.getByText('Restaurant Menu')).toBeInTheDocument()
  })

  it('displays menu items', () => {
    render(<App />)
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
    expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument()
  })

  it('adds item to cart when Add to Cart is clicked', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])

    expect(screen.getByText('Cart (1)')).toBeInTheDocument()
    // Verify the item appears in the cart by checking within the cart container
    const cart = screen.getByText('Cart (1)').closest('.cart')
    expect(cart).toBeInTheDocument()
    const cartWithin = within(cart)
    expect(cartWithin.getByText('Margherita Pizza')).toBeInTheDocument()
  })

  it('increments quantity when adding same item multiple times', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    const margheritaButton = addButtons[0]
    
    fireEvent.click(margheritaButton)
    fireEvent.click(margheritaButton)

    const quantities = screen.getAllByText('2')
    expect(quantities.length).toBeGreaterThan(0)
  })

  it('updates cart total when items are added', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0]) // Margherita Pizza $12.99

    expect(screen.getByText(/Total: \$12\.99/)).toBeInTheDocument()
  })

  it('removes item from cart when remove button is clicked', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])

    expect(screen.getByText('Cart (1)')).toBeInTheDocument()

    const removeButton = screen.getByText('Remove')
    fireEvent.click(removeButton)

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('updates quantity when increment button is clicked', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])

    const incrementButtons = screen.getAllByText('+')
    fireEvent.click(incrementButtons[0])

    const quantities = screen.getAllByText('2')
    expect(quantities.length).toBeGreaterThan(0)
  })

  it('updates quantity when decrement button is clicked', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])
    fireEvent.click(addButtons[0]) // Quantity = 2

    const decrementButtons = screen.getAllByText('-')
    fireEvent.click(decrementButtons[0])

    const quantities = screen.getAllByText('1')
    expect(quantities.length).toBeGreaterThan(0)
  })

  it('removes item when quantity is decremented to zero', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0]) // Quantity = 1

    const decrementButtons = screen.getAllByText('-')
    fireEvent.click(decrementButtons[0])

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('calculates total correctly for multiple items', () => {
    render(<App />)
    
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0]) // Margherita Pizza $12.99
    fireEvent.click(addButtons[2]) // Caesar Salad $9.99

    expect(screen.getByText(/Total: \$22\.98/)).toBeInTheDocument()
  })
})

