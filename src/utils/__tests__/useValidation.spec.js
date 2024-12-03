import { describe, it, expect } from 'vitest'
import {
  validateMessageSequence,
  validateDateTime,
  validateAddComment,
} from '@/utils/useValidation'

describe('Validation Functions', () => {
  describe('validateMessageSequence', () => {
    it('should reject when payload is missing', async () => {
      const node = { data: {} }

      await expect(validateMessageSequence(node)).rejects.toThrow()
    })

    it('should reject when payload is empty', async () => {
      const node = { data: { payload: [] } }

      await expect(validateMessageSequence(node)).rejects.toThrow()
    })

    it('should resolve when payload is valid', async () => {
      const node = { data: { payload: ['some data'] } }

      await expect(validateMessageSequence(node)).resolves.toBeUndefined()
    })
  })

  describe('validateDateTime', () => {
    it('should reject when times array does not have 7 items', async () => {
      const node = { data: { times: [{ startTime: '09:00', endTime: '17:00' }] } }

      await expect(validateDateTime(node)).rejects.toThrow()
    })

    it('should reject when any time entry is incomplete', async () => {
      const node = {
        data: {
          times: [
            { startTime: '09:00', endTime: '17:00' },
            { startTime: null, endTime: '12:00' },
            { startTime: '13:00', endTime: null },
            { startTime: '09:00', endTime: '17:00' },
            { startTime: '09:00', endTime: '17:00' },
            { startTime: '09:00', endTime: '17:00' },
            { startTime: '09:00', endTime: '17:00' },
          ],
        },
      }

      await expect(validateDateTime(node)).rejects.toThrow()
    })

    it('should resolve when all 7 days have valid times', async () => {
      const node = {
        data: {
          times: Array(7).fill({ startTime: '09:00', endTime: '17:00' }),
        },
      }

      await expect(validateDateTime(node)).resolves.toBeUndefined()
    })
  })

  describe('validateAddComment', () => {
    it('should reject when comment is missing', async () => {
      const node = { data: {} }

      await expect(validateAddComment(node)).rejects.toThrow()
    })

    it('should resolve when comment exists', async () => {
      const node = { data: { comment: 'This is a test comment.' } }

      await expect(validateAddComment(node)).resolves.toBeUndefined()
    })
  })
})
