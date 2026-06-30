// WHY CHANGED:
// BEFORE: EventSkeleton duplicated from SermonSkeleton.
// BEFORE: Error state duplicated from Sermons.jsx.
// BEFORE: Event images had alt="" via ContentCard.
// AFTER: All shared patterns imported from shared.jsx.
// AFTER: Proper imageAlt on ContentCard.
// AFTER: <time> element with dateTime attribute for semantic date markup.

import { ContentCard } from '@/components/ui/ContentCard'
import { EventCountdown } from '@/components/ui/EventCountdown'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { RevealPage, CardSkeleton, ErrorMessage, EmptyState } from '@/components/ui/shared'
import { useApi } from '@/hooks/useApi'
import { contentService } from '@/services/contentService'
import { images } from '@/utils/images'

export default function Events() {
  const { data: events, loading, error } = useApi(contentService.events)

  return (
    <PageTransition>
      <SEO
        title="Events"
        path="/events"
        description="Upcoming worship gatherings, prayer nights, and outreach events at Bethesda Temple."
      />
      <RevealPage>
        <SectionHero
          eyebrow="Events"
          title="Gatherings that make space for worship and friendship."
          copy="See upcoming services, volunteer days, prayer nights, and formation events."
          image={images.worshipHall}
        />
        <section className="container-soft py-16" aria-labelledby="events-list-heading">
          <h2 id="events-list-heading" className="sr-only">Upcoming events</h2>
          <ul className="grid gap-6 lg:grid-cols-3">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <CardSkeleton />
                </li>
              ))}

            {error && <ErrorMessage message={`Could not load events. ${error}`} />}

            {!loading && !error && events?.length === 0 && (
              <EmptyState message="No upcoming events have been posted yet. Check back soon." />
            )}

            {!loading &&
              !error &&
              events?.map((event) => (
                <li key={event._id}>
                  <ContentCard
                    image={event.imageUrl || images.worshipHall}
                    imageAlt={`${event.title} at ${event.location}`}
                    title={event.title}
                    meta={event.location}
                  >
                    <time dateTime={event.date} className="block text-sm">
                      {new Date(event.date).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}
                    </time>
                    <EventCountdown date={event.date} />
                  </ContentCard>
                </li>
              ))}
          </ul>
        </section>
      </RevealPage>
    </PageTransition>
  )
}
