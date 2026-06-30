// WHY CHANGED:
// BEFORE: Manual scope/useReveal pattern (duplicated across every page).
// BEFORE: ContentCard images without alt text.
// AFTER: RevealPage wraps the page.
// AFTER: Ministry cards include ministry icon + better visual hierarchy.

import { ContentCard } from '@/components/ui/ContentCard'
import { CTA } from '@/components/ui/CTA'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { RevealPage } from '@/components/ui/shared'
import { ministries } from '@/utils/content'
import { images } from '@/utils/images'

const anchors = ['youth', 'worship', 'children', 'outreach']

export default function Ministries() {
  return (
    <PageTransition>
      <SEO
        title="Ministries"
        path="/ministries"
        description="Explore youth, worship, children, and outreach ministries at Bethesda Temple."
      />
      <RevealPage>
        <SectionHero
          eyebrow="Ministries"
          title="Every generation has a place to grow and serve."
          copy="Our ministries are designed with safety, discipleship, meaningful service, and spiritual formation at the centre."
          image={images.volunteers}
        />
        <section className="container-soft py-16" aria-labelledby="ministries-list-heading">
          <h2 id="ministries-list-heading" className="sr-only">Ministry areas</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {ministries.map((ministry, index) => (
              <li id={anchors[index]} key={ministry.title} className="reveal scroll-mt-28">
                <ContentCard title={ministry.title}>
                  <p className="leading-7">{ministry.summary}</p>
                  <p className="mt-3 leading-7">
                    Volunteer teams are trained, background-checked where appropriate, and supported
                    with clear pastoral oversight.
                  </p>
                </ContentCard>
              </li>
            ))}
          </ul>
        </section>
        <CTA
          eyebrow="Get involved"
          title="Find your next step."
          copy="Serve with a team, join a group, or let us help you discern where your gifts can bless others."
          action="Volunteer"
          to="/volunteer"
        />
      </RevealPage>
    </PageTransition>
  )
}
