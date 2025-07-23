// utils/cartEvents.ts

/**
 * Dispatches a custom event to notify components that the cart has been updated
 */
export const notifyCartUpdated = () => {
    // Create and dispatch a custom event
    const event = new CustomEvent('cartUpdated')
    window.dispatchEvent(event)
  }
  
  /**
   * Helper function to add item to cart and trigger notification
   */
  export const addToCart = async (productData: { id: number; name: string; price: number; quantity?: number; carats?: number; is_stone?: number }) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Notify components that cart has been updated
        notifyCartUpdated()
        return { success: true, data: result }
      } else {
        console.error('Failed to add item to cart:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
      return { success: false, error: 'Failed to add item to cart' }
    }
  }
  
  /**
   * Helper function to remove item from cart and trigger notification
   */
  export const removeFromCart = async (cartItemId: number) => {
    try {
      const response = await fetch(`/api/cart?id=${cartItemId}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Notify components that cart has been updated
        notifyCartUpdated()
        return { success: true, data: result }
      } else {
        console.error('Failed to remove item from cart:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error removing item from cart:', error)
      return { success: false, error: 'Failed to remove item from cart' }
    }
  }
  
  /**
   * Helper function to update cart item and trigger notification
   */
  export const updateCartItem = async (cartItemId: number, updates: { quantity?: number, carats?: number }) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItemId,
          ...updates
        }),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Notify components that cart has been updated
        notifyCartUpdated()
        return { success: true, data: result }
      } else {
        console.error('Failed to update cart item:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
      return { success: false, error: 'Failed to update cart item' }
    }
  }