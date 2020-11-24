<template>
  <div>
    <fieldset
        v-for="(contributor, index) in doc.contributors"
        :key="index"
        class="mb-8 bg-gray-200 p-5 shadow-lg"
    >

      <ValidationProvider name="contributorName"
                          :rules="contributor.contributorType || contributor.contributorIdentifier || contributor.contributorIdentifierType ? 'required' : ''"
                          v-slot="v" immediate
                          :customMessages="{required: $t('igsn.validation.contributorName')}">
        <InputGroupText
            v-model="contributor.contributorName"
            label="Contributor Name"
            placeholder="Fredd Bloggs"
            :errors="v.errors"
        ></InputGroupText>
      </ValidationProvider>

      <ValidationProvider name="contributorType"
                          :rules="contributor.contributorName || contributor.contributorIdentifier || contributor.contributorIdentifierType ? 'required' : ''"
                          v-slot="v" immediate
                          :customMessages="{required: $t('igsn.validation.contributorType')}">
        <InputGroupVocabSelect
            label="Contributor Type"
            v-model="contributor.contributorType"
            :vocab="vocab.contributorTypes"
            :errors="v.errors"
            help="contributorType"
        ></InputGroupVocabSelect>
      </ValidationProvider>

      <div class="flex items-start">
        <ValidationProvider
            class="w-1/2 mr-4"
            name="contributorType"
            :rules="contributor.contributorIdentifier ? 'required' : ''"
            v-slot="v" immediate :customMessages="{required: $t('igsn.validation.contributorIdentifierType')}">
          <InputGroupVocabSelect
              label="Contributor Identifier Type"
              v-model="contributor.contributorIdentifierType"
              :vocab="vocab.identifierTypes"
              help="identifierType"
              :errors="v.errors"
          ></InputGroupVocabSelect>
        </ValidationProvider>
        <ValidationProvider
            class="w-1/2"
            name="contributorIdentifier"
            :rules="contributor.contributorIdentifierType ? 'required' : ''"
            v-slot="v" immediate :customMessages="{required: $t('igsn.validation.contributorIdentifier')}">
          <InputGroupText
              v-model="contributor.contributorIdentifier"
              label="Contributor Identifier"
              placeholder="Contributor Identifier, eg. ORCID"
              :errors="v.errors"
              help="contributorIdentifier"
          ></InputGroupText>
        </ValidationProvider>
      </div>

      <a
          class="btn btn-red btn-sm"
          href
          @click.prevent="doc.contributors.splice(index, 1)"
      >Remove Contributor</a>
    </fieldset>
    <a
        class="btn btn-blue"
        href
        @click.prevent="doc.contributors.push({})"
    >Add New Contributor</a>
  </div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import {ValidationProvider} from 'vee-validate';

export default {
  name: "Contributors",
  components: {InputGroupText, InputGroupVocabSelect, ValidationProvider},
  props: ['doc', 'vocab']
}
</script>

<style scoped>

</style>