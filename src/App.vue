<script setup>
import { ref, computed } from 'vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  BarsOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const selectedKeys = ref(['1'])
const collapsed = ref(false)
const router = useRouter()

const menuItems = [
  { key: '1', icon: SettingOutlined, label: 'Workflow', path: '/' },
  { key: '2', icon: BarsOutlined, label: 'Details', path: '/details' },
]

const toggleIcon = computed(() => (collapsed.value ? MenuUnfoldOutlined : MenuFoldOutlined))

const selectMenuItem = (key, path) => {
  selectedKeys.value = [key]
  router.push(path)
}
</script>

<template>
  <div class="flex h-screen">
    <div
      :class="[
        'bg-gray-800 text-white min-h-full flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      ]"
    >
      <h1 class="logo h-8 m-4 rounded text-lg text-center">
        {{ collapsed ? 'SE' : 'Slinky Elf' }}
      </h1>
      <ul class="flex-1">
        <li
          v-for="item in menuItems"
          :key="item.key"
          :class="[
            'flex items-center space-x-2 p-4 cursor-pointer hover:bg-gray-700',
            selectedKeys.includes(item.key) ? 'bg-gray-700' : '',
          ]"
          @click="selectMenuItem(item.key, item.path)"
        >
          <component :is="item.icon" />
          <span v-if="!collapsed" class="text-sm">{{ item.label }}</span>
        </li>
      </ul>
    </div>

    <div class="flex flex-col flex-1">
      <div class="bg-white h-16 flex items-center px-6 shadow">
        <div
          @click="() => (collapsed = !collapsed)"
          class="text-lg cursor-pointer transition-transform duration-300"
        >
          <component :is="toggleIcon" />
        </div>
      </div>

      <div class="flex-1 px-2 bg-white shadow">
        <keep-alive include="workflow">
          <RouterView />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
