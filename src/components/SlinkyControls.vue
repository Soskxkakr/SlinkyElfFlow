<script setup>
import { reactive } from 'vue'
import { Panel, useVueFlow } from '@vue-flow/core'
import { useSlinkyStore } from '@/stores/useSlinkyStore'
import IconControls from '@/components/icons/IconControls.vue'

const { nodes, toObject } = useVueFlow()
const { onSaveNode, onAddNode } = useSlinkyStore()
const node = reactive({
  name: '',
  description: '',
  type: 'sendMessage',
})

const saveNode = () => {
  onSaveNode(toObject())
}

function onAdd() {
  if (node.name && node.type && node.description) {
    const id = nodes.value.length + 1
    onAddNode({
      id: `new_node-${id}`,
      parentId: -1,
      data: {
        description: node.description,
      },
      type: node.type,
      name: node.name,
    })
    node.name = ''
    node.description = ''
    node.type = 'sendMessage'
  }
}
</script>

<template>
  <Panel position="top-right">
    <div class="flex gap-4">
      <button title="save graph" @click="saveNode"><IconControls name="save" /></button>
      <a-popover placement="bottomRight" trigger="click">
        <button title="add random node" @click="onAdd">
          <IconControls name="add" />
        </button>
        <template #title>
          <span>Add new node</span>
        </template>
        <template #content>
          <a-space direction="vertical">
            <span>Title</span>
            <a-input
              v-model:value="node.name"
              placeholder="Title"
              class="input-field"
              style="width: 400px"
            />
            <span>Description</span>
            <a-textarea
              v-model:value="node.description"
              placeholder="Description"
              :rows="4"
              style="width: 400px"
            />
            <span>Type of node</span>
            <a-radio-group v-model:value="node.type" button-style="solid">
              <a-radio-button value="sendMessage">Send Message</a-radio-button>
              <a-radio-button value="addComment">Add Comments</a-radio-button>
              <a-radio-button value="dateTime">Business Hours</a-radio-button>
            </a-radio-group>
            <a-button type="primary" @click="onAdd">Add</a-button>
          </a-space>
        </template>
      </a-popover>
    </div>
  </Panel>
</template>
