import { AdminCrudPage } from '@/components/admin/AdminCrudPage'
import { contentService } from '@/services/contentService'

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Quote', key: 'quote', render: (v) => (v ? `${v.slice(0, 60)}...` : '-') },
  { label: 'Role', key: 'role' },
]

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'role', label: 'Role / Description (e.g. Church Member)' },
  { name: 'quote', label: 'Testimonial Quote', type: 'textarea', required: true },
  { name: 'avatarUrl', label: 'Avatar Image URL', type: 'url' },
]

export default function ManageTestimonials() {
  return (
    <AdminCrudPage
      title="Manage Testimonials"
      description="Curate personal stories and testimonials for the homepage quote carousel."
      columns={columns}
      fields={fields}
      fetchFn={contentService.adminTestimonials}
      createFn={contentService.createTestimonial}
      updateFn={contentService.updateTestimonial}
      deleteFn={contentService.deleteTestimonial}
      labelKey="name"
    />
  )
}
