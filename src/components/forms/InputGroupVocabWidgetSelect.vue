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
      endpoint: "https://demo.vocabs.ardc.edu.au/apps/vocab_widget/proxy/",
      mode_params: "http://pid.geoscience.gov.au/def/voc/ga/igsncode/materialType",
      repository: "https://demo.vocabs.ardc.edu.au/repository/api/lda/ands/csiro-igsn-geo-sample-schema-vocabulary/version-1",
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