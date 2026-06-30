import { useEffect, useState } from 'react'
import { Radio, CalendarDays } from 'lucide-react'
import { PageTransition } from '@/components/common/PageTransition'
import { SectionHero } from '@/components/ui/SectionHero'
import { SEO } from '@/components/common/SEO'
import { images } from '@/utils/images'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Livestream() {
  const [stream, setStream] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStream()
  }, [])

  const fetchStream = async () => {
    try {
      const response = await fetch(`${API_URL}/livestream`)
      const data = await response.json()

      setStream(data)
    } catch (error) {
      console.error('Failed to load livestream:', error)
    } finally {
      setLoading(false)
    }
  }

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return ''

    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
    )

    if (!match) return ''

    return `https://www.youtube.com/embed/${match[1]}`
  }

  return (
    <PageTransition>
      <SEO
        title="Livestream"
        path="/livestream"
        description="Watch Bethesda Temple live worship services online."
      />

      <SectionHero
        eyebrow="Livestream"
        title="Join worship from wherever you are."
        copy="Watch our services live and stay connected wherever you are."
        image={images.worshipHall}
      />

      <section className="container-soft py-16">
        <div className="overflow-hidden rounded-[30px] bg-[#18324a] shadow-2xl shadow-[#18324a]/20">
          {loading ? (
            <div className="grid aspect-video place-items-center text-white">
              <p>Loading livestream...</p>
            </div>
          ) : stream?.isLive ? (
            <div>
              <iframe
                src={getYoutubeEmbedUrl(stream.youtubeUrl)}
                title={stream.title}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <div className="p-6 text-white">
                <div className="flex items-center gap-2">
                  <Radio
                    size={18}
                    className="text-red-500"
                  />
                  <span className="font-semibold">
                    LIVE NOW
                  </span>
                </div>

                <h2 className="mt-3 font-display text-4xl font-semibold">
                  {stream.title}
                </h2>

                {stream.description && (
                  <p className="mt-3 text-white/80">
                    {stream.description}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid aspect-video place-items-center bg-[radial-gradient(circle_at_center,rgba(140,192,235,0.28),transparent_22rem)] text-white">
              <div className="max-w-2xl text-center">
                <Radio
                  className="mx-auto mb-5 text-[#bfddf0]"
                  size={48}
                />

                <h2 className="font-display text-5xl font-semibold">
                  {stream?.title ||
                    'Sunday Livestream Begins Soon'}
                </h2>

                {stream?.scheduledAt && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-white/70">
                    <CalendarDays size={18} />
                    <span>
                      {new Date(
                        stream.scheduledAt,
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

                <p className="mt-4 text-white/70">
                  {stream?.description ||
                    'Our next worship service will begin shortly.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}