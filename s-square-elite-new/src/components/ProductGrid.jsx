import ProductCard from './ProductCard.jsx'
export default function ProductGrid({ products: items }) {
  if (!items?.length) return <div className="empty-state">No products found just yet. Try another category.</div>
  return <div className="product-grid">{items.map(product => <ProductCard key={product.id} product={product} />)}</div>
}
