<template>
  <input type="text" v-model="orcid" class="flex-1" v-on:input="updateValue($event.target.value)">
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
      orcid: this.value,
      errored: false
    };
  },

  computed: {
      user() {
        return this.$store.getters['auth/user']
    }
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

    window.$(this.$el).orcid_widget({
      before_html: '',
      lookup: false,
      pre_open_search: true,
      auto_search: true,
      auto_search_query: this.user.name,
      search_class: 'btn btn-white btn-sm my-2 border-blue border-solid border',
      search_text: '<i class="fas fa-search"></i> ORCID Search <img class="inline" src="https://researchdata.edu.au/assets/core/images/icons/orcid_icon.png" alt="ORCID Search">',
      post_lookup_success_handler(data, obj, setttings) {
        let name = data.person.name['credit-name']
            ? data.person.name['credit-name']['value']
            : data.person.name['given-names']['value'] + ' ' + data.person.name['family-name']['value'];

        that.orcid = name;
        that.$emit('update', {
          index: that.index,
          name: name,
          orcid: data.orcid
        })
      }
    })
  }
}
</script>