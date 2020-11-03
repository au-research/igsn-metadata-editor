<template>
  <div>
    <div class="bg-gray-200 p-5 mb-4">
      <div v-for="(identifier, index) in doc.alternateIdentifiers" :key="index">
        <div class="flex">
          <ValidationProvider name="alternateIdentifierType" rules="required" v-slot="v" immediate
                              :customMessages="{required: $t('igsn.validation.alternateIdentifierType')}">
            <InputGroupVocabSelect
                class="mr-4 w-32"
                label="Type"
                v-model="doc.alternateIdentifiers[index].type"
                :vocab="vocab.identifierTypes"
                :required="true"
                :errors="v.errors"
                help="identifierType"
            ></InputGroupVocabSelect>
          </ValidationProvider>
          <InputGroupText
              class="flex-1"
              v-model="doc.alternateIdentifiers[index].value"
              label="Alternate Identifier"
              :removable="true"
              help="alternateIdentifier"
              @remove="doc.alternateIdentifiers.splice(index, 1)"
          ></InputGroupText>
        </div>

      </div>
      <button
          class="btn btn-blue text-xs"
          @click.prevent="doc.alternateIdentifiers.push({})"
      >Add Alternate Identifier
      </button>
    </div>

    <div class="bg-gray-200 p-5 mb-4">
      <div
          class="flex items-center"
          v-for="(classification, index) in doc.classifications"
          :key="index"
      >
        <InputGroupText
            class="flex-1 mr-2"
            v-model="classification.classification"
            label="Classification"
            help="classification"
        ></InputGroupText>
        <ValidationProvider
            name="classificationURI"
            v-slot="v" immediate
            :rules="{ required: true, regex: /https?:\/\/.+/ }"
            :customMessages="{regex: $t('igsn.validation.url')}">
          <InputGroupText
              class="flex-1 mr-2"
              v-model="classification.classificationURI"
              label="Classification URI"
              :errors="v.errors"
              help="classificationURI"
          ></InputGroupText>
        </ValidationProvider>
        <button
            class="btn btn-red text-xs flex-none mt-3"
            @click.prevent="doc.classifications.splice(index, 1)"
        >Remove
        </button>
      </div>
      <button
          class="btn btn-blue text-xs"
          @click.prevent="doc.classifications.push({})"
      >Add Classification
      </button>
    </div>

    <InputGroupText v-model="doc.purpose" label="Purpose" help="purpose"></InputGroupText>

    <div class="bg-gray-200 p-5 mb-4">
      <div
          class="flex items-center"
          v-for="(sampledFeature, index) in doc.sampledFeatures"
          :key="index"
      >
        <InputGroupText
            class="flex-1 mr-2"
            v-model="sampledFeature.sampledFeature"
            label="Sampled Feature"
            help="sampledFeature"
        ></InputGroupText>
        <ValidationProvider
            name="sampledFeatureURI"
            v-slot="v" immediate
            :rules="{ regex: /https?:\/\/.+/ }"
            :customMessages="{regex: $t('igsn.validation.url')}">
          <InputGroupText
              class="flex-1 mr-2"
              v-model="sampledFeature.sampledFeatureURI"
              label="Sampled Feature URI"
              help="sampledFeatureURI"
              :errors="v.errors"
          ></InputGroupText>
        </ValidationProvider>
        <button
            class="btn btn-red text-xs flex-none mt-3"
            @click.prevent="doc.sampledFeatures.splice(index, 1)"
        >Remove
        </button>
      </div>
      <button
          class="btn btn-blue text-xs"
          @click.prevent="doc.sampledFeatures.push({})"
      >Add Sampled Feature
      </button>
    </div>

    <div class="flex">
      <InputGroupText class="flex-1 mr-4" v-model="doc.method" label="Method" help="method"></InputGroupText>
      <ValidationProvider
          name="methodURI"
          v-slot="v" immediate
          :rules="{ regex: /https?:\/\/.+/ }"
          :customMessages="{regex: $t('igsn.validation.url')}">
      <InputGroupText class="flex-1" v-model="doc.methodURI" label="Method URI" help="methodURL" :errors="v.errors"></InputGroupText>
      </ValidationProvider>
    </div>

    <InputGroupText v-model="doc.campaign" label="Project" placeholder="Campaign" help="project"></InputGroupText>
    <InputGroupText v-model="doc.comments" label="Comments" help="comments"></InputGroupText>
  </div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import {ValidationProvider} from 'vee-validate';

export default {
  name: "OtherInformation",
  components: {InputGroupText, InputGroupVocabSelect, ValidationProvider},
  props: ['doc', 'vocab']
}
</script>

<style scoped>

</style>