<script setup>
import { reactive } from 'vue'
import { Panel, useVueFlow } from '@vue-flow/core'
import { uuid } from 'vue-uuid'
import { useSlinkyStore } from '@/stores/useSlinkyStore'
import IconControls from '@/components/icons/IconControls.vue'

const { toObject } = useVueFlow()
const { onSaveNode, onAddNode } = useSlinkyStore()
const node = reactive({
  name: '',
  description: '',
  type: 'sendMessage',
})

const saveNode = () => {
  onSaveNode(toObject())
}

const onAdd = () => {
  if (node.name && node.type && node.description) {
    onAddNode({
      id: uuid.v4(),
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
          <a-form
            :model="node"
            @finish="onAdd"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-space direction="vertical">
              <span>Name</span>
              <a-input
                v-model:value="node.name"
                placeholder="Name"
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
          </a-form>
        </template>
      </a-popover>
    </div>
  </Panel>
</template>
