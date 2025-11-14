import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ItemList from '../components/ItemList'

describe('ItemList', () => {
  it('renders all menu items', () => {
    const mockAddToCart = vi.fn()
    render(<ItemList onAddToCart={mockAddToCart} />)

    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
    expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument()
    expect(screen.getByText('Caesar Salad')).toBeInTheDocument()
    expect(screen.getByText('Chicken Burger')).toBeInTheDocument()
  })

  it('displays item prices correctly', () => {
    const mockAddToCart = vi.fn()
    render(<ItemList onAddToCart={mockAddToCart} />)

    expect(screen.getByText('$12.99')).toBeInTheDocument()
    expect(screen.getByText('$14.99')).toBeInTheDocument()
    expect(screen.getByText('$9.99')).toBeInTheDocument()
  })

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    const mockAddToCart = vi.fn()
    render(<ItemList onAddToCart={mockAddToCart} />)

    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])

    expect(mockAddToCart).toHaveBeenCalledTimes(1)
    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Margherita Pizza',
        price: 12.99,
      })
    )
  })

  it('filters items based on search term', () => {
    const mockAddToCart = vi.fn()
    render(<ItemList onAddToCart={mockAddToCart} />)

    const searchInput = screen.getByPlaceholderText('Search items...')
    fireEvent.change(searchInput, { target: { value: 'pizza' } })

    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
    expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument()
    expect(screen.queryByText('Caesar Salad')).not.toBeInTheDocument()
  })

  it('filters items by description', () => {
    const mockAddToCart = vi.fn()
    render(<ItemList onAddToCart={mockAddToCart} />)

    const searchInput = screen.getByPlaceholderText('Search items...')
    fireEvent.change(searchInput, { target: { value: 'chocolate' } })

    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument()
    expect(screen.queryByText('Margherita Pizza')).not.toBeInTheDocument()
  })

  it('shows all items when search is cleared', () => {
    const mockAddToCart = vi.fn()
    render(<ItemList onAddToCart={mockAddToCart} />)

    const searchInput = screen.getByPlaceholderText('Search items...')
    fireEvent.change(searchInput, { target: { value: 'pizza' } })
    fireEvent.change(searchInput, { target: { value: '' } })

    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
    expect(screen.getByText('Caesar Salad')).toBeInTheDocument()
  })
})

