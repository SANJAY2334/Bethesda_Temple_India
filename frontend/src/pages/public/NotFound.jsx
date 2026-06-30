import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/common/PageTransition'
import { SEO } from '@/components/common/SEO'

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title="Page Not Found" path="/404" description="The requested page could not be found." />
      <section className="container-soft grid min-h-screen place-items-center pt-24 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4b83ad]">404</p>
          <h1 className="font-display mt-4 text-6xl font-semibold text-[#18324a]">This path is quiet.</h1>
          <Link to="/" className="mt-8 inline-flex rounded-full bg-[#18324a] px-6 py-4 font-semibold text-white">Return home</Link>
        </div>
      </section>
    </PageTransition>
  )
}
