import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data.js'

const ShopContext = createContext(null)
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => read('sse-cart', []))
  const [wishlist, setWishlist] = useState(() => read('sse-wishlist', []))
  useEffect(() => localStorage.setItem('sse-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('sse-wishlist', JSON.stringify(wishlist)), [wishlist])

  const addToCart = (product, quantity = 1) => setCart(old => {
    const found = old.find(item => item.id === product.id)
    return found ? old.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...old, { ...product, quantity }]
  })
  const changeQuantity = (id, quantity) => setCart(old => quantity <= 0 ? old.filter(item => item.id !== id) : old.map(item => item.id === id ? { ...item, quantity } : item))
  const removeFromCart = id => setCart(old => old.filter(item => item.id !== id))
  const toggleWishlist = product => setWishlist(old => old.some(item => item.id === product.id) ? old.filter(item => item.id !== product.id) : [...old, product])
  const isWishlisted = id => wishlist.some(item => item.id === id)
  const related = product => products.filter(item => item.id !== product?.id && (item.category === product?.category || item.category === 'gift-sets')).slice(0, 4)
  const value = useMemo(() => ({
    cart, wishlist, addToCart, changeQuantity, removeFromCart, toggleWishlist, isWishlisted, related,
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }), [cart, wishlist])
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
export const useShop = () => useContext(ShopContext)
