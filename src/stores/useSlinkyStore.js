import { onBeforeMount, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { initialNodes } from '@/data/initialNodes'

export const useSlinkyStore = defineStore('slinky-flow', () => {
  const sideBarNodes = ref(initialNodes)
  const nodes = ref([])
  const edges = ref([])
  const selectedNode = ref(null)

  const onAddNode = (node) => {
    sideBarNodes.value.push(node)
    localStorage.setItem('slinky-initial-nodes', JSON.stringify(sideBarNodes.value))
  }

  const onSaveNode = (exportObj) => {
    localStorage.setItem('slinky-flow', JSON.stringify(exportObj))
    message.success('Node saved successfully.')
  }

  const onUpdateNode = (node) => {
    const filteredNodes = sideBarNodes.value.filter((sideBarNode) => sideBarNode.id !== node.id)
    filteredNodes.push(node)
    sideBarNodes.value = filteredNodes
    localStorage.setItem('slinky-initial-nodes', JSON.stringify(sideBarNodes.value))
  }

  const selectNode = (node) => {
    const id = node.id

    if (id === selectedNode.value?.id) {
      resetSelectedNode()
      return
    }

    selectedNode.value = node
  }

  const resetSelectedNode = () => {
    selectedNode.value = null
  }

  onBeforeMount(() => {
    const savedInitialNodes = localStorage.getItem('slinky-initial-nodes')

    if (savedInitialNodes) {
      const parsedState = JSON.parse(savedInitialNodes)
      sideBarNodes.value = parsedState
    } else {
      localStorage.setItem('slinky-initial-nodes', JSON.stringify(initialNodes))
    }
  })

  onMounted(() => {
    const savedState = localStorage.getItem('slinky-flow')
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      nodes.value = parsedState.nodes || []
      edges.value = parsedState.edges || []
    }
  })

  return {
    sideBarNodes,
    nodes,
    edges,
    selectedNode,
    onAddNode,
    onSaveNode,
    onUpdateNode,
    selectNode,
    resetSelectedNode,
  }
})
