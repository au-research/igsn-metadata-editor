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
      <a
          class="btn btn-blue text-xs"
          @click.prevent="doc.alternateIdentifiers.push({})"
      >Add Alternate Identifier
      </a>
    </div>

    <div class="bg-gray-200 p-5 mb-4">
      <div
          class="flex items-center"
          v-for="(classification, index) in doc.classifications"
          :key="index"
      >
        <InputGroupText
            class="w-1/2 mr-2"
            v-model="classification.classification"
            label="Classification"
            help="classification"
        ></InputGroupText>
        <ValidationProvider
            name="classificationURI"
            class="w-1/2"
            v-slot="v" immediate
            :rules="{ regex: /https?:\/\/.+/ }"
            :customMessages="{regex: $t('igsn.validation.url')}">
          <InputGroupText
              class="mr-2"
              v-model="classification.classificationURI"
              label="Classification URI"
              :errors="v.errors"
              help="classificationURI"
          ></InputGroupText>
        </ValidationProvider>
        <a
            class="btn btn-red text-xs flex-none mt-3"
            @click.prevent="doc.classifications.splice(index, 1)"
        >Remove
        </a>
      </div>
      <a
          class="btn btn-blue text-xs"
          @click.prevent="doc.classifications.push({})"
      >Add Classification
      </a>
    </div>

    <InputGroupText v-model="doc.purpose" label="Purpose" help="purpose"></InputGroupText>

    <div class="bg-gray-200 p-5 mb-4">
      <div
          class="flex items-center"
          v-for="(sampledFeature, index) in doc.sampledFeatures"
          :key="index"
      >
        <InputGroupText
            class="w-1/2 mr-2"
            v-model="sampledFeature.sampledFeature"
            label="Sampled Feature"
            help="sampledFeature"
        ></InputGroupText>
        <ValidationProvider
            class="w-1/2"
            name="sampledFeatureURI"
            v-slot="v" immediate
            :rules="{ regex: /https?:\/\/.+/ }"
            :customMessages="{regex: $t('igsn.validation.url')}">
          <InputGroupText
              class="mr-2"
              v-model="sampledFeature.sampledFeatureURI"
              label="Sampled Feature URI"
              help="sampledFeatureURI"
              :errors="v.errors"
          ></InputGroupText>
        </ValidationProvider>
        <a
            class="btn btn-red text-xs flex-none mt-3"
            @click.prevent="doc.sampledFeatures.splice(index, 1)"
        >Remove
        </a>
      </div>
      <a
          class="btn btn-blue text-xs"
          @click.prevent="doc.sampledFeatures.push({})"
      >Add Sampled Feature
      </a>
    </div>

    <label><HelpIcon help="date"></HelpIcon>Collection/Creation Date</label>
    <input name="dateType" type="radio" v-model="dateType" v-bind:value="'timeInstant'" @change="onDateTimeChange"> Single Date
    <input name="dateType" type="radio" v-model="dateType" v-bind:value="'timePeriod'" @change="onDateTimeChange"> Date Range

    <div v-if="dateType === 'timeInstant'">
      <ValidationProvider
          name="dateTimeInstant"
          :rules="{w3cdtf: true}"
          v-slot="v" immediate
          :customMessages="{w3cdtf: $t('igsn.validation.date')}">
        <InputGroupDatePicker
            v-model="doc.dateTimeInstant"
            :errors="v.errors"
            label="Collection Date"
        ></InputGroupDatePicker>
      </ValidationProvider>
    </div>
    <div class="flex" v-if="dateType === 'timePeriod'">
      <div class="w-1/2 mr-4">
        <ValidationProvider
            name="dateTimePeriodStart"
            :rules="{w3cdtf: true}"
            v-slot="v" immediate
            :customMessages="{w3cdtf: $t('igsn.validation.date')}">
          <InputGroupDatePicker
              v-model="doc.dateTimePeriodStart"
              :errors="v.errors"
              label="Start Date"
          ></InputGroupDatePicker>
        </ValidationProvider>
      </div>
      <div class="w-1/2">
        <ValidationProvider
            name="dateTimePeriodEnd"
            :rules="{w3cdtf: true}"
            v-slot="v" immediate
            :customMessages="{w3cdtf: $t('igsn.validation.date')}">
          <InputGroupDatePicker
              v-model="doc.dateTimePeriodEnd"
              :errors="v.errors"
              label="End Date"
          ></InputGroupDatePicker>
        </ValidationProvider>
      </div>
    </div>

    <div class="flex">
      <InputGroupText class="w-1/2 mr-4" v-model="doc.method" label="Method" help="method"></InputGroupText>
      <ValidationProvider
          class="w-1/2"
          name="methodURI"
          v-slot="v" immediate
          :rules="{ regex: /https?:\/\/.+/ }"
          :customMessages="{regex: $t('igsn.validation.url')}">
      <InputGroupText v-model="doc.methodURI" label="Method URI" help="methodURL" :errors="v.errors"></InputGroupText>
      </ValidationProvider>
    </div>

    <InputGroupText v-model="doc.campaign" label="Project" placeholder="Campaign" help="project"></InputGroupText>
    <InputGroupText v-model="doc.comments" label="Comments" help="comments"></InputGroupText>
  </div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import InputGroupDatePicker from "@/components/forms/InputGroupDatePicker";
import HelpIcon from "@/components/forms/HelpIcon";
import {ValidationProvider} from 'vee-validate';

export default {
  name: "OtherInformation",
  components: {InputGroupText, InputGroupVocabSelect, InputGroupDatePicker, HelpIcon, ValidationProvider},
  props: ['doc', 'vocab'],
  data() {
    return {
      dateType: 'timeInstant'
    }
  },
  mounted() {
    if (this.doc.dateTimePeriodStart || this.doc.dateTimePeriodEnd) {
      this.dateType = 'timePeriod'
    }
  },
  methods: {
    onDateTimeChange() {
      if (this.dateType === 'timeInstant') {
        delete this.doc.dateTimePeriodStart
        delete this.doc.dateTimePeriodEnd
      } else if (this.dateType === 'timePeriod') {
        delete this.doc.dateTimeInstant
      }
      this.$forceUpdate()
      console.log(this.dateType)
    }
  }
}
</script>

<style scoped>

</style>