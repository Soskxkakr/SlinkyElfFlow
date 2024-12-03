import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { initialNodes } from '@/data/initialNodes'
import SlinkySidebar from '../SlinkySidebar.vue'

describe('SlinkySidebar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SlinkySidebar, {
      global: {
        plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
      },
    })
    setActivePinia(createPinia())
  })

  it('renders the correct initial nodes', () => {
    const nodes = wrapper.findAll('.nodes')
    expect(nodes.length).toBe(initialNodes.length)
  })
})
