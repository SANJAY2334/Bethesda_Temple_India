import { AdminCrudPage } from '@/components/admin/AdminCrudPage'
import { contentService } from '@/services/contentService'

const columns = [
  { label: 'Title', key: 'title' },
  { label: 'Speaker', key: 'speaker' },
  { label: 'Passage', key: 'passage' },
  { label: 'Date', key: 'publishedAt', render: (v) => (v ? new Date(v).toLocaleDateString() : '-') },
]

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'speaker', label: 'Speaker', required: true },
  { name: 'passage', label: 'Scripture Passage', required: true },
  { name: 'youtubeUrl', label: 'YouTube URL', type: 'url' },
  { name: 'thumbnailUrl', label: 'Thumbnail URL', type: 'url' },
  { name: 'publishedAt', label: 'Date', type: 'date', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
]

export default function ManageSermons() {
  return (
    <AdminCrudPage
      title="Manage Sermons"
      description="Create, edit, publish, and archive sermon video cards with speaker, passage, thumbnail, and media links."
      columns={columns}
      fields={fields}
      fetchFn={contentService.adminSermons}
      createFn={contentService.createSermon}
      updateFn={contentService.updateSermon}
      deleteFn={contentService.deleteSermon}
      labelKey="title"
    />
  )
}
