<template>
<div>
  <fieldset
      v-for="(related, index) in doc.relatedResources"
      :key="index"
      class="mb-12 bg-gray-200 p-5 shadow-lg"
  >

    <InputGroup
        label="Related Resource Title">
        <GrantInput
            :index="index"
            placeholder="Related Resource Title"
            v-model="related.relatedResourceTitle"
            v-on:update="updateRelatedResource">
        </GrantInput>
    </InputGroup>

    <div class="flex items-start">
      <ValidationProvider
          name="relatedResourceIdentifierType"
          class="w-1/2 mr-4"
          :rules="related.relatedResourceTitle || related.relatedResourceIdentifier ? 'required' : ''"
          v-slot="v" immediate
          :customMessages="{required: $t('igsn.validation.relatedResourceIdentifierType')}">
        <InputGroupVocabSelect
            label="Related Identifier Type"
            v-model="related.relatedResourceIdentifierType"
            :vocab="vocab.identifierTypes"
            :errors="v.errors"
            help="identifierType"
        ></InputGroupVocabSelect>
      </ValidationProvider>
      <ValidationProvider
          name="relatedResourceIdentifier"
          class="w-1/2"
          :rules="related.relatedResourceTitle || related.relatedResourceIdentifierType ? 'required' : ''"
          v-slot="v" immediate
          :customMessages="{required: $t('igsn.validation.relatedResourceIdentifier')}">
        <InputGroupText
            v-model="related.relatedResourceIdentifier"
            label="Related Resource Identifier"
            placeholder="Related Resource Identifier"
            :errors="v.errors"
            help="relatedResourceIdentifier"
        ></InputGroupText>
      </ValidationProvider>
    </div>

    <ValidationProvider
        name="relatedResourceRelationType"
        :rules="related.relatedResourceTitle || related.relatedResourceIdentifierType || related.relatedResourceIdentifier? 'required' : ''"
        v-slot="v" immediate
        :customMessages="{required: $t('igsn.validation.relatedResourceRelationType')}">
      <InputGroupVocabSelect
          label="Relation Type"
          v-model="related.relationType"
          :vocab="vocab.relationTypes"
          :errors="v.errors"
          help="relatedResourceRelationType"
      ></InputGroupVocabSelect>
    </ValidationProvider>

    <a
        class="btn btn-sm btn-red"
        href
        @click.prevent="doc.relatedResources.splice(index, 1)"
    >Remove Related Resource</a>
  </fieldset>

  <a
      class="btn btn-blue"
      href
      @click.prevent="doc.relatedResources.push({})"
  >Add New Related Resource</a>
</div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import GrantInput from "@/components/forms/GrantInput";
import InputGroup from "@/components/forms/InputGroup";

import {ValidationProvider, ValidationObserver} from 'vee-validate';
export default {
name: "RelatedResource",
  components: {InputGroupText, InputGroupVocabSelect, InputGroup, GrantInput, ValidationProvider},
  props: ['doc', 'vocab'],
  methods: {
    updateRelatedResource({ index, title, purl }) {
      this.doc.relatedResources[index].relatedResourceTitle = title
      this.doc.relatedResources[index].relatedResourceIdentifier = purl
      this.doc.relatedResources[index].relatedResourceIdentifierType = 'http://pid.geoscience.gov.au/def/voc/ga/igsncode/PURL'
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>