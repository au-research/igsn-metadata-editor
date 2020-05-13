<template>
  <select :value="value" v-on:input="updateValue($event.target.value)"></select>
</template>

<script>
export default {
  name: "InputGroupVocabWidgetSelect",
  props: {
    label: String,
    value: String
  },
  mounted() {
    window.$(this.$el).vocab_widget({
      mode: "collection",
      endpoint: "https://vocabs.ands.org.au/apps/vocab_widget/proxy/",
      mode_params: "http://pid.geoscience.gov.au/def/voc/ga/igsncode/identifierType",
      repository: "http://vocabs.ands.org.au/repository/api/lda/ga/igsn-codelist/v1-0",
      cache: false,
      target_field: "about",
      fields: ["label"]
    });
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);

      // only emit the change event if the parent is listening to it
      if (this.$listeners && this.$listeners.change) {
        this.$emit("change", value);
      }
    }
  }
};
</script>