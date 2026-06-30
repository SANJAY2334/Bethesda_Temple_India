import { useState } from 'react'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { useMutation } from '@/hooks/useMutation'
import { contentService } from '@/services/contentService'

const EMPTY_FORM = {
  heroHeadline: '',
  heroSubcopy: '',
  featuredScripture: '',
  ctaTitle: '',
  ctaCopy: '',
}

function HomepageForm({ initial, save, saving, saveError }) {
  const [form, setForm] = useState(initial)
  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaved(false)
    try {
      await save(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 4000)
    } catch {
      // Error is shown below.
    }
  }

  return (
    <form className="glass-panel mt-8 grid gap-5 rounded-[28px] p-8" onSubmit={handleSubmit}>
      <label className="grid gap-2 font-semibold text-[#526679]">
        Hero headline
        <input
          name="heroHeadline"
          value={form.heroHeadline}
          onChange={handleChange}
          placeholder="e.g. Bethesda Temple"
          className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none font-normal"
        />
      </label>

      <label className="grid gap-2 font-semibold text-[#526679]">
        Hero supporting copy
        <textarea
          name="heroSubcopy"
          rows="4"
          value={form.heroSubcopy}
          onChange={handleChange}
          placeholder="e.g. A peaceful home for worship, prayer, scripture, and community."
          className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none font-normal resize-none"
        />
      </label>

      <label className="grid gap-2 font-semibold text-[#526679]">
        Featured scripture
        <input
          name="featuredScripture"
          value={form.featuredScripture}
          onChange={handleChange}
          placeholder="e.g. Peace I leave with you; my peace I give to you."
          className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none font-normal"
        />
      </label>

      <label className="grid gap-2 font-semibold text-[#526679]">
        CTA title
        <input
          name="ctaTitle"
          value={form.ctaTitle}
          onChange={handleChange}
          placeholder="e.g. There is room for you here."
          className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none font-normal"
        />
      </label>

      <label className="grid gap-2 font-semibold text-[#526679]">
        CTA supporting copy
        <textarea
          name="ctaCopy"
          rows="3"
          value={form.ctaCopy}
          onChange={handleChange}
          placeholder="e.g. Join us this Sunday, share a prayer request, or take your next step."
          className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none font-normal resize-none"
        />
      </label>

      {saveError && (
        <div className="flex items-center gap-2 rounded-2xl bg-red-50/80 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} /> {saveError}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 rounded-2xl bg-green-50/80 px-4 py-3 text-sm text-green-700">
          <CheckCircle size={16} /> Homepage content saved successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#18324a] px-6 py-4 font-semibold text-white disabled:opacity-60"
      >
        {saving && <Loader2 size={16} className="animate-spin" />}
        {saving ? 'Saving...' : 'Save homepage'}
      </button>
    </form>
  )
}

export default function HomepageContent() {
  const { data: homepageData, loading: fetching } = useApi(contentService.homepage)
  const { mutate: save, loading: saving, error: saveError } = useMutation(contentService.saveHomepage)
  const initial = homepageData || EMPTY_FORM

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4b83ad]">Content Studio</p>
      <h1 className="font-display mt-2 text-5xl font-semibold text-[#18324a]">Homepage Content Management</h1>
      <p className="mt-3 max-w-2xl text-[#617284]">
        Update hero copy, scripture carousel, featured sermons, events, CTA panels, and Cloudinary media.
      </p>

      {fetching ? (
        <div className="glass-panel mt-8 flex items-center gap-3 rounded-[28px] p-8 text-[#617284]">
          <Loader2 size={20} className="animate-spin" />
          <span>Loading saved content...</span>
        </div>
      ) : (
        <HomepageForm key={JSON.stringify(initial)} initial={initial} save={save} saving={saving} saveError={saveError} />
      )}
    </section>
  )
}
