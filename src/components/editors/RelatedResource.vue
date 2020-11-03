<template>
<div>
  <fieldset
      v-for="(related, index) in doc.relatedResources"
      :key="index"
      class="mb-12 bg-gray-200 p-5 shadow-lg"
  >
    <InputGroupText
        v-model="related.relatedResourceTitle"
        label="Related Resource"
    ></InputGroupText>

    <InputGroupText
        v-model="related.relatedResourceIdentifier"
        label="Related Resource Identifier"
        placeholder="Grant Search"
    ></InputGroupText>

    <ValidationProvider name="relatedResourceIdentifierType" rules="required" v-slot="v" immediate>
      <InputGroupVocabSelect
          label="Related Identifier Type"
          v-model="related.relatedResourceIdentifierType"
          :vocab="vocab.identifierTypes"
          :errors="v.errors"
      ></InputGroupVocabSelect>
    </ValidationProvider>

    <ValidationProvider name="relatedResourceRelationType" rules="required" v-slot="v" immediate>
      <InputGroupVocabSelect
          label="Relation Type"
          v-model="related.relationType"
          :vocab="vocab.relationTypes"
          :errors="v.errors"
      ></InputGroupVocabSelect>
    </ValidationProvider>

    <a
        class="btn btn-red"
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
import {ValidationProvider, ValidationObserver} from 'vee-validate';
export default {
name: "RelatedResource",
  components: {InputGroupText, InputGroupVocabSelect, ValidationProvider},
  props: ['doc', 'vocab']
}
</script>

<style scoped>

</style>