import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, UserRound, Menu, X, ArrowRight } from 'lucide-react'
import { categories } from '../data.js'
import { useShop } from '../context/ShopContext.jsx'

export default function Header() {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { itemCount, wishlist } = useShop()
  const submit = event => {
    event.preventDefault()
    navigate(`/shop${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`)
    setMenuOpen(false)
  }
  return <header className="site-header">
    <div className="header-main page-container">
      <button className="icon-button menu-toggle" onClick={() => setMenuOpen(value => !value)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <Link to="/" className="brand" aria-label="S Square Elite home">
        <span className="brand-mark">🧸</span>
        <span className="brand-wordmark"><strong>S Square Elite</strong><small>GIFT SHOP</small></span>
      </Link>
      <form className="search-form" onSubmit={submit}><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find something wonderful..." aria-label="Search products" /><button type="submit">Search <ArrowRight size={15} /></button></form>
      <div className="header-actions">
        <Link className="header-action" to="/account" aria-label="Account"><UserRound /><span>Account</span></Link>
        <Link className="header-action" to="/wishlist" aria-label="Favourites"><Heart /><span>Favourites</span>{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link>
        <Link className="header-action cart-action" to="/cart" aria-label="Shopping bag"><ShoppingBag /><span>Bag</span><b className="count-badge">{itemCount}</b></Link>
      </div>
    </div>
    <nav className={`category-nav ${menuOpen ? 'is-open' : ''}`}><div className="page-container nav-inner">
      <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop all</NavLink>
      {categories.map(category => <NavLink key={category.slug} to={`/category/${category.slug}`} onClick={() => setMenuOpen(false)}>{category.name}</NavLink>)}
    </div></nav>
  </header>
}
