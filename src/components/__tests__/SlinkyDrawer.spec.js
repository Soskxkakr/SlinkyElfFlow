import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Antd from 'ant-design-vue'
import SlinkyDrawer from '../SlinkyDrawer.vue'
import router from '@/router'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

globalThis.matchMedia =
  globalThis.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }
  }

describe('SlinkyDrawer', () => {
  let wrapper
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(SlinkyDrawer, {
      global: {
        plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn }), Antd, router],
      },
    })
    store = useSlinkyStore()
  })

  it('renders and open the drawer when selectedNode exists', async () => {
    store.selectedNode = { value: { data: { id: 1, name: 'Test Node' }, type: 'dateTime' } }
    await wrapper.vm.$nextTick()

    const drawer = wrapper.findComponent({ name: 'a-drawer' })
    expect(drawer.exists()).toBe(true)
    expect(drawer.props('open')).toBe(true)
  })

  it('does not open the drawer when selectedNode is null', async () => {
    store.selectedNode = null
    await wrapper.vm.$nextTick()

    const drawer = wrapper.findComponent({ name: 'a-drawer' })
    expect(drawer.props('open')).toBe(false)
  })
})
