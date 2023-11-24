import { render, screen, waitFor } from '@testing-library/react'
import { DirectToBoot } from './DirectToBoot'
import { Server } from 'miragejs'
import { createMockServer } from './createMockServer'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

let server: Server

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 0
    }
  }
});

const myRender = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('Direct to boot', () => {
  beforeEach(() => {
    server = createMockServer()
  })
  
  afterEach(() => {
    server.shutdown()
  })

  it('renders a section for direct to boot', () => {
    myRender(<DirectToBoot orderId='order-id' />)

    expect(screen.getByRole('heading', { level: 2, name: /direct to boot/i })).toBeInTheDocument()
    expect(screen.getByText(/we are preparing your order.../i)).toBeInTheDocument()
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
  
  it('enables button when the order is ready', async () => {
    myRender(<DirectToBoot orderId='order-id' />)

    expect(screen.getByRole('heading', { level: 2, name: /direct to boot/i })).toBeInTheDocument()
    expect(screen.getByText(/we are preparing your order.../i)).toBeInTheDocument()
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()

    await waitFor(() => expect(button).toBeEnabled())
    await screen.findByText(/please click the button when you have arrived. one of our friendly staff will bring your order to you./i)
  })
  
  it('shows a fallback call the store button', async () => {
    myRender(<DirectToBoot orderId='error-id' />)

    await screen.findByText(/seems something went wrong, you can call the following number to notify us instead./i)
    await screen.findByRole('button', { name: /04 23 33/i })
  })
})
