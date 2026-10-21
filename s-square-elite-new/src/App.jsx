import { useEffect } from 'react'
import { Link, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Heart, Minus, Plus, ShoppingBag, Trash2, UserRound } from 'lucide-react'
import { categories, products } from './data.js'
import { useShop } from './context/ShopContext.jsx'
import AnnouncementBar from './components/AnnouncementBar.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import CategoryGrid from './components/CategoryGrid.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import SectionHeading from './components/SectionHeading.jsx'
import AnnouncementFeatures from './components/AnnouncementFeatures.jsx'
import RelatedProducts from './components/RelatedProducts.jsx'

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname, search])
  return null
}

function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductGrid />


    </>
  )
}

function Shop() {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') || '').toLowerCase()
  const category = categories.find(c => c.slug === slug)
  const matches = products.filter(p => (!category || p.category === category.slug) && (!query || `${p.name} ${p.description}`.toLowerCase().includes(query)))
  const sortProducts = list => [...list].sort((a,b) => params.get('sort') === 'price-low' ? a.price-b.price : params.get('sort') === 'price-high' ? b.price-a.price : params.get('sort') === 'name' ? a.name.localeCompare(b.name) : 0)
  const startIndex = category ? categories.findIndex(c => c.slug === category.slug) : -1
  const continuousCategories = category ? categories.slice(startIndex) : []
  return <section className="page-container page-section">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{category?.name || 'Shop all'}</span></div>
    <SectionHeading eyebrow={category ? `${category.icon} ${category.name.toUpperCase()}` : 'A LITTLE JOY IS WAITING'} title={category?.name || (query ? `Search results for “${params.get('q')}”` : 'Shop all favourites')} description={category?.description || 'Browse the full collection of toys, gifts and little surprises.'} />
    <div className="shop-toolbar"><span>{category ? 'Keep scrolling to explore more categories' : `${matches.length} lovely finds`}</span><select value={params.get('sort') || 'featured'} onChange={e => { const next = new URLSearchParams(params); next.set('sort', e.target.value); setParams(next) }} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name A–Z</option></select></div>
    {category ? <>
      {continuousCategories.map((item, index) => {
        const list = sortProducts(products.filter(p => p.category === item.slug))
        return <section className="category-flow-section" key={item.slug} id={`category-${item.slug}`}>
          <div className="category-flow-heading"><div><span className="eyebrow">{item.icon} CATEGORY {index + 1}</span><h2>{item.name}</h2><p>{item.description}</p></div><Link className="text-link" to={`/category/${item.slug}`}>Open category <ArrowRight size={16}/></Link></div>
          {list.length ? <ProductGrid products={list} /> : <p className="empty-category-note">New finds are coming soon.</p>}
          {index < continuousCategories.length - 1 && <div className="category-flow-divider"><span>Keep discovering</span><ArrowDownMark /></div>}
        </section>
      })}
      {startIndex > 0 && <div className="next-category"><span>Want to start somewhere else?</span><h2>Back to all categories</h2><Link className="button button-outline" to="/shop">Browse all products <ArrowRight size={17} /></Link></div>}
    </> : <ProductGrid products={sortProducts(matches)} />}
  </section>
}
function ArrowDownMark() { return <span className="category-down-mark" aria-hidden="true">↓</span> }
function ProductDetails() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const { addToCart, toggleWishlist, isWishlisted } = useShop()
  if (!product) return <NotFound />
  const category = categories.find(c => c.slug === product.category)
  return <><section className="page-container page-section product-detail"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to={`/category/${product.category}`}>{category?.name}</Link><span>/</span><span>{product.name}</span></div>
    <div className="detail-layout"><div className="detail-art" style={{ '--product-bg': product.color }}><span>{product.emoji}</span></div><div className="detail-copy"><span className="eyebrow">{category?.name} / LITTLE FINDS</span><h1>{product.name}</h1><div className="detail-rating">★★★★★ <span>Customer favourite</span></div><div className="detail-price">₹{product.price.toLocaleString('en-IN')} {product.oldPrice && <del>₹{product.oldPrice.toLocaleString('en-IN')}</del>}</div><p>{product.description}</p><p className="delivery-note">🚚 Fast delivery within 2–3 working days. Buy 4 or more products for free delivery.</p><div className="detail-actions"><button className="button button-primary" onClick={() => addToCart(product)}><ShoppingBag size={18} /> Add to bag</button><button className={`button button-outline ${isWishlisted(product.id) ? 'is-liked' : ''}`} onClick={() => toggleWishlist(product)}><Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} /> {isWishlisted(product.id) ? 'Saved to favourites' : 'Add to favourites'}</button></div><div className="detail-assurance">✓ Thoughtful finds &nbsp; · &nbsp; ✓ Easy browsing &nbsp; · &nbsp; ✓ Gift-worthy picks</div></div></div>
  </section><RelatedProducts product={product} /></>
}
function Cart() {
  const { cart, subtotal, changeQuantity, removeFromCart } = useShop()
  const freeDelivery = cart.reduce((n,p) => n + p.quantity, 0) >= 4
  return <section className="page-container page-section"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Shopping bag</span></div><SectionHeading eyebrow="YOUR LITTLE FINDS" title="Your shopping bag" description="Everything you picked, gathered in one happy place." />
    {!cart.length ? <Empty icon={<ShoppingBag />} title="Your bag is waiting" text="Add a little something lovely to get started." action={<Link className="button button-primary" to="/shop">Explore the shop <ArrowRight size={17} /></Link>} /> : <div className="cart-layout"><div className="cart-items">{cart.map(item => <article className="cart-row" key={item.id}><div className="cart-thumb" style={{'--product-bg': item.color}}>{item.emoji}</div><div className="cart-row-copy"><Link to={`/product/${item.slug}`}>{item.name}</Link><span>₹{item.price.toLocaleString('en-IN')}</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div></div><button className="remove-button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17}/></button></article>)}</div><aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div><div><span>Delivery</span><strong>{freeDelivery ? 'FREE' : 'Calculated at checkout'}</strong></div><p>{freeDelivery ? '🎉 Your order qualifies for free delivery!' : `Add ${Math.max(0,4-cart.reduce((n,p)=>n+p.quantity,0))} more item(s) for free delivery.`}</p><button className="button button-primary full-width" onClick={() => alert('Checkout will be connected to your backend and payment gateway later.')}>Continue to checkout <ArrowRight size={17}/></button><Link className="text-link" to="/shop">Continue shopping</Link></aside></div>}
  </section>
}
function Wishlist() {
  const { wishlist } = useShop()
  return <section className="page-container page-section"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Favourites</span></div><SectionHeading eyebrow="SAVED WITH LOVE" title="Your favourites" description="Products you have liked, all together." />
    {wishlist.length ? <><ProductGrid products={wishlist} /><RelatedProducts product={wishlist[0]} title="Related to your favourites" /></> : <Empty icon={<Heart />} title="Your favourites live here" text="Tap the heart on any product to save it and discover related finds." action={<Link className="button button-primary" to="/shop">Find favourites <ArrowRight size={17} /></Link>} />}
  </section>
}
function Empty({ icon, title, text, action }) { return <div className="empty-state large-empty"><span className="empty-icon">{icon}</span><h2>{title}</h2><p>{text}</p>{action}</div> }
function Account() { return <section className="page-container page-section"><div className="account-card"><span className="account-icon"><UserRound /></span><span className="eyebrow">WELCOME TO S SQUARE ELITE</span><h1>Your account</h1><p>Customer sign-in and account details can be connected to your backend when it is ready.</p><Link className="button button-primary" to="/shop">Continue shopping <ArrowRight size={17}/></Link></div></section> }
function NotFound() { return <section className="page-container page-section"><div className="empty-state large-empty"><h2>That little page wandered off.</h2><p>Let’s get you back to something lovely.</p><Link className="button button-primary" to="/">Back home <ArrowRight size={17}/></Link></div></section> }
export default function App() {
  return <><ScrollToTop /><AnnouncementBar /><Header /><main><Routes><Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} /><Route path="/category/:slug" element={<Shop />} /><Route path="/product/:slug" element={<ProductDetails />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/cart" element={<Cart />} /><Route path="/account" element={<Account />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>
}
