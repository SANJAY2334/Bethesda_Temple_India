import { useState, useEffect, useCallback } from 'react'

/**
 * Generic data-fetching hook.
 * @param {() => Promise<any>} fn  - async function to call
 * @returns {{ data, loading, error, refetch }}
 */
export function useApi(fn) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(result)
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [fn])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      run()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [run])

  return { data, loading, error, refetch: run }
}
