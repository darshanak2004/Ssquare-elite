import { Heart, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data.js'
import { useShop } from '../context/ShopContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop()
  const category = categories.find(item => item.slug === product.category)
  const liked = isWishlisted(product.id)
  return <article className="product-card">
    <div className="product-visual" style={{ '--product-bg': product.color }}>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className={`favorite-button ${liked ? 'is-liked' : ''}`} onClick={() => toggleWishlist(product)} aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}><Heart size={19} fill={liked ? 'currentColor' : 'none'} /></button>
      <Link to={`/product/${product.slug}`} className="product-art" aria-label={`View ${product.name}`}><span>{product.emoji}</span></Link>
    </div>
    <div className="product-info">
      <span className="product-category">{category?.name || 'Little finds'}</span>
      <Link to={`/product/${product.slug}`} className="product-name">{product.name}</Link>
      <div className="product-bottom"><div className="price-wrap"><strong>₹{product.price.toLocaleString('en-IN')}</strong>{product.oldPrice && <del>₹{product.oldPrice.toLocaleString('en-IN')}</del>}</div><button className="add-button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}><ShoppingBag size={17} /><span>Add</span></button></div>
    </div>
  </article>
}
