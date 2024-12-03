<script setup>
import { ref } from 'vue'
import { Handle, Position, useNode } from '@vue-flow/core'
import dayjs from 'dayjs'
import IconDateTime from '@/components/icons/IconDatetime.vue'
import { useSlinkyStore } from '@/stores/useSlinkyStore'

const { selectNode } = useSlinkyStore()
const { node } = useNode()
const timeRanges = ref(
  node.data?.data?.times?.map((time) => [
    dayjs(time.startTime, 'HH:mm'),
    dayjs(time.endTime, 'HH:mm'),
  ]),
)
</script>

<template>
  <div
    class="border-2 border-black rounded-lg p-4 w-full"
    @click="selectNode(node)"
    style="width: 250px"
  >
    <Handle
      type="target"
      :id="node.data.id"
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
      :id="node.data.id"
      :position="Position.Bottom"
      :style="{
        height: '16px',
        width: '16px',
        backgroundColor: 'black',
        filter: 'invert(100%)',
      }"
    />

    <div class="text-sm font-semibold flex">
      <IconDateTime />
      <p class="ml-2">{{ node.data.name }}</p>
    </div>

    <template v-if="node.data?.data?.times?.length > 0">
      <template v-for="(time, index) in node.data.data.times" :key="index">
        <div class="grid grid-cols-2 w-1/2 items-center">
          <span v-show="!!time?.day" class="text-xs text-green-500">{{ time.day }}</span>
          <a-time-range-picker
            :bordered="false"
            :disabled="true"
            v-model:value="timeRanges[index]"
            format="HH:mm"
            style="width: 150px"
          />
        </div>
      </template>
    </template>

    <div
      class="text-xs p-2 text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis"
      style="width: 100%; max-width: 280px"
      v-if="node.data.data.description"
    >
      {{ node.data.data.description }}
    </div>
  </div>
</template>
