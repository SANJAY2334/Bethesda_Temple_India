import { AdminCrudPage } from '@/components/admin/AdminCrudPage'
import { contentService } from '@/services/contentService'

const columns = [
  { label: 'Title', key: 'title' },
  { label: 'Location', key: 'location' },
  { label: 'Date', key: 'date', render: (v) => (v ? new Date(v).toLocaleDateString() : '-') },
]

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'location', label: 'Location', required: true },
  { name: 'date', label: 'Date & Time', type: 'datetime-local', required: true },
  { name: 'imageUrl', label: 'Image URL', type: 'url' },
  { name: 'description', label: 'Description', type: 'textarea' },
]

export default function ManageEvents() {
  return (
    <AdminCrudPage
      title="Manage Events"
      description="Add, edit, and remove upcoming worship services, prayer nights, outreach events, and community gatherings."
      columns={columns}
      fields={fields}
      fetchFn={contentService.adminEvents}
      createFn={contentService.createEvent}
      updateFn={contentService.updateEvent}
      deleteFn={contentService.deleteEvent}
      labelKey="title"
    />
  )
}
