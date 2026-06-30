// WHY CHANGED:
// BEFORE: SermonSkeleton duplicated from EventSkeleton (identical markup, different file).
// BEFORE: Error state duplicated from Events.jsx.
// BEFORE: ContentCard images passed alt="" (empty).
// AFTER: CardSkeleton, ErrorMessage, EmptyState imported from shared.jsx.
// AFTER: imageAlt prop passed to ContentCard.
// AFTER: RevealPage replaces manual scope + useReveal + div.

import { PlayCircle } from 'lucide-react'
import { ContentCard } from '@/components/ui/ContentCard'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { RevealPage, CardSkeleton, ErrorMessage, EmptyState } from '@/components/ui/shared'
import { useApi } from '@/hooks/useApi'
import { contentService } from '@/services/contentService'
import { images } from '@/utils/images'

export default function Sermons() {
  const { data: sermons, loading, error } = useApi(contentService.sermons)
  console.log("SERMONS RAW:", sermons)
console.log("TYPE:", typeof sermons)
console.log("IS ARRAY:", Array.isArray(sermons))

  return (
    <PageTransition>
      <SEO
        title="Sermons"
        path="/sermons"
        description="Watch and listen to recent sermons from Bethesda Temple."
      />
      <RevealPage>
        <SectionHero
          eyebrow="Sermons"
          title="Teaching for quiet courage and living faith."
          copy="Browse recent messages, scripture passages, and speaker notes."
          image={images.prayer}
        />
        <section className="container-soft py-16" aria-labelledby="sermons-list-heading">
          <h2 id="sermons-list-heading" className="sr-only">Sermon archive</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <CardSkeleton />
                </li>
              ))}

            {error && <ErrorMessage message={`Could not load sermons. ${error}`} />}

            {!loading && !error && sermons?.length === 0 && (
              <EmptyState message="No sermons have been published yet. Check back soon." />
            )}

            {!loading &&
              !error &&
              sermons?.map((sermon) => (
                
<li key={sermon._id}>
                  <ContentCard
                    image={images.prayer}
                    imageAlt={`${sermon.title} — sermon by ${sermon.speaker}`}
                    title={sermon.title}
                    meta={`${sermon.speaker} · ${sermon.passage}`}
                  >
                    {sermon.videoUrl ? (
                      <a
                        href={sermon.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-3 text-sm"
                        aria-label={`Watch sermon: ${sermon.title}`}
                      >
                        <PlayCircle size={16} aria-hidden="true" /> Watch sermon
                      </a>
                    ) : (
                      <button
                        className="btn-primary mt-3 text-sm"
                        disabled
                        aria-label="Video coming soon"
                      >
                        <PlayCircle size={16} aria-hidden="true" /> Coming soon
                      </button>
                    )}
                  </ContentCard>
                </li>
              ))}
          </ul>
        </section>
      </RevealPage>
    </PageTransition>
  )
}
