<script setup>
import { Handle, Position, useNode } from '@vue-flow/core'
import TriggerIcon from '@/components/icons/IconTrigger.vue'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

const { selectNode } = useSlinkyStore()
const { node } = useNode()
</script>

<template>
  <div class="border-2 border-black rounded-lg p-4 w-full" @click="selectNode(node)">
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
    <div class="text-sm font-semibold mb-2 flex">
      <TriggerIcon />
      <p class="ml-2">Start</p>
    </div>

    <div class="text-xs mt-2">Conversation Started</div>
  </div>
</template>
