import { render, screen } from '@testing-library/react'
import { DirectToBoot } from './DirectToBoot'

describe('Direct to boot', () => {
  it('renders a section for direct to boot', () => {
    render(<DirectToBoot orderId='order-id' />)
    expect(screen.getByRole('heading', { level: 2, name: /direct to boot/i })).toBeInTheDocument()
    expect(screen.getByText(/we are preparing your order.../i)).toBeInTheDocument()
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})