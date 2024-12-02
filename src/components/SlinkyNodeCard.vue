<script setup>
const props = defineProps({
  node: null,
})
</script>

<template>
  <div class="border-2 border-white rounded-lg px-4 py-2 w-full">
    <div class="text-sm font-semibold mb-2">
      {{ props.node.name || 'Trigger' }}
    </div>

    <div v-for="(item, index) in props.node?.data?.payload || []" :key="index">
      <div v-show="item.type === 'text'" class="flex items-center mb-2">
        <span class="text-xs text-green-500">{{ index + 1 }}: {{ item.text }}</span>
      </div>
      <div v-show="item.type === 'attachment'" class="flex items-center mb-2">
        <span class="text-xs text-green-500">{{ index + 1 }}: <em>Attachment</em></span>
      </div>
    </div>

    <div v-if="props.node?.data?.comment" class="text-xs text-white mt-2">
      {{ props.node.data.comment }}
    </div>

    <div v-if="props.node.type === 'trigger'" class="text-xs text-white mt-2">
      Conversation Started
    </div>

    <div v-else-if="props.node.type === 'dateTime'" class="text-xs text-white mt-2">
      Date Sequence: {{ props.node.data?.times.length }}
    </div>
  </div>
</template>
