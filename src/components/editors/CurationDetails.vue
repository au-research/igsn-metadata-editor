<template>
  <div>
    <fieldset
        v-for="(curation, index) in doc.curationDetails"
        :key="index"
        class="mb-12 bg-gray-200 p-5 shadow-lg"
    >
      <ValidationProvider name="curatorName" rules="required" v-slot="v" immediate
                          :customMessages="{required: $t('igsn.validation.curatorName')}">
        <InputGroup
            label="Curator"
            :error="v.errors[0]"
            help="curatorName">
          <ORCIDInput
              :index="index"
              v-model="curation.curatorName"
              v-on:update="updateCurator"></ORCIDInput>
        </InputGroup>
      </ValidationProvider>

      <div class="my-4">
        <div class="flex items-start">

          <ValidationProvider class="w-1/2 mr-4"
                              name="curatorIdentifierType"
                              :rules=" curation.curatorIdentifier ? 'required': ''" v-slot="v" immediate
                              :customMessages="{required: $t('igsn.validation.curatorIdentifierType')}">
            <InputGroupVocabSelect
                v-model="curation.curatorIdentifierType"
                :vocab="vocab.identifierTypes"
                :errors="v.errors"
                label="Curator Identifier Type"
                help="identifierType"
            ></InputGroupVocabSelect>
          </ValidationProvider>
          <ValidationProvider class="w-1/2"
                              name="curatorIdentifier"
                              :rules="curation.curatorIdentifierType ? 'required' : ''" v-slot="v" immediate
                              :customMessages="{required: $t('igsn.validation.curatorIdentifier')}">
            <InputGroupText
                v-model="curation.curatorIdentifier"
                class="flex-1"
                :errors="v.errors"
                label="Curator Identifier Value"
                help="curatorIdentifier"
            ></InputGroupText>
          </ValidationProvider>

        </div>
      </div>

      <ValidationProvider name="curationDate" :rules="{ w3cdtf: true}" v-slot="v" immediate
                          :customMessages="{w3cdtf: $t('igsn.validation.date')}">
        <InputGroupDatePicker
            v-model="curation.curationDate"
            :errors="v.errors"
            label="Curation Date"
            help="curationDate"
        ></InputGroupDatePicker>
      </ValidationProvider>

      <InputGroupText v-model="curation.curationLocation" label="Curation Location"
                      help="curationLocation"></InputGroupText>

      <ValidationProvider name="curatingInstitution" rules="required" v-slot="v" immediate
                          :customMessages="{required: $t('igsn.validation.curatingInstitution')}">
        <InputGroupText
            v-model="curation.curatingInstitution"
            label="Curating Institution"
            :errors="v.errors"
            help="curatingInstitution"
        ></InputGroupText>
      </ValidationProvider>

      <ValidationProvider
          name="institutionURI"
          :rules="{ regex: /https?:\/\/.+/ }"
          :customMessages="{regex: $t('igsn.validation.url')}"
          v-slot="v" immediate>
        <InputGroupText
            v-model="curation.institutionURI"
            label="Curation Institution URI"
            help="institutionURI"
            :errors="v.errors"
        ></InputGroupText>
      </ValidationProvider>

      <a
          class="btn btn-red"
          v-if="index > 0"
          @click.prevent="doc.curationDetails.splice(index, 1)"
      >Remove Curation
      </a>
    </fieldset>

    <a
        class="btn btn-blue"
        @click.prevent="doc.curationDetails.push({})"
    >Add New Curation
    </a>
  </div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import InputGroupDatePicker from "@/components/forms/InputGroupDatePicker";
import InputGroup from "@/components/forms/InputGroup";
import ORCIDInput from "@/components/forms/ORCIDInput";
import {ValidationProvider} from 'vee-validate';

export default {
  name: "CurationDetails",
  components: {InputGroupText, InputGroup, ORCIDInput, ValidationProvider, InputGroupVocabSelect, InputGroupDatePicker},
  props: ['doc', 'vocab'],
  methods: {
    updateCurator({ index, name, orcid}) {
      this.doc.curationDetails[index].curatorName = name
      this.doc.curationDetails[index].curatorIdentifier = orcid
      this.doc.curationDetails[index].curatorIdentifierType = 'http://pid.geoscience.gov.au/def/voc/ga/igsncode/ORCID'
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>