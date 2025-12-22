<template>
  <div class="list-page">
    <div class="page-header">
      <h4>列表页面 2 - 产品列表</h4>
      <p>这个页面展示产品信息列表，支持keep-alive状态保持</p>
    </div>

    <!-- 操作按钮 -->
    <div class="button-group">
      <button class="demo-btn" @click="addProducts">添加产品</button>
      <span>&nbsp;</span>
      <button class="demo-btn" @click="clearProducts">清空列表</button>
      <span>&nbsp;</span>
      <button class="demo-btn" @click="scrollToTop">回到顶部</button>
      <span>&nbsp;</span>
      <button class="demo-btn" @click="scrollToBottom">滚动到底部</button>
    </div>

    <!-- 页面状态信息 -->
    <div class="page-status">
      <span>产品总数: {{ productList.length }}</span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>激活的产品: {{ activatedProducts.length }}</span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData?.renderBegin }}</span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData?.renderEnd }}</span>
    </div>

    <!-- 激活状态列表 -->
    <div class="activated-list" v-if="activatedProducts.length > 0">
      <h5>最近激活的产品:</h5>
      <div class="activated-items">
        <span
          v-for="product in activatedProducts.slice(-5)"
          :key="product.id"
          class="activated-item"
        >
          {{ product.name }} (¥{{ product.price }})
        </span>
      </div>
    </div>

    <!-- 虚拟列表 -->
    <div class="virtual-list-container">
      <VirtList
        ref="virtListRef"
        :list="productList"
        itemKey="id"
        :itemPreSize="100"
      >
        <template #default="{ itemData, index }">
          <ProductItem
            :productData="itemData"
            :index="index"
            @deleteProduct="deleteProduct"
          />
        </template>
      </VirtList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, shallowRef } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import { VirtList } from 'vue-virt-list';
import ProductItem from './ProductItem.vue';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  createDate: number;
}

const emit = defineEmits<{
  updateStatus: [tab: 'list2', status: string];
}>();

const virtListRef: Ref<typeof VirtList | null> = ref(null);
const productList: ShallowRef<Product[]> = shallowRef([]);
const activatedProducts: Ref<Product[]> = ref([]);

const reactiveData = computed(() => {
  return virtListRef.value?.reactiveData;
});

onMounted(() => {
  generateInitialProducts();
  virtListRef.value?.forceUpdate();
});

function generateInitialProducts() {
  const categories = ['电子产品', '服装', '家居', '图书', '运动', '美妆'];
  const initialProducts: Product[] = [];

  for (let i = 1; i <= 2000; i++) {
    initialProducts.push({
      id: i,
      name: `产品 ${i}`,
      description: `这是第 ${i} 个产品的详细描述，包含了产品的各种特性和优势`,
      price: Math.floor(Math.random() * 1000) + 100,
      category: categories[i % categories.length],
      image: `https://picsum.photos/200/200?random=${i}`,
      stock: Math.floor(Math.random() * 100) + 1,
      createDate: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    });
  }
  productList.value = initialProducts;
}

function addProducts() {
  const startId = productList.value.length + 1;
  const categories = ['电子产品', '服装', '家居', '图书', '运动', '美妆'];
  const newProducts: Product[] = [];

  for (let i = 0; i < 5; i++) {
    newProducts.push({
      id: startId + i,
      name: `新产品 ${startId + i}`,
      description: `这是新添加的第 ${startId + i} 个产品`,
      price: Math.floor(Math.random() * 1000) + 100,
      category: categories[(startId + i) % categories.length],
      image: `https://picsum.photos/200/200?random=${startId + i}`,
      stock: Math.floor(Math.random() * 100) + 1,
      createDate: Date.now(),
    });
  }
  productList.value = productList.value.concat(newProducts);
  emit('updateStatus', 'list2', `产品总数: ${productList.value.length}`);
}

function clearProducts() {
  productList.value = [];
  activatedProducts.value = [];
  emit('updateStatus', 'list2', '列表已清空');
}

function scrollToTop() {
  virtListRef.value?.scrollToTop();
}

function scrollToBottom() {
  virtListRef.value?.scrollToBottom();
}

function deleteProduct(id: number) {
  const targetIndex = productList.value.findIndex(
    (product) => product.id === id,
  );
  if (targetIndex > -1) {
    productList.value.splice(targetIndex, 1);
    activatedProducts.value = activatedProducts.value.filter(
      (product) => product.id !== id,
    );
    emit('updateStatus', 'list2', `产品总数: ${productList.value.length}`);
  }
}

function onProductActivated(product: Product, index: number) {
  console.log(`产品激活: ${product.name}, 索引 ${index}`);
  if (
    !activatedProducts.value.find((activated) => activated.id === product.id)
  ) {
    activatedProducts.value.push(product);
  }
}

function onProductDeactivated(product: Product, index: number) {
  console.log(`产品停用: ${product.name}, 索引 ${index}`);
  activatedProducts.value = activatedProducts.value.filter(
    (activated) => activated.id !== product.id,
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
