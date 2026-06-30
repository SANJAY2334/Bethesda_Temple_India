import { AdminCrudPage } from '@/components/admin/AdminCrudPage'
import { contentService } from '@/services/contentService'

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Request', key: 'request', render: (v) => (v ? `${v.slice(0, 60)}...` : '-') },
  {
    label: 'Confidential',
    key: 'isConfidential',
    render: (v) =>
      v ? (
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Confidential</span>
      ) : (
        <span className="rounded-full bg-[#e4eff7] px-3 py-1 text-xs font-semibold text-[#4b83ad]">Open</span>
      ),
  },
  {
    label: 'Submitted',
    key: 'createdAt',
    render: (v) => (v ? new Date(v).toLocaleDateString() : '-'),
  },
]

export default function ManagePrayerRequests() {
  return (
    <AdminCrudPage
      title="Manage Prayer Requests"
      description="Review, track, and respond to pastoral prayer requests submitted by the congregation."
      columns={columns}
      fetchFn={contentService.prayerRequests}
      deleteFn={contentService.deletePrayerRequest}
      labelKey="name"
      readOnly={false}
    />
  )
}
