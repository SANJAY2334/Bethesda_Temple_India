import { AdminCrudPage } from '@/components/admin/AdminCrudPage'
import { contentService } from '@/services/contentService'

const columns = [
  { label: 'Donor', key: 'donorName' },
  { label: 'Email', key: 'donorEmail' },
  {
    label: 'Amount',
    key: 'amount',
    render: (v) => (v != null ? `INR ${Number(v).toLocaleString('en-IN')}` : '-'),
  },
  { label: 'Purpose', key: 'purpose' },
  {
    label: 'Date',
    key: 'createdAt',
    render: (v) => (v ? new Date(v).toLocaleDateString() : '-'),
  },
]

export default function ManageDonations() {
  return (
    <AdminCrudPage
      title="Manage Donations"
      description="View a complete record of giving transactions verified through Razorpay."
      columns={columns}
      fetchFn={contentService.donations}
      labelKey="donorName"
      readOnly
    />
  )
}
