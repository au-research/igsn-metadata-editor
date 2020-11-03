<template>
  <div>
    <fieldset
        v-for="(curation, index) in doc.curationDetails"
        :key="index"
        class="mb-12 bg-gray-200 p-5 shadow-lg"
    >
      <ValidationProvider name="curatorName" rules="required" v-slot="v" immediate :customMessages="{required: $t('igsn.validation.curatorName')}">
        <InputGroupText
            v-model="curation.curatorName"
            label="Curator"
            placeholder="Fred Bloggs"
            :errors="v.errors"
            help="curatorName"
        ></InputGroupText>
      </ValidationProvider>

      <div class="my-4">
        <div class="flex items-start">
          <ValidationProvider name="curatorIdentifierType" rules="required" v-slot="v" immediate :customMessages="{required: $t('igsn.validation.curatorIdentifierType')}">
            <InputGroupVocabSelect
                class="mr-4 w-64"
                v-model="curation.curatorIdentifierType"
                :vocab="vocab.identifierTypes"
                :errors="v.errors"
                label="Curator Identifier Type"
                help="identifierType"
            ></InputGroupVocabSelect>
          </ValidationProvider>
          <ValidationProvider name="curatorIdentifier" rules="required" v-slot="v" immediate :customMessages="{required: $t('igsn.validation.curatorIdentifier')}">
          <InputGroupText
              v-model="curation.curatorIdentifier"
              class="flex-1"
              :errors="v.errors"
              label="Curator Identifier Value"
          ></InputGroupText>
          </ValidationProvider>
        </div>
      </div>

      <ValidationProvider name="curationDate" :rules="{required: true, regex: /\d{4}-\d{2}-\d{2}/}" v-slot="v" immediate :customMessages="{regex: $t('igsn.validation.date')}">
        <InputGroupDatePicker
            v-model="curation.curationDate"
            :errors="v.errors"
            label="Curation Date"
            help="curationDate"
        ></InputGroupDatePicker>
      </ValidationProvider>

      <InputGroupText v-model="curation.curationLocation" label="Curation Location" help="curationLocation"></InputGroupText>

      <ValidationProvider name="curatingInstitution" rules="required" v-slot="v" immediate>
        <InputGroupText
            v-model="curation.curatingInstitution"
            label="Curating Institution"
            :errors="v.errors"
            help="curatingInstitution"
        ></InputGroupText>
      </ValidationProvider>

      <ValidationProvider
          name="institutionURI"
          :rules="{ required: true, regex: /https?:\/\/.+/ }"
          :customMessages="{regex: $t('igsn.validation.url'), required: $t('igsn.validation.url')}"
          v-slot="v" immediate>
        <InputGroupText
            v-model="curation.institutionURI"
            label="Curation Institution URI"
            help="institutionURI"
            :errors="v.errors"
        ></InputGroupText>
      </ValidationProvider>

      <button
          class="btn btn-red"
          v-if="index > 0"
          @click.prevent="doc.curationDetails.splice(index, 1)"
      >Remove Curation
      </button>
    </fieldset>

    <button
        class="btn btn-blue"
        @click.prevent="doc.curationDetails.push({})"
    >Add New Curation
    </button>
  </div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import InputGroupDatePicker from "@/components/forms/InputGroupDatePicker";
import {ValidationProvider, ValidationObserver} from 'vee-validate';

export default {
  name: "CurationDetails",
  components: {InputGroupText, ValidationProvider, InputGroupVocabSelect, InputGroupDatePicker},
  props: ['doc', 'vocab']
}
</script>

<style scoped>

</style>