<script setup>
import { Handle, Position, useNode } from '@vue-flow/core'
import IconUtilities from '@/components/icons/IconUtilities.vue'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

const { selectNode } = useSlinkyStore()
const { node } = useNode()
</script>

<template>
  <div
    class="border-2 border-black rounded-lg p-4 w-full"
    @click="selectNode(node)"
    style="width: 300px"
  >
    <Handle
      type="source"
      :id="node.data.id"
      :position="Position.Bottom"
      :style="{
        height: '16px',
        width: '16px',
        backgroundColor: 'black',
        filter: 'invert(100%)',
      }"
    />
    <div class="text-sm font-semibold mb-2 flex">
      <IconUtilities />
      <p class="ml-2">Comment</p>
    </div>
    <div class="flex items-center mb-2">
      <span class="text-xs p-2">{{ node.data.data.comment }}</span>
    </div>
  </div>
</template>
