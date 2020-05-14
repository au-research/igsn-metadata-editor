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
    
    <CSIROv3Editor :xml="xml" :vocabulary="vocabulary"></CSIROv3Editor>
  </div>
</template>

<script>
import CSIROv3Editor from "@/components/editors/CSIROv3Editor.vue";
//import LocaleChanger from "@/components/LocaleChanger.vue"
import util from "@/services/util.js";

export default {
  name: 'Editor',
  components: {
    CSIROv3Editor
  },
  data() {
    return {
      schema: '',
      documentID: '',
      vocabulary: 'csiro-igsn-codelist',
      xml: ''
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
    // debug
    this.loadSampleXML()
    console.log(this.$route.params)
    this.schema = this.$route.params.schema
    this.documentID = this.$route.params.docID

    // check schema

    if (this.documentID == "CSTSTDOCO1"){
      this.loadSampleXML()
    } else {
      this.loadXML("")
    }

    // check documentID based on schema
  }
}
</script>
