<template>
  <div>
    <ValidationObserver ref="primary">
      <InputGroupText
          v-model="doc.resourceIdentifier"
          :label="$t('igsn.label.resourceIdentifier')"
          :disabled="true"
      ></InputGroupText>

      <ValidationProvider name="landingPage" rules="required" v-slot="v" immediate>
        <InputGroupText
            v-model="doc.landingPage"
            :label="$t('igsn.label.landingPage')"
            :errors="v.errors"
        ></InputGroupText>
      </ValidationProvider>

      <ValidationProvider name="registeredObjectType" rules="required" v-slot="v" immediate>
        <InputGroupVocabSelect
            label="Registered Object Type"
            v-model="doc.registeredObjectType"
            :vocab="vocab.registeredObjectType"
            :errors="v.errors"
            help="registeredObjectType"
        ></InputGroupVocabSelect>
      </ValidationProvider>

      <ValidationProvider name="visibility" rules="required" v-slot="v" immediate>
        <InputGroupVocabSelect
            label="Metadata Visibility"
            v-model="doc.visibility"
            :vocab="vocab.visibility"
            v-on:change="visibilityUpdated"
            help="visibility"
            :errors="v.errors"
        ></InputGroupVocabSelect>
      </ValidationProvider>

      <InputGroupText
          v-model="doc.embargoEnd"
          v-show="doc.visibility === 'false'"
          label="Embargo Date"
      ></InputGroupText>

      <ValidationProvider name="resourceTitle" v-slot="v" rules="required" :immediate="true">
        <InputGroupText
            v-model="doc.resourceTitle"
            label="Sample or Item Title"
            placeholder="Zircons from fraser range amphibolite on expoxy SHRIMP mount sample number 175423"
            :errors="v.errors"
            help="resourceTitle"
            validation-text="Provide a title for the sample or item"
        ></InputGroupText>
      </ValidationProvider>

      <div class="bg-gray-200 p-5 mb-4">
        <label for>Sample or Item Type</label>
        <div class="mb-4" v-for="(resourceType, index) in doc.resourceTypes" :key="index">
          <ValidationProvider name="resourceType" rules="required" immediate v-slot="v">
            <InputGroupVocabSelect
                v-model="doc.resourceTypes[index]"
                :vocab="vocab.resourceTypes"
                :errors="v.errors"
                :removable="index > 0"
                @remove="doc.resourceTypes.splice(index, 1)"
            ></InputGroupVocabSelect>
          </ValidationProvider>
        </div>
        <a
            class="btn text-xs btn-blue"
            href="#"
            @click.prevent="doc.resourceTypes.push('')"
        >Add a Sample or Item Type
        </a>
      </div>

      <div class="bg-gray-200 p-5">
        <label for>Material Type</label>
        <div class="mb-4" v-for="(materialType, index) in doc.materialTypes" :key="index">
          <ValidationProvider name="materialType" rules="required" immediate v-slot="v">
            <InputGroupVocabSelect
                v-model="doc.materialTypes[index]"
                :vocab="vocab.materialTypes"
                :errors="v.errors"
                :removable="index > 0"
                @remove="doc.materialTypes.splice(index, 1)"
            ></InputGroupVocabSelect>
          </ValidationProvider>
        </div>
        <a
            class="btn text-xs btn-blue"
            href
            @click.prevent="doc.materialTypes.push('')"
        >Add a Material Type
        </a>
      </div>
    </ValidationObserver>
  </div>

</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import {ValidationObserver, ValidationProvider} from "vee-validate"

export default {
  name: "ARDCv1PrimaryInfo",
  components: {InputGroupText, ValidationProvider, ValidationObserver, InputGroupVocabSelect},
  props: ['doc', 'vocab'],
  methods: {
    // the resource is now not under embargo due to
    visibilityUpdated() {
      if (this.doc.visibility !== "false") {
        delete this.doc.embargoEnd;
      }
    },
  }
}
</script>

<style scoped>

</style>