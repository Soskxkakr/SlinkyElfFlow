<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useSlinkyStore } from '@/stores/useSlinkyStore.js'
import {
  validateMessageSequence,
  validateDateTime,
  validateAddComment,
} from '@/utils/useValidation'

const fileList = ref([])
const timeRanges = ref([])

const route = useRoute()
const router = useRouter()
const { sideBarNodes } = storeToRefs(useSlinkyStore())
const { onUpdateNode, onDeleteNode } = useSlinkyStore()

const { id } = route.params
const filteredNode = sideBarNodes.value.filter(
  (data) => !['trigger', 'dateTimeConnector'].includes(data.type),
)

const node = ref(filteredNode.find((data) => data.id == id))

if (node.value?.type === 'sendMessage') {
  fileList.value = node.value.data.payload
    ?.filter((data) => data.type === 'attachment')
    .map((data, index) => ({
      uid: `${index}`,
      name: `${index}.png`,
      status: 'done',
      url: data.attachment,
      thumbUrl: data.attachment,
    }))
} else if (node.value?.type === 'dateTime') {
  timeRanges.value = node.value.data?.times?.map((time) => [
    dayjs(time.startTime, 'HH:mm'),
    dayjs(time.endTime, 'HH:mm'),
  ])
}

const updateNode = () => {
  if (node.value) {
    onUpdateNode(node.value)
    message.success('Node has been updated')
    return
  }
}

const onFinishFailed = () => {
  message.error('Node update failed.')
}

const beforeUpload = (file) => {
  const isValidType = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isValidType) {
    message.error('You can only upload JPG/PNG files!')
    return false
  }
  const isLessThan2MB = file.size / 1024 / 1024 < 2
  if (!isLessThan2MB) {
    message.error('Image must be smaller than 2MB!')
    return false
  }

  const blobUrl = URL.createObjectURL(file)

  fileList.value?.push({
    uid: `${fileList.value.length++}`,
    name: file.name,
    status: 'done',
    url: blobUrl,
  })

  node.value?.data.payload?.push({
    type: 'attachment',
    attachment: blobUrl,
  })
}

const addNewMessage = (type) => {
  if (node.value?.type === 'sendMessage') {
    if (!node.value?.data?.payload) {
      node.value.data['payload'] = [
        {
          type,
          [type]: '',
        },
      ]
    } else {
      node.value?.data.payload?.push({
        type,
        [type]: '',
      })
    }
  }
}

const removeMessage = (text) => {
  if (node.value?.type === 'sendMessage' && node.value.data.payload) {
    const valueToBeRemoved = node.value.data.payload.find(
      (data) => data.text === text || data.attachment === text,
    )
    node.value.data.payload = node.value.data.payload.filter(
      (data) =>
        data.text !== valueToBeRemoved?.text || data.attachment !== valueToBeRemoved?.attachment,
    )

    if (valueToBeRemoved?.type === 'attachment') {
      fileList.value = fileList.value?.filter((data) => data.url !== valueToBeRemoved.attachment)
    }
  }
}

const updateTime = (index, value) => {
  if (node.value?.data?.times?.[index]) {
    node.value.data.times[index].startTime = value ? value[0].format('HH:mm') : ''
    node.value.data.times[index].endTime = value ? value[1].format('HH:mm') : ''
  }
}
</script>

<template>
  <a-page-header title="Slinky Elf Nodes" @back="router.back" />

  <template v-if="!!node">
    <a-form
      :model="node"
      @finish="updateNode"
      @finishFailed="onFinishFailed"
      class="border rounded border-black p-6"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Name is required!' }]"
      >
        <a-input v-model:value="node.name" placeholder="Enter node name" />
      </a-form-item>

      <a-form-item label="Description" class="">
        <a-textarea
          v-model:value="node.data.description"
          placeholder="Enter description"
          rows="4"
        />
      </a-form-item>

      <a-form-item
        v-if="node.type === 'sendMessage'"
        name="messageSequence"
        label="Message Sequence"
        :rules="[
          {
            required: true,
            validator: () => validateMessageSequence(node),
            message: 'At least one message sequence is required!',
          },
        ]"
      >
        <a-list size="small" bordered :vertical="false" :data-source="node.data.payload">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-input v-if="item.type === 'text'" v-model:value="item.text" />
              <a-image v-else-if="item.type === 'attachment'" :width="150" :src="item.attachment" />
              <template #actions>
                <a
                  key="list-loadmore-edit"
                  @click="removeMessage(item?.text || item?.attachment || '')"
                  >Delete</a
                >
              </template>
            </a-list-item>
          </template>
        </a-list>
        <a-space style="margin-top: 16px">
          <a-button block @click="addNewMessage('text')">
            <plus-outlined />
            New message
          </a-button>
          <a-upload
            :show-upload-list="false"
            :before-upload="beforeUpload"
            accept=".jpg, .png, .jpeg"
          >
            <a-button block>
              <plus-outlined />
              New Attachment
            </a-button>
          </a-upload>
        </a-space>
      </a-form-item>

      <a-form-item
        v-else-if="node.type === 'dateTime'"
        name="dateTime"
        label="Date Time"
        :rules="[
          {
            required: true,
            validator: () => validateDateTime(node),
            message: 'Date Time is invalid!',
          },
        ]"
      >
        <template v-if="node.data.times && node.data.times.length > 0">
          <template v-for="(time, index) in node.data.times" :key="index">
            <a-form-item
              :label="time?.day || `Day ${index + 1}`"
              label-align="left"
              class="grid grid-cols-2 w-full place-items-center"
            >
              <a-time-range-picker
                v-model:value="timeRanges[index]"
                @change="(value) => updateTime(index, value)"
                format="HH:mm"
              />
            </a-form-item>
          </template>
        </template>
      </a-form-item>

      <a-form-item
        v-else-if="node.type === 'addComment'"
        name="addComment"
        label="Comment"
        :rules="[
          {
            required: true,
            validator: () => validateAddComment(node),
            message: 'Comment is required!',
          },
        ]"
      >
        <a-input v-model:value="node.data.comment" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
        <a-button type="primary" html-type="submit">Save Changes</a-button>
        <a-button danger class="ml-2" @click="onDeleteNode(node)">Delete Node</a-button>
      </a-form-item>
    </a-form>
  </template>

  <template v-else>
    <p>Node not found.</p>
  </template>
</template>
