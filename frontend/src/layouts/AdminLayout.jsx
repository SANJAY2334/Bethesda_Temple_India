import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  CalendarDays,
  HeartHandshake,
  Image,
  LogOut,
  Mic2,
  Quote,
  Settings,
  Radio,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const adminLinks = [
  ['Dashboard', '/admin', BarChart3],
  ['Sermons', '/admin/sermons', Mic2],
  ['Events', '/admin/events', CalendarDays],
  ['Gallery', '/admin/gallery', Image],
  ['Testimonials', '/admin/testimonials', Quote],
  ['Donations', '/admin/donations', HeartHandshake],
  ['Prayer Requests', '/admin/prayer-requests', HeartHandshake],
  ['Livestream', '/admin/livestream', Radio],
  ['Homepage', '/admin/homepage', Settings],
]

export function AdminLayout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="admin-grid min-h-screen bg-[#f7f1d8]">
      <aside className="border-r border-white/70 bg-white/55 p-5 backdrop-blur-xl">
        <div className="mb-8 rounded-3xl bg-[#18324a] p-5 text-white">
          <p className="text-sm text-white/70">Bethesda Temple</p>

          <h1 className="font-display text-3xl font-semibold">
            Admin Studio
          </h1>

          <p className="mt-3 text-sm text-white/70">
            {user?.name || 'Administrator'}
          </p>
        </div>

        <nav className="grid gap-2">
          {adminLinks.map(([label, to, Icon]) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-2xl px-4 py-3',
                  'font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-[#18324a] !text-white'
                    : 'text-black hover:bg-gray-200 hover:text-black',
                ].join(' ')
              }
            >
              <Icon
                size={18}
                className="shrink-0"
              />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/admin/login')
          }}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-[#18324a]/15 px-4 py-3 font-semibold text-[#18324a]"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="min-w-0 p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}