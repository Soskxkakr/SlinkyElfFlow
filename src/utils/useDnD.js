import { ref, watch } from 'vue'
import { Position, useVueFlow } from '@vue-flow/core'
import { uuid } from 'vue-uuid'

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
  draggedNode: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
}

const useDnD = () => {
  const { draggedNode, isDragOver, isDragging } = state
  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  const onDragStart = (event, node) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', JSON.stringify(node))
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedNode.value = node
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  const onDragOver = (event) => {
    event.preventDefault()

    if (draggedNode.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  const onDragLeave = () => {
    isDragOver.value = false
  }

  const onDragEnd = () => {
    isDragging.value = false
    isDragOver.value = false
    document.removeEventListener('drop', onDragEnd)
  }

  const onDrop = (event) => {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })

    const nodeId = uuid.v4()

    const newNode = {
      id: nodeId,
      type: draggedNode.value?.type || 'trigger',
      position,
      data: draggedNode.value ? { ...draggedNode.value, toolbarPosition: Position.Top } : null,
    }

    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2,
        },
      }))

      off()
    })

    addNodes(newNode)
  }

  return {
    draggedNode,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}

export default useDnD
