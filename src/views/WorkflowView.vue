<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import SlinkyControls from '@/components/SlinkyControls.vue'
import DropzoneBackground from '@/components/DropzoneBackground.vue'
import SlinkySideBar from '@/components/SlinkySidebar.vue'
import SlinkyDrawer from '@/components/SlinkyDrawer.vue'
import CustomTriggerNode from '@/components/custom/CustomTriggerNode.vue'
import CustomActionNode from '@/components/custom/CustomActionNode.vue'
import CustomUtilitiesNode from '@/components/custom/CustomUtilitiesNode.vue'
import CustomConditionNode from '@/components/custom/CustomConditionNode.vue'
import CustomDateTimeNode from '@/components/custom/CustomDateTimeNode.vue'
import useDnD from '@/utils/useDnD'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

const { onConnect, addEdges } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDnD()
const { nodes, edges } = storeToRefs(useSlinkyStore())
const customNodetypes = ref({
  trigger: CustomTriggerNode,
  sendMessage: CustomActionNode,
  addComment: CustomUtilitiesNode,
  dateTimeConnector: CustomConditionNode,
  dateTime: CustomDateTimeNode,
})

onConnect((connection) => {
  console.log(connection)
  addEdges({
    ...connection,
    id: `${connection.source}_${connection.sourceHandle}->${connection.target}`,
  })
})
</script>

<template>
  <div class="dnd-flow flex h-full sm:flex-col md:flex-col lg:flex-col xl:flex-row" @drop="onDrop">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :node-types="customNodetypes"
      @onConnect="onConnect2"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <SlinkyControls />
      <DropzoneBackground
        :style="{
          backgroundColor: '#e7f3ff',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
    </VueFlow>
    <SlinkySideBar />
    <SlinkyDrawer />
  </div>
</template>
