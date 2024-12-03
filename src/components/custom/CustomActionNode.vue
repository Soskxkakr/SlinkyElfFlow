<script setup>
import { Handle, Position, useNode } from '@vue-flow/core'
import IconAction from '@/components/icons/IconAction.vue'
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
      type="target"
      :id="`${node.data.id}`"
      :position="Position.Top"
      :style="{
        height: '16px',
        width: '16px',
        backgroundColor: 'black',
        filter: 'invert(100%)',
      }"
    />
    <Handle
      type="source"
      :id="`${node.data.id}`"
      :position="Position.Bottom"
      :style="{
        height: '16px',
        width: '16px',
        backgroundColor: 'black',
        filter: 'invert(100%)',
      }"
    />

    <div class="text-sm font-semibold mb-2 flex">
      <IconAction />
      <p class="ml-2">Send Message</p>
    </div>

    <div v-for="(item, index) in node.data?.data?.payload || []" :key="index">
      <div v-show="item.type === 'text'" class="flex items-center mb-2">
        <span class="text-xs text-green-500 bg-stone-600 p-2 w-full"
          >{{ index + 1 }}: {{ item.text }}</span
        >
      </div>
      <div v-show="item.type === 'attachment'" class="flex items-center mb-2">
        <span class="text-xs text-green-500 bg-stone-600 p-2"
          >{{ index + 1 }}: <em>Attachment</em></span
        >
      </div>
    </div>
  </div>
</template>
