import { PackageCheck, Sparkles, ShieldCheck } from 'lucide-react'
export default function AnnouncementFeatures() {
  return <section className="feature-strip page-container">
    <div><span className="feature-icon mint"><PackageCheck /></span><span><strong>Thoughtful finds</strong><small>Picked with care</small></span></div>
    <div><span className="feature-icon pink"><Sparkles /></span><span><strong>Joy in the details</strong><small>Little things, big smiles</small></span></div>
    <div><span className="feature-icon green"><ShieldCheck /></span><span><strong>Easy browsing</strong><small>Find your next favourite</small></span></div>
  </section>
}
