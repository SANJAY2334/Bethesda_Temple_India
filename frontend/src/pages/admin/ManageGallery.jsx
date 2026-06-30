import { AdminCrudPage } from '@/components/admin/AdminCrudPage'
import { contentService } from '@/services/contentService'

const columns = [
  { label: 'Caption', key: 'caption' },
  { label: 'Category', key: 'category' },
  {
    label: 'Image',
    key: 'imageUrl',
    render: (v) =>
      v ? (
        <img src={v} alt="Gallery" className="h-10 w-16 rounded-lg object-cover" />
      ) : (
        '-'
      ),
  },
]

const fields = [
  { name: 'caption', label: 'Caption', required: true },
  { name: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { name: 'category', label: 'Category (e.g. Worship, Community)' },
  { name: 'altText', label: 'Alt Text (accessibility)' },
]

export default function ManageGallery() {
  return (
    <AdminCrudPage
      title="Manage Gallery"
      description="Upload and organize photos from worship services, outreach, and community gatherings."
      columns={columns}
      fields={fields}
      fetchFn={contentService.adminGallery}
      createFn={contentService.createGalleryItem}
      updateFn={contentService.updateGalleryItem}
      deleteFn={contentService.deleteGalleryItem}
      labelKey="caption"
    />
  )
}
