export default {
  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      },
    },
    test: {
      type: String,
      default: '',
    },
  },
  render() {
    // console.log('item render');
    return (
      <div
        class="demo-cell"
        onClick={() => {
          this.$emit('test');
        }}
      >
        {this.itemData.id} - {this.itemData.text}
      </div>
    );
  },
};
