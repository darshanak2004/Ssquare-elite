import { Link } from 'react-router-dom'
import { Heart, Instagram, Mail } from 'lucide-react'
export default function Footer() {
  return <footer className="site-footer"><div className="footer-main page-container">
    <div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark">🧸</span><span className="brand-wordmark"><strong>S Square Elite</strong><small>GIFT SHOP</small></span></Link><p>Little things, big smiles. Find playful favourites and thoughtful gifts for the moments that matter.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><a href="mailto:hello@ssquareelite.example" aria-label="Email"><Mail /></a></div></div>
    <div className="footer-column"><h3>Explore</h3><Link to="/shop">Shop all</Link><Link to="/category/soft-toys">Soft toys</Link><Link to="/category/games">Games</Link><Link to="/category/gift-sets">Gift sets</Link></div>
    <div className="footer-column"><h3>Help & info</h3><Link to="/cart">Shopping bag</Link><Link to="/wishlist">Favourites</Link><Link to="/account">My account</Link><a href="mailto:hello@ssquareelite.example">Contact us</a></div>
    <div className="footer-note"><Heart fill="currentColor" /><h3>Made for happy moments</h3><p>From little surprises to big celebrations, there’s a little joy for everyone.</p></div>
  </div><div className="footer-bottom"><div className="page-container"><span>© {new Date().getFullYear()} S Square Elite Gift Shop</span><span>Made with a little ♥ and a lot of imagination.</span><span>Sample storefront</span></div></div></footer>
}
