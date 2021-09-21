<template>
  <input type="text" v-model="grant" class="flex-1" v-on:input="updateValue($event.target.value)">
</template>

<script>
export default {

  props: {
    value: String,
    index: Number,
    placeholder: String
  },

  data() {
    return {
      grant: this.value,
      errored: false
    };
  },

  methods: {
    updateValue(value) {
      this.$emit("input", value)
    },
  },

  mounted() {
    let that = this
    if (this.placeholder) {
      this.$el.setAttribute("placeholder", this.placeholder)
    }

    window.$(this.$el).grant_widget({
      before_html: '',
      search_text: '<i class="fas fa-search"></i> Grant Search',
      search_class: 'btn btn-blue btn-sm my-2',
      lookup: false,
      post_lookup_success_handler(data, obj, settings) {
        let result = data.records[0]
        let title = result.title
        let purl = result.purl
        that.grant = title
        that.updateValue(that.grant)
        that.$emit("update", {
          index: that.index,
          title: title,
          purl: purl
        })
      }
    });
  }
}
</script>