<template>
  <div>
    <div class="flex">
      <InputGroupText
          class="w-1/2 mr-4"
          v-model="doc.location.locality"
          label="Locality"
          placeholder="locality"
          help="locality"
      ></InputGroupText>

      <ValidationProvider
          class="w-1/2"
          name="localityURL"
          v-slot="v" immediate
          :rules="{ regex: /https?:\/\/.+/ }"
          :customMessages="{regex: $t('igsn.validation.url')}">
        <InputGroupText
            v-model="doc.location.localityURI"
            :errors="v.errors"
            label="Locality URI"
            placeholder="http://"
            help="localityURL"
        ></InputGroupText>
      </ValidationProvider>
    </div>

    <LocationPicker v-model="doc.location.geometry"></LocationPicker>

    <InputGroupText v-model="doc.location.geometry" label="Geometry" help="wkt"></InputGroupText>
    <div class="flex">
      <InputGroupVocabSelect
          class="w-1/2 mr-4"
          label="Geometry Vertical Datum"
          v-model="doc.location.geometryVerticalDatum"
          :vocab="vocab.ePSG"
          help="verticalDatum"
      ></InputGroupVocabSelect>

      <ValidationProvider
          class="w-1/2"
          name="locationSRID"
          :rules="doc.location.geometry || doc.location.geometryVerticalDatum || doc.location.geometryURI ? 'required' : ''"
          immediate v-slot="v">
        <InputGroupVocabSelect
            class="mr-4"
            label="Geometry SRID"
            v-model="doc.location.geometrySRID"
            :vocab="vocab.ePSG"
            :errors="v.errors"
            help="srid"
        ></InputGroupVocabSelect>
      </ValidationProvider>
    </div>
    <ValidationProvider
        name="geometryURI"
        v-slot="v" immediate
        :rules="{ regex: /https?:\/\/.+/ }"
        :customMessages="{regex: $t('igsn.validation.url')}">
      <InputGroupText
          class="flex-1"
          v-model="doc.location.geometryURI"
          label="Geometry URI"
          :errors="v.errors"
          placeholder="http://"
          help="geometryURL"
      ></InputGroupText>
    </ValidationProvider>
  </div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import LocationPicker from "@/components/forms/LocationPicker";
import {ValidationProvider, ValidationObserver} from 'vee-validate';

export default {
  name: "Location",
  components: {InputGroupText, InputGroupVocabSelect, LocationPicker, ValidationProvider},
  props: ['doc', 'vocab']
}
</script>

<style scoped>

</style>