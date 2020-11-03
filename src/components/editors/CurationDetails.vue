<template>
  <div>
    <fieldset
        v-for="(curation, index) in doc.curationDetails"
        :key="index"
        class="mb-12 bg-gray-200 p-5 shadow-lg"
    >

      <ValidationProvider name="curatorName" rules="required" v-slot="v" immediate>
        <InputGroupText
            v-model="curation.curatorName"
            label="Curator"
            placeholder="Fred Bloggs"
            :errors="v.errors"
        ></InputGroupText>
      </ValidationProvider>

      <div class="my-4 border-b-2 border-t-2 py-5">
        <label>Curator Identifier</label>
        <div class="flex items-start">
          <ValidationProvider name="curatorIdentifierType" rules="required" v-slot="v" immediate>
            <InputGroupVocabSelect
                class="mr-4 w-64"
                v-model="curation.curatorIdentifierType"
                :vocab="vocab.identifierTypes"
                :required="true"
                :errors="v.errors"
            ></InputGroupVocabSelect>
          </ValidationProvider>
          <InputGroupText
              v-model="curation.curatorIdentifier"
              class="flex-1"
              :required="true"
          ></InputGroupText>
        </div>
      </div>

      <InputGroupDatePicker
          v-model="curation.curationDate"
          label="Curation Date"
      ></InputGroupDatePicker>

      <InputGroupText v-model="curation.curationLocation" label="Curation Location"></InputGroupText>

      <ValidationProvider name="curatingInstitution" rules="required" v-slot="v" immediate>
        <InputGroupText
            v-model="curation.curatingInstitution"
            label="Curating Institution"
            :errors="v.errors"></InputGroupText>
      </ValidationProvider>

      <InputGroupText v-model="curation.institutionURI" label="Curation Institution URI"></InputGroupText>

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