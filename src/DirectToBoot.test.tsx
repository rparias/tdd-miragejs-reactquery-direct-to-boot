import { render, screen, waitFor } from '@testing-library/react'
import { DirectToBoot } from './DirectToBoot'
import { Server } from 'miragejs'
import { createMockServer } from './createMockServer'

let server: Server

describe('Direct to boot', () => {
  beforeEach(() => {
    server = createMockServer()
  })
  
  afterEach(() => {
    server.shutdown()
  })

  it('renders a section for direct to boot', () => {
    render(<DirectToBoot orderId='order-id' />)

    expect(screen.getByRole('heading', { level: 2, name: /direct to boot/i })).toBeInTheDocument()
    expect(screen.getByText(/we are preparing your order.../i)).toBeInTheDocument()
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
  
  it('enables button when the order is ready', async () => {
    render(<DirectToBoot orderId='order-id' />)

    expect(screen.getByRole('heading', { level: 2, name: /direct to boot/i })).toBeInTheDocument()
    expect(screen.getByText(/we are preparing your order.../i)).toBeInTheDocument()
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()

    await waitFor(() => expect(button).toBeEnabled())
    await screen.findByText(/please click the button when you have arrived. one of our friendly staff will bring your order to you./i)
  })
})
