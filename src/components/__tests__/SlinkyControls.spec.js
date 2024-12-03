import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Antd from 'ant-design-vue'
import SlinkyControls from '../SlinkyControls.vue'

describe('SlinkyControls', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SlinkyControls, {
      global: {
        plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn }), Antd],
      },
    })
    setActivePinia(createPinia())
  })

  it('renders 2 buttons with icons', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)

    buttons.forEach((button) => {
      const icon = button.find('svg')
      expect(icon.exists()).toBe(true)
    })
  })

  it('renders the popup form when "Add" button is clicked', async () => {
    const addButton = wrapper.find('button[title="add random node"]')
    expect(addButton.exists()).toBe(true)
    await addButton.trigger('click')

    // Check if the popup form is rendered
    const popoverConvent = wrapper.findComponent({ name: 'a-popover' })
    expect(popoverConvent.exists()).toBe(true)

    // Verify Title input field
    const titleInput = popoverConvent.findComponent({ name: 'a-input' })
    expect(titleInput.exists()).toBe(true)
    expect(titleInput.attributes('placeholder')).toBe('Title')

    // Verify Description textarea
    const descriptionTextarea = popoverConvent.findComponent({ name: 'a-textarea' })
    expect(descriptionTextarea.exists()).toBe(true)
    expect(descriptionTextarea.attributes('placeholder')).toBe('Description')

    // Verify Radio Buttons for "Type of node"
    const radioGroup = popoverConvent.findComponent({ name: 'a-radio-group' })
    const radioButtons = radioGroup.findAllComponents({ name: 'a-radio-button' })
    expect(radioButtons.length).toBe(3)
    expect(radioButtons[0].text()).toBe('Send Message')
    expect(radioButtons[1].text()).toBe('Add Comments')
    expect(radioButtons[2].text()).toBe('Business Hours')

    // Verify the "Add" button inside the form
    const formAddButton = popoverConvent.findComponent({ name: 'a-button' })
    expect(formAddButton.exists()).toBe(true)
    expect(formAddButton.text()).toBe('Add')
  })
})
