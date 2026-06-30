import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function ManageLivestream() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    isLive: false,
    scheduledAt: '',
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStream()
  }, [])

  const fetchStream = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/livestream`
      )

      if (data) {
        setForm({
          title: data.title || '',
          description: data.description || '',
          youtubeUrl: data.youtubeUrl || '',
          isLive: data.isLive || false,
          scheduledAt: data.scheduledAt
            ? data.scheduledAt.slice(0, 16)
            : '',
        })
      }
    } catch (err) {
      console.error('Fetch livestream error:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const session = JSON.parse(
        localStorage.getItem('grace_admin_session') || '{}'
      )

      const token = session?.token

      console.log('TOKEN:', token)
      console.log('FORM:', form)

      await axios.post(
        `${API_URL}/livestream`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      alert('Livestream saved successfully')

      await fetchStream()
    } catch (err) {
      console.error('Save livestream error:', err)

      console.error(
        'Server response:',
        err?.response?.data
      )

      alert(
        err?.response?.data?.message ||
          'Failed to save livestream'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className="mx-auto max-w-5xl">
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4b83ad]">
        Broadcast Control
      </p>

      <h1 className="mt-2 font-display text-5xl font-semibold text-[#18324a]">
        Livestream Management
      </h1>

      <p className="mt-3 text-[#617284]">
        Control church livestream broadcasts, scheduling and public visibility.
      </p>
    </div>

    <div
      className={`mb-8 rounded-[28px] border p-6 shadow-sm ${
        form.isLive
          ? 'border-green-200 bg-green-50'
          : 'border-red-200 bg-red-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">
            Current Status
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {form.isLive ? '🔴 LIVE NOW' : '⚫ OFFLINE'}
          </h2>

          <p className="mt-2 text-sm opacity-80">
            {form.isLive
              ? 'Visitors can currently watch the livestream.'
              : 'Visitors are currently seeing the offline page.'}
          </p>
        </div>
      </div>
    </div>

    <form
      onSubmit={handleSubmit}
      className="rounded-[30px] border border-[#e2ddd6] bg-white p-8 shadow-sm"
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block font-semibold text-[#18324a]">
            Stream Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Sunday Worship Service"
            className="w-full rounded-xl border border-[#d8d8d8] p-4 focus:border-[#4b83ad] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-[#18324a]">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe today's service..."
            className="w-full rounded-xl border border-[#d8d8d8] p-4 focus:border-[#4b83ad] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-[#18324a]">
            YouTube Stream URL
          </label>

          <input
            type="text"
            name="youtubeUrl"
            value={form.youtubeUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-xl border border-[#d8d8d8] p-4 focus:border-[#4b83ad] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-[#18324a]">
            Scheduled Time
          </label>

          <input
            type="datetime-local"
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#d8d8d8] p-4 focus:border-[#4b83ad] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                isLive: true,
              }))
            }
            className={`rounded-xl px-6 py-3 font-semibold transition-all ${
              form.isLive
                ? 'bg-green-600 text-white shadow-lg'
                : 'border border-green-600 text-green-600 hover:bg-green-50'
            }`}
          >
            🔴 Start Stream
          </button>

          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                isLive: false,
              }))
            }
            className={`rounded-xl px-6 py-3 font-semibold transition-all ${
              !form.isLive
                ? 'bg-red-600 text-white shadow-lg'
                : 'border border-red-600 text-red-600 hover:bg-red-50'
            }`}
          >
            ⏹ Stop Stream
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                title: '',
                description: '',
                youtubeUrl: '',
                isLive: false,
                scheduledAt: '',
              })
            }
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-100"
          >
            ↺ Reset Form
          </button>
        </div>

        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#18324a] px-8 py-4 font-semibold text-white transition-all hover:bg-[#234765] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'Saving Livestream...'
              : '💾 Save Changes'}
          </button>
        </div>
      </div>
    </form>
  </div>
)
}