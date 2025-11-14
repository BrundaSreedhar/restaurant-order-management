import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Cart from '../components/Cart'

describe('Cart', () => {
  it('displays empty cart message when cart is empty', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()

    render(
      <Cart
        cart={[]}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={0}
      />
    )

    expect(screen.getByText('Cart')).toBeInTheDocument()
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('displays cart items when cart has items', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()
    const cart = [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
      { id: 2, name: 'Caesar Salad', price: 9.99, quantity: 1 },
    ]

    render(
      <Cart
        cart={cart}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={35.97}
      />
    )

    expect(screen.getByText('Cart (2)')).toBeInTheDocument()
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
    expect(screen.getByText('Caesar Salad')).toBeInTheDocument()
  })

  it('displays correct item quantities', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()
    const cart = [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 3 },
    ]

    render(
      <Cart
        cart={cart}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={38.97}
      />
    )

    const quantities = screen.getAllByText('3')
    expect(quantities.length).toBeGreaterThan(0)
  })

  it('calls onUpdateQuantity when increment button is clicked', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()
    const cart = [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 1 },
    ]

    render(
      <Cart
        cart={cart}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={12.99}
      />
    )

    const incrementButtons = screen.getAllByText('+')
    fireEvent.click(incrementButtons[0])

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2)
  })

  it('calls onUpdateQuantity when decrement button is clicked', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()
    const cart = [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
    ]

    render(
      <Cart
        cart={cart}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={25.98}
      />
    )

    const decrementButtons = screen.getAllByText('-')
    fireEvent.click(decrementButtons[0])

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1)
  })

  it('calls onRemove when remove button is clicked', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()
    const cart = [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 1 },
    ]

    render(
      <Cart
        cart={cart}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={12.99}
      />
    )

    const removeButton = screen.getByText('Remove')
    fireEvent.click(removeButton)

    expect(mockRemove).toHaveBeenCalledWith(1)
  })

  it('displays correct total price', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()
    const cart = [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
      { id: 2, name: 'Caesar Salad', price: 9.99, quantity: 1 },
    ]

    render(
      <Cart
        cart={cart}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={35.97}
      />
    )

    expect(screen.getByText('Total: $35.97')).toBeInTheDocument()
  })

  it('displays correct item totals', () => {
    const mockRemove = vi.fn()
    const mockUpdateQuantity = vi.fn()
    const cart = [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
    ]

    render(
      <Cart
        cart={cart}
        onRemove={mockRemove}
        onUpdateQuantity={mockUpdateQuantity}
        totalPrice={25.98}
      />
    )

    expect(screen.getByText('$25.98')).toBeInTheDocument()
  })
})

