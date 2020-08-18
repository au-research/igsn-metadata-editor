<template>
  <div class="container mx-auto text-left">
    <!-- <a href class="btn btn-blue" @click.prevent="loadSampleXML">Load Sample XML</a>
    <a href class="btn btn-blue" @click.prevent="this.loadXML('')">PopulateBlank</a>

    <select name="" v-model="vocabulary">
      <option value="csiro-igsn-codelist">CSIRO IGSN Codelist</option>
      <option value="ga-igsn-codelist">GA IGSN Codelist</option>
    </select>

    <LocaleChanger></LocaleChanger>

    <hr class="my-8"/> -->

    <ARDCv1Editor :xml="xml"></ARDCv1Editor>
  </div>
</template>

<script>
import ARDCv1Editor from "@/components/editors/ARDCv1Editor.vue";
//import LocaleChanger from "@/components/LocaleChanger.vue"
import util from "@/services/util.js";

export default {
  name: 'Editor',
  components: {
    ARDCv1Editor
  },

  data() {
    return {
      schema: null,
      versionID: null,
      xml: null
    };
  },

  methods: {
    loadXML(xml) {
      this.xml = xml
    },
    loadSampleXML() {
      this.loadXML(util.getSampleXML())
    }
  },

  mounted() {
    this.schema = this.$route.params.schema;
    this.versionID = this.$route.params.versionID;
    this.$registryService.getVersionContent(this.versionID)
        .then((data) => {
          this.loadXML(data)
        })
  }
}
</script>
