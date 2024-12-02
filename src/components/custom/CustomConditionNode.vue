<script setup>
import { Handle, Position, useNode } from '@vue-flow/core'
import IconConditions from '@/components/icons/IconConditions.vue'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

const { selectNode } = useSlinkyStore()
const { node } = useNode()
</script>

<template>
  <div class="border-2 border-black rounded-lg p-4 w-full" @click="selectNode(node)">
    <Handle
      type="source"
      :position="Position.Top"
      :style="{
        height: '16px',
        width: '16px',
        backgroundColor: 'black',
        filter: 'invert(100%)',
      }"
    />
    <Handle
      type="target"
      :position="Position.Bottom"
      :style="{
        height: '16px',
        width: '16px',
        backgroundColor: 'black',
        filter: 'invert(100%)',
      }"
    />

    <div class="text-sm font-semibold flex">
      <IconConditions :name="node.data.data.connectorType" />
      <p class="ml-2">{{ node.data.name }}</p>
    </div>
  </div>
</template>
