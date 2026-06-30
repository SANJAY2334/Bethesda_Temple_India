import { useState, useCallback } from 'react'

/**
 * Generic mutation hook for form submits / write operations.
 * @param {(payload: any) => Promise<any>} fn - async function to call
 * @returns {{ mutate, loading, error, reset }}
 */
export function useMutation(fn) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = useCallback(
    async (payload) => {
      setLoading(true)
      setError(null)
      try {
        const result = await fn(payload)
        return result
      } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Something went wrong'
        setError(msg)
        throw new Error(msg, { cause: err })
      } finally {
        setLoading(false)
      }
    },
    [fn],
  )

  const reset = useCallback(() => setError(null), [])

  return { mutate, loading, error, reset }
}
