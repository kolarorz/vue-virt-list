<template>
  <div style="text-align: center">
    <br />
    <br />
    <br />
    <br />
    <br />

    <span v-if="loading">30MB数据数据加载中，请稍后...</span>
    <span v-else>30MB数据数据加载已完成</span>

    <br />
    <br />
  </div>
</template>
<script>
// import fakeData from '../data/fake.json';

export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    import('../data/fake.json').then((data) => {
      this.loading = false;
      console.log(data.default);
    });
  },
};
</script>
