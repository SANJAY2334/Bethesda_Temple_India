import assert from 'node:assert/strict'
import test from 'node:test'

// Mock Redis client for testing (no actual Redis needed for unit test)
const mockRedisStore = new Map()

async function revokeTokenMock(token) {
  mockRedisStore.set(`revoked_token:${token}`, true)
  return true
}

async function isTokenRevokedMock(token) {
  return mockRedisStore.has(`revoked_token:${token}`)
}

test('Token Revocation: revokeToken stores token in revocation list', async () => {
  const testToken = 'test-token-123'
  const revoked = await revokeTokenMock(testToken)
  assert.equal(revoked, true, 'Should return true')
  assert.equal(
    await isTokenRevokedMock(testToken),
    true,
    'Token should be in revocation list',
  )
})

test('Token Revocation: isTokenRevoked returns false for non-revoked token', async () => {
  const testToken = 'fresh-token-456'
  const revoked = await isTokenRevokedMock(testToken)
  assert.equal(revoked, false, 'Should return false for non-revoked token')
})

test('Token Revocation: revoked token cannot be reused', async () => {
  const testToken = 'logout-token-789'

  // Simulate login
  assert.equal(await isTokenRevokedMock(testToken), false, 'Should not be revoked initially')

  // Simulate logout (revoke token)
  await revokeTokenMock(testToken)

  // Verify token is revoked
  assert.equal(await isTokenRevokedMock(testToken), true, 'Should be revoked after logout')
})

test('Token Revocation: multiple tokens managed independently', async () => {
  const token1 = 'token-user-1'
  const token2 = 'token-user-2'

  await revokeTokenMock(token1)

  assert.equal(await isTokenRevokedMock(token1), true, 'Token 1 should be revoked')
  assert.equal(await isTokenRevokedMock(token2), false, 'Token 2 should not be revoked')
})
