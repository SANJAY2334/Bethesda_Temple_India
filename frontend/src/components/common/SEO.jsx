import { Helmet } from 'react-helmet-async'

export function SEO({ title, description, path = '/', image = '/Church icon.svg' }) {
  const site = 'Bethesda Temple'
  const fullTitle = title ? `${title} | ${site}` : `${site} | Peaceful Worship and Community`
  const url = `${import.meta.env.VITE_SITE_URL || 'https://example.com'}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Church',
          name: 'Bethesda Temple',
          url,
          address: 'Bethesda Temple , Ataide plaza, 3rd floor, below Union Bank of India ATM, Shahu nagar, Bauxite road, Belagavi, Karnataka, India- 590010',
          sameAs: ['https://www.youtube.com/', 'https://www.instagram.com/'],
        })}
      </script>
    </Helmet>
  )
}
