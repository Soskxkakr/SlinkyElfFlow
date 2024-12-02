<script setup>
import useDnD from '@/utils/useDnD'
import SlinkyNodeCard from '@/components/SlinkyNodeCard.vue'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

const { onDragStart } = useDnD()
const { sideBarNodes, resetSelectedNode } = useSlinkyStore()

const EVENT_MAP = {
  trigger: 'Triggers',
  sendMessage: 'Actions',
  addComment: 'Utilities',
  dateTimeConnector: 'Conditions',
  dateTime: 'DateTime',
}
</script>

<template>
  <aside
    class="text-white border-r border-gray-200 p-3.5 text-xs bg-gray-800 shadow-md overflow-y-auto"
    @click="resetSelectedNode"
  >
    <h1 class="logo h-8 m-4 rounded text-lg text-center text-white font-bold">Slinky Elf Nodes</h1>
    <template v-for="(event, index) in Object.keys(EVENT_MAP)" :key="index">
      <div class="description mb-2 text-white">{{ EVENT_MAP[event] }}</div>
      <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div
          class="nodes cursor-grab"
          v-for="node in sideBarNodes.filter((sbNode) => sbNode.type === event)"
          :key="node.id"
          :draggable="true"
          @dragstart="onDragStart($event, node)"
        >
          <template v-if="Object.keys(EVENT_MAP).includes(node.type)">
            <SlinkyNodeCard :node="node" />
          </template>
        </div>
      </div>
    </template>
  </aside>
</template>
