import { useRef } from 'react'
import { AlertCircle } from 'lucide-react'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { useReveal } from '@/hooks/useReveal'
import { useApi } from '@/hooks/useApi'
import { contentService } from '@/services/contentService'
import { images } from '@/utils/images'

const fallbackGallery = [
  { _id: 'f1', imageUrl: images.worshipHall, caption: 'Worship Hall' },
  { _id: 'f2', imageUrl: images.community, caption: 'Community' },
  { _id: 'f3', imageUrl: images.prayer, caption: 'Prayer' },
  { _id: 'f4', imageUrl: images.interior, caption: 'Interior' },
  { _id: 'f5', imageUrl: images.volunteers, caption: 'Volunteers' },
]

export default function Gallery() {
  const scope = useRef(null)
  useReveal(scope)
  const { data: apiGallery, loading, error } = useApi(contentService.gallery)

  // Use API data when available, otherwise show fallback images
  const gallery = !loading && !error && apiGallery?.length > 0 ? apiGallery : fallbackGallery

  return (
    <PageTransition>
      <SEO title="Gallery" path="/gallery" description="Photo gallery of worship, community, prayer, and outreach at Bethesda Temple." />
      <div ref={scope}>
        <SectionHero eyebrow="Gallery" title="Moments of worship, welcome, and shared life." copy="A warm visual record of gatherings, people, prayer, and practical care." image={images.community} />
        <section className="container-soft grid auto-rows-[240px] grid-cols-1 gap-5 py-16 md:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`animate-pulse rounded-[26px] bg-[#c8dde8]/40 ${i === 0 || i === 3 ? 'md:row-span-2' : ''}`}
              />
            ))}

          {error && (
            <div className="col-span-full flex items-center gap-3 rounded-2xl bg-red-50/80 px-6 py-5 text-red-700">
              <AlertCircle size={20} />
              <p className="font-semibold">Could not load gallery. {error}</p>
            </div>
          )}

          {!loading &&
            gallery.map((item, index) => (
              <figure
                key={item._id}
                className={`overflow-hidden rounded-[26px] shadow-xl shadow-[#7ca8c8]/12 ${index === 0 || index === 3 ? 'md:row-span-2' : ''}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption || 'Bethesda Temple community moment'}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </figure>
            ))}
        </section>
      </div>
    </PageTransition>
  )
}
