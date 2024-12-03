import { onBeforeMount, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { initialNodes } from '@/data/initialNodes'

export const useSlinkyStore = defineStore('slinky-flow', () => {
  const sideBarNodes = ref(initialNodes)
  const nodes = ref([])
  const edges = ref([])
  const selectedNode = ref(null)
  const router = useRouter()

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

  const onDeleteNode = (node) => {
    // Remove from the initial side bar nodes
    const filteredSideBarNodes = sideBarNodes.value.filter(
      (sideBarNode) => sideBarNode.id !== node.id,
    )
    sideBarNodes.value = filteredSideBarNodes
    localStorage.setItem('slinky-initial-nodes', JSON.stringify(sideBarNodes.value))

    // Remove node that exists in the workflow
    const filteredNodes = nodes.value.filter((flowNode) => flowNode.data.id !== node.id)
    nodes.value = filteredNodes

    // Remove node that is connected with the edges
    const filteredEdges = edges.value.filter(
      (edge) => edge.sourceHandle !== node.id && edge.targetHandle !== node.id,
    )
    edges.value = filteredEdges

    // Remove node & edges in slinky-flow localstorage
    const savedState = localStorage.getItem('slinky-flow')
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      const newNodes = parsedState.nodes.filter((newNode) => newNode.data.id !== node.id)
      const newEdges = parsedState.edges.filter(
        (newEdge) => newEdge.sourceHandle !== node.id && newEdge.targetHandle !== node.id,
      )
      localStorage.setItem(
        'slinky-flow',
        JSON.stringify({
          ...parsedState,
          nodes: newNodes,
          edges: newEdges,
        }),
      )
    }
    router.push('/')
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
    onDeleteNode,
    selectNode,
    resetSelectedNode,
  }
})
