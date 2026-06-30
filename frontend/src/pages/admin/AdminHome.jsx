import { Link } from 'react-router-dom'
import { HeartHandshake, Mic2, Music2, Sparkles, UsersRound, Loader2 } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { contentService } from '@/services/contentService'

const MODULE_CONFIG = [
  { label: 'Sermons', to: '/admin/sermons', statKey: 'sermons', icon: Mic2 },
  { label: 'Events', to: '/admin/events', statKey: 'events', icon: Sparkles },
  { label: 'Gallery Assets', to: '/admin/gallery', statKey: 'gallery', icon: UsersRound },
  { label: 'Prayer Requests', to: '/admin/prayer-requests', statKey: 'prayers', icon: HeartHandshake },
  { label: 'Testimonials', to: '/admin/testimonials', statKey: 'testimonials', icon: Music2 },
  { label: 'Donations', to: '/admin/donations', statKey: 'donations', icon: HeartHandshake },
]

function StatCard({ label, to, stat, loading, icon: Icon }) {
  return (
    <Link to={to} className="glass-panel rounded-[26px] p-6 transition hover:-translate-y-1">
      <Icon className="text-[#4b83ad]" size={26} />
      <div className="mt-6 flex items-center gap-2">
        {loading ? (
          <Loader2 size={28} className="animate-spin text-[#4b83ad]" />
        ) : (
          <div className="text-4xl font-bold text-[#18324a]">{stat}</div>
        )}
      </div>
      <div className="mt-2 font-semibold text-[#617284]">{label}</div>
    </Link>
  )
}

export default function AdminHome() {
  const { data: stats, loading } = useApi(contentService.stats)

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4b83ad]">Overview</p>
      <h1 className="font-display mt-2 text-5xl font-semibold text-[#18324a]">Dashboard Home</h1>
      <p className="mt-3 max-w-2xl text-[#617284]">
        Manage sermons, events, media, giving, prayer care, testimonials, and homepage storytelling.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {MODULE_CONFIG.map(({ label, to, statKey, icon }) => (
          <StatCard
            key={label}
            label={label}
            to={to}
            stat={stats?.[statKey] ?? '—'}
            loading={loading}
            icon={icon}
          />
        ))}
      </div>
      <div className="glass-panel mt-8 rounded-[28px] p-8">
        <h2 className="font-display text-4xl font-semibold text-[#18324a]">Production readiness</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {['JWT roles enabled', 'Cloudinary media flow', 'Razorpay verification'].map((item) => (
            <div key={item} className="rounded-2xl bg-white/65 p-4 font-semibold text-[#526679]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
