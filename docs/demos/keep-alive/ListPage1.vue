<template>
  <div class="list-page">
    <div class="page-header">
      <h4>列表页面 1 - 用户列表</h4>
      <p>这个页面展示用户信息列表，支持keep-alive状态保持</p>
    </div>

    <!-- 操作按钮 -->
    <div class="button-group">
      <button class="demo-btn" @click="addUsers">添加用户</button>
      <span>&nbsp;</span>
      <button class="demo-btn" @click="clearUsers">清空列表</button>
      <span>&nbsp;</span>
      <button class="demo-btn" @click="scrollToTop">回到顶部</button>
      <span>&nbsp;</span>
      <button class="demo-btn" @click="scrollToBottom">滚动到底部</button>
    </div>

    <!-- 页面状态信息 -->
    <div class="page-status">
      <span>用户总数: {{ userList.length }}</span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>激活的用户: {{ activatedUsers.length }}</span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData?.renderBegin }}</span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData?.renderEnd }}</span>
    </div>

    <!-- 激活状态列表 -->
    <div class="activated-list" v-if="activatedUsers.length > 0">
      <h5>最近激活的用户:</h5>
      <div class="activated-items">
        <span
          v-for="user in activatedUsers.slice(-5)"
          :key="user.id"
          class="activated-item"
        >
          {{ user.name }} ({{ user.email }})
        </span>
      </div>
    </div>

    <!-- 虚拟列表 -->
    <div class="virtual-list-container">
      <VirtList
        ref="virtListRef"
        :buffer="5"
        :list="userList"
        itemKey="id"
        :itemPreSize="80"
      >
        <template #default="{ itemData, index }">
          <UserItem
            :userData="itemData"
            :index="index"
            @deleteUser="deleteUser"
          />
        </template>
      </VirtList>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  shallowRef,
  onActivated,
  onDeactivated,
} from 'vue';
import type { Ref, ShallowRef } from 'vue';
import { VirtList } from 'vue-virt-list';
import UserItem from './UserItem.vue';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  department: string;
  joinDate: number;
}

const emit = defineEmits<{
  updateStatus: [tab: 'list1', status: string];
}>();

const virtListRef: Ref<typeof VirtList | null> = ref(null);
const userList: ShallowRef<User[]> = shallowRef([]);
const activatedUsers: Ref<User[]> = ref([]);

const reactiveData = computed(() => {
  return virtListRef.value?.reactiveData;
});

onMounted(() => {
  generateInitialUsers();
  virtListRef.value?.forceUpdate();
});

function generateInitialUsers() {
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部'];
  const initialUsers: User[] = [];

  for (let i = 1; i <= 2000; i++) {
    initialUsers.push({
      id: i,
      name: `用户 ${i}`,
      email: `user${i}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      department: departments[i % departments.length],
      joinDate: Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
    });
  }
  userList.value = initialUsers;
}

function addUsers() {
  const startId = userList.value.length + 1;
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部'];
  const newUsers: User[] = [];

  for (let i = 0; i < 5; i++) {
    newUsers.push({
      id: startId + i,
      name: `新用户 ${startId + i}`,
      email: `newuser${startId + i}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${startId + i}`,
      department: departments[(startId + i) % departments.length],
      joinDate: Date.now(),
    });
  }
  userList.value = userList.value.concat(newUsers);
  emit('updateStatus', 'list1', `用户总数: ${userList.value.length}`);
}

function clearUsers() {
  userList.value = [];
  activatedUsers.value = [];
  emit('updateStatus', 'list1', '列表已清空');
}

function scrollToTop() {
  virtListRef.value?.scrollToTop();
}

function scrollToBottom() {
  virtListRef.value?.scrollToBottom();
}

function deleteUser(id: number) {
  const targetIndex = userList.value.findIndex((user) => user.id === id);
  if (targetIndex > -1) {
    userList.value.splice(targetIndex, 1);
    activatedUsers.value = activatedUsers.value.filter(
      (user) => user.id !== id,
    );
    emit('updateStatus', 'list1', `用户总数: ${userList.value.length}`);
  }
}

function onUserActivated(user: User, index: number) {
  console.log(`用户激活: ${user.name}, 索引 ${index}`);
  if (!activatedUsers.value.find((activated) => activated.id === user.id)) {
    activatedUsers.value.push(user);
  }
}

function onUserDeactivated(user: User, index: number) {
  console.log(`用户停用: ${user.name}, 索引 ${index}`);
  activatedUsers.value = activatedUsers.value.filter(
    (activated) => activated.id !== user.id,
  );
}
</script>

<style lang="scss" scoped>
.list-page {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-bottom: 20px;

  h4 {
    margin: 0 0 8px 0;
    color: var(--vp-c-text-1);
    font-size: 18px;
  }

  p {
    margin: 0;
    color: var(--vp-c-text-2);
    font-size: 14px;
  }
}

.button-group {
  margin-bottom: 15px;

  .demo-btn {
    padding: 8px 16px;
    margin-right: 10px;
    border: 1px solid var(--vp-c-border);
    border-radius: 4px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: var(--vp-c-bg-soft);
    }
  }
}

.page-status {
  margin-bottom: 15px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.activated-list {
  margin-bottom: 15px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;

  h5 {
    margin: 0 0 8px 0;
    color: var(--vp-c-text-1);
    font-size: 14px;
  }

  .activated-items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .activated-item {
      padding: 3px 6px;
      background: var(--vp-c-brand);
      color: white;
      border-radius: 3px;
      font-size: 11px;
    }
  }
}

.virtual-list-container {
  flex: 1;
  background-color: var(--vp-sidebar-bg-color);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  overflow: hidden;
}
</style>
