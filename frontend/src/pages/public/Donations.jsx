import { Copy, HeartHandshake, Shield } from 'lucide-react'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { RevealPage } from '@/components/ui/shared'
import { images } from '@/utils/images'
import donationQR from '@/assets/images/donation-qr.jpeg'

const UPI_ID = 'paulhiremath-3@okhdfcbank'

const offeringTypes = [
  'Jesus Feeds Offering (Minimum ₹500)',
  'Tithe Offering',
  'Birthday Offering',
  'Wedding Anniversary Offering',
  'Thanksgiving Offering',
  'Special Offering',
]

export default function Donations() {
  const copyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      alert('UPI ID copied successfully')
    } catch (error) {
      alert('Unable to copy UPI ID')
    }
  }

  return (
    <PageTransition>
      <SEO
        title="Donations"
        path="/donations"
        description="Support ministry, outreach, worship, discipleship, and community care through your offerings."
      />

      <RevealPage>
        <SectionHero
          eyebrow="Giving"
          title="Generosity that becomes worship and care."
          copy="Your offerings support worship services, discipleship, outreach ministries, pastoral care, and community initiatives."
          image={images.volunteers}
        />

        <section
          className="container-soft py-16"
          aria-labelledby="giving-heading"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {/* QR Section */}
            <div className="card p-8 text-center">
              <div className="mb-5 flex justify-center">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-accent-pale)]">
                  <HeartHandshake
                    size={24}
                    className="text-[var(--color-accent)]"
                  />
                </div>
              </div>

              <h2
                id="giving-heading"
                className="font-display text-3xl font-semibold text-[var(--color-ink)]"
              >
                Scan to Give
              </h2>

              <p className="mt-3 leading-7 text-[var(--color-ink-muted)]">
                Use any UPI application to make your offering securely.
              </p>

              <img
                src={donationQR}
                alt="Church Donation QR Code"
                className="mx-auto mt-8 w-full max-w-sm rounded-2xl border border-[var(--color-border)]"
              />

              <div className="mt-8 rounded-xl border border-[var(--color-border)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
                  UPI ID
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  <code className="rounded-lg bg-[var(--color-surface-warm)] px-3 py-2 text-sm">
                    {UPI_ID}
                  </code>

                  <button
                    type="button"
                    onClick={copyUPI}
                    className="rounded-lg border border-[var(--color-border)] p-2 hover:bg-[var(--color-surface-warm)]"
                    aria-label="Copy UPI ID"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <p className="mt-5 text-sm text-[var(--color-ink-faint)]">
                Google Pay • PhonePe • Paytm • BHIM • Any UPI App
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--color-ink-faint)]">
                <Shield size={14} />
                Secure UPI Payments
              </div>
            </div>

            {/* Offerings */}
            <div className="card p-8">
              <h3 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
                Offering Categories
              </h3>

              <p className="mt-3 leading-7 text-[var(--color-ink-muted)]">
                Kindly select the appropriate category while making your offering.
              </p>

              <ul className="mt-8 space-y-4">
                {offeringTypes.map((offering) => (
                  <li
                    key={offering}
                    className="rounded-xl border border-[var(--color-border)] p-4 transition hover:border-[var(--color-accent)]"
                  >
                    {offering}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl bg-[var(--color-accent-pale)] p-5">
                <h4 className="font-semibold text-[var(--color-ink)]">
                  After Your Offering
                </h4>

                <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                  Please share your payment screenshot with the church office
                  for acknowledgement and receipt generation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealPage>
    </PageTransition>
  )
}