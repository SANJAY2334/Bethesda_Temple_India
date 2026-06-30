import { useCallback, useState } from 'react'
import { AlertCircle, Loader2, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { useMutation } from '@/hooks/useMutation'

const SKELETON_WIDTHS = [78, 64, 86, 70, 82, 68]

function SkeletonRow({ cols }) {
  return (
    <tr className="bg-white/62">
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <td key={i} className="px-4 py-4 first:rounded-l-2xl last:rounded-r-2xl">
          <div
            className="h-3 animate-pulse rounded-full bg-[#c8dde8]/60"
            style={{ width: `${SKELETON_WIDTHS[i % SKELETON_WIDTHS.length]}%` }}
          />
        </td>
      ))}
      <td className="px-4 py-4 rounded-r-2xl">
        <div className="h-7 w-20 animate-pulse rounded-full bg-[#c8dde8]/60" />
      </td>
    </tr>
  )
}

function Modal({ title, fields, initial = {}, onClose, onSave, saving, saveError }) {
  const [form, setForm] = useState(() => {
    const defaults = {}
    fields.forEach((field) => {
      defaults[field.name] = initial[field.name] ?? ''
    })
    return defaults
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-lg rounded-[28px] p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl font-semibold text-[#18324a]">{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-black/5" type="button">
            <X size={20} className="text-[#617284]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {fields.map((field) => (
            <label key={field.name} className="grid gap-1.5">
              <span className="text-sm font-semibold text-[#526679]">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  rows={4}
                  required={field.required}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none resize-none"
                />
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!form[field.name]}
                  onChange={handleChange}
                  className="h-5 w-5 accent-[#18324a]"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  required={field.required}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ''}
                  className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none"
                />
              )}
            </label>
          ))}

          {saveError && (
            <div className="flex items-center gap-2 rounded-2xl bg-red-50/80 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} /> {saveError}
            </div>
          )}

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#18324a]/15 px-5 py-2.5 font-semibold text-[#526679]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-[#18324a] px-5 py-2.5 font-semibold text-white disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ConfirmDelete({ label, onConfirm, onCancel, deleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-sm rounded-[28px] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <Trash2 size={24} className="text-red-600" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-[#18324a]">Delete item?</h2>
        <p className="mt-2 text-sm text-[#617284]">"{label}" will be permanently removed.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="rounded-full border border-[#18324a]/15 px-5 py-2.5 font-semibold text-[#526679]"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60"
            type="button"
          >
            {deleting && <Loader2 size={16} className="animate-spin" />}
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function AdminCrudPage({
  title,
  description,
  columns,
  fields = [],
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  labelKey = 'title',
  action = 'Create New',
  readOnly = false,
}) {
  const stableFetch = useCallback(() => {
    if (!fetchFn) return Promise.resolve([])
    return fetchFn()
  }, [fetchFn])
  const { data: rows, loading, error: fetchError, refetch } = useApi(stableFetch)

  const createMutation = useMutation(createFn || (() => Promise.resolve()))
  const updateMutation = useMutation((args) => updateFn(args.id, args.data))
  const deleteMutation = useMutation(deleteFn || (() => Promise.resolve()))

  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filteredRows = (rows || []).filter((row) =>
    columns.some((col) => {
      const val = row[col.key || col.toLowerCase().replaceAll(' ', '')]
      return String(val || '').toLowerCase().includes(search.toLowerCase())
    }),
  )

  async function handleSave(formData) {
    try {
      if (modal.mode === 'create') {
        await createMutation.mutate(formData)
      } else {
        await updateMutation.mutate({ id: modal.row._id, data: formData })
      }
      setModal(null)
      refetch()
    } catch {
      // Error is shown in the modal.
    }
  }

  async function handleDelete() {
    try {
      await deleteMutation.mutate(deleteTarget._id)
      setDeleteTarget(null)
      refetch()
    } catch {
      // Error is captured by the mutation hook.
    }
  }

  const saveError = modal?.mode === 'create' ? createMutation.error : updateMutation.error
  const saving = modal?.mode === 'create' ? createMutation.loading : updateMutation.loading

  return (
    <>
      {modal && (
        <Modal
          title={modal.mode === 'create' ? action : `Edit ${title.replace('Manage ', '')}`}
          fields={fields}
          initial={modal.row || {}}
          onClose={() => setModal(null)}
          onSave={handleSave}
          saving={saving}
          saveError={saveError}
        />
      )}

      {deleteTarget && (
        <ConfirmDelete
          label={deleteTarget[labelKey] || 'this item'}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          deleting={deleteMutation.loading}
        />
      )}

      <section>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4b83ad]">Admin</p>
            <h1 className="font-display mt-2 text-5xl font-semibold text-[#18324a]">{title}</h1>
            <p className="mt-3 max-w-2xl text-[#617284]">{description}</p>
          </div>
          {!readOnly && createFn && (
            <button
              onClick={() => setModal({ mode: 'create' })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18324a] px-5 py-3 font-semibold text-white"
              type="button"
            >
              <Plus size={18} />
              {action}
            </button>
          )}
        </div>

        <div className="glass-panel mt-8 rounded-[28px] p-4">
          <label className="mb-4 flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-[#617284]">
            <Search size={18} />
            <input
              className="w-full bg-transparent outline-none"
              placeholder={`Search ${title.toLowerCase()}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          {fetchError && (
            <div className="flex items-center gap-3 rounded-2xl bg-red-50/80 px-5 py-4 text-red-700 mb-4">
              <AlertCircle size={18} />
              <p className="font-semibold text-sm">Could not load data. {fetchError}</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm uppercase tracking-[0.18em] text-[#6d7d8a]">
                  {columns.map((col) => (
                    <th key={col.label || col} className="px-4 py-3 font-semibold">
                      {col.label || col}
                    </th>
                  ))}
                  <th className="px-4 py-3 font-semibold">Status</th>
                  {!readOnly && <th className="px-4 py-3 font-semibold">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {loading &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonRow key={i} cols={columns.length} />
                  ))}

                {!loading && filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 2} className="px-4 py-10 text-center text-[#617284]">
                      {search ? 'No results match your search.' : 'No records found.'}
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredRows.map((row) => (
                    <tr key={row._id} className="bg-white/62 text-[#18324a]">
                      {columns.map((col) => {
                        const key = col.key || col.toLowerCase?.().replaceAll(' ', '') || col.label?.toLowerCase().replaceAll(' ', '')
                        const val = row[key]
                        return (
                          <td key={key} className="px-4 py-4 first:rounded-l-2xl">
                            {col.render ? col.render(val, row) : (val ?? '-')}
                          </td>
                        )
                      })}
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-[#bfddf0]/60 px-3 py-1 text-sm font-semibold">
                          {row.status || 'Active'}
                        </span>
                      </td>
                      {!readOnly && (
                        <td className="rounded-r-2xl px-4 py-4">
                          <div className="flex gap-2">
                            {updateFn && (
                              <button
                                onClick={() => setModal({ mode: 'edit', row })}
                                className="rounded-xl bg-[#e8f2f9] p-2 text-[#18324a] hover:bg-[#d0e6f2]"
                                title="Edit"
                                type="button"
                              >
                                <Pencil size={15} />
                              </button>
                            )}
                            {deleteFn && (
                              <button
                                onClick={() => setDeleteTarget(row)}
                                className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100"
                                title="Delete"
                                type="button"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
