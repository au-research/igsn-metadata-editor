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

    <ARDCv1Editor v-if="mode && !error" :xml="xml" :mode="mode"></ARDCv1Editor>

    <p v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
import ARDCv1Editor from "@/components/editors/ARDCv1Editor.vue";
//import LocaleChanger from "@/components/LocaleChanger.vue"

export default {
  name: 'Editor',
  components: {
    ARDCv1Editor
  },

  data() {
    return {
      schema: null,
      versionID: null,
      xml: '',
      mode: null,
      error: null
    };
  },

  computed: {

    user() {
      return this.$store.getters["auth/user"];
    }
  },

  methods: {
    loadXML(xml) {
      this.xml = xml
    }
  },

  mounted() {
    this.schema = this.$route.params.schema
    this.mode = "create"
    let that = this


    // /edit/{schema}/{prefix}/{igsn}
    if (this.$route.params.prefix && this.$route.params.igsn) {
      this.mode = "edit"
      let identifierValue = `${this.$route.params.prefix}/${this.$route.params.igsn}`
      this.$registryService.getIGSNRecordByValue(identifierValue)
      .then((data) => {

        if (data.content.length === 0) {
          that.error = `No valid record found for identifier ${identifierValue}`
          return;
        }

        let record = data.content[0]
        if (!record.currentVersions) {
          that.error = `Record ${record.id} does not have any current versions`
          return;
        }

        let version = record.currentVersions.find((version) => {
          return version.schema === that.schema && version.current === true
        })

        if (!version) {
          that.error = `No current version found for schema ${that.schema}`
          return;
        }

        let versionID = version.id
        this.$registryService.getVersionContent(versionID)
            .then((data) => {
              this.loadXML(data)
            })
      })
    }

  }
}
</script>
