<script setup>
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

const { selectedNode } = storeToRefs(useSlinkyStore())
const { resetSelectedNode } = useSlinkyStore()
const router = useRouter()

const onClick = () => {
  if (selectedNode.value.data?.id) {
    router.push(`/details/${selectedNode.value?.data?.id}`)
    resetSelectedNode()
  }
}
</script>

<template>
  <a-drawer
    title="Node Details"
    size="default"
    :open="!!selectedNode"
    @close="resetSelectedNode"
    :class="'bg-gray-800'"
  >
    <a-descriptions bordered :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
      <a-descriptions-item label="Name">{{ selectedNode?.data?.name || '-' }}</a-descriptions-item>
      <a-descriptions-item label="Type">{{ selectedNode?.type || '-' }}</a-descriptions-item>
      <a-descriptions-item label="Description">{{
        selectedNode?.data?.data?.description || '-'
      }}</a-descriptions-item>
    </a-descriptions>

    <a-space direction="vertical">
      <a-typography-title :level="5" class="mt-4">Additional Data</a-typography-title>
      <template v-if="selectedNode?.type === 'dateTime'">
        <template v-for="(time, index) in selectedNode.data.data.times" :key="index">
          <div class="grid grid-cols-2 w-1/2 items-center">
            <span v-show="!!time?.day" class="text-xs text-green-500">{{ time.day }}</span>
            <a-time-range-picker
              :bordered="false"
              :disabled="true"
              :value="[dayjs(time.startTime, 'HH:mm'), dayjs(time.endTime, 'HH:mm')]"
              format="HH:mm"
              style="width: 150px"
            />
          </div>
        </template>
      </template>

      <template v-else-if="selectedNode?.type === 'sendMessage'">
        <a-typography-text>Messages</a-typography-text>
        <a-timeline
          v-for="(item, index) in selectedNode.data?.data?.payload || []"
          :key="index"
          style="margin-top: 16px"
        >
          <a-timeline-item color="green" v-show="item.type === 'text'">{{
            item.text
          }}</a-timeline-item>
          <a-timeline-item color="green" v-show="item.type === 'attachment'"
            ><a-image :src="item.attachment" alt="Attachment Image" :width="100"
          /></a-timeline-item>
        </a-timeline>
      </template>

      <template v-else-if="selectedNode?.type === 'addComment'">
        <a-typography-paragraph>Comments</a-typography-paragraph>
        <a-typography-text keyboard v-show="selectedNode?.data?.data?.comment">{{
          selectedNode?.data?.data?.comment
        }}</a-typography-text>
      </template>

      <a-button style="margin-top: 16px" @click="onClick">Edit Node</a-button>
    </a-space>
  </a-drawer>
</template>
