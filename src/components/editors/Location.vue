<template>
  <div>
    <div class="flex">
      <InputGroupText
          class="flex-1 mr-4"
          v-model="doc.location.locality"
          label="Locality"
          placeholder="locality"
      ></InputGroupText>
      <InputGroupText
          class="flex-1"
          v-model="doc.location.localityURI"
          label="Locality URI"
          placeholder="http://"
      ></InputGroupText>
    </div>

    <LocationPicker v-model="doc.location.geometry"></LocationPicker>
    <InputGroupText v-model="doc.location.geometry" label="Geometry"></InputGroupText>
    <div class="flex">
      <InputGroupVocabSelect
          class="flex-1 mr-4"
          label="Geometry Vertical Datum"
          v-model="doc.location.geometryVerticalDatum"
          :vocab="vocab.ePSG"
      ></InputGroupVocabSelect>

      <ValidationProvider name="locationSRID" rules="required" immediate v-slot="v">
        <InputGroupVocabSelect
            class="flex-1 mr-4"
            label="Geometry SRID"
            v-model="doc.location.geometrySRID"
            :vocab="vocab.ePSG"
            :errors="v.errors"
        ></InputGroupVocabSelect>
      </ValidationProvider>

      <InputGroupText
          class="flex-1"
          v-model="doc.location.geometryURI"
          label="Geometry URI"
          placeholder="http://"
      ></InputGroupText>
    </div>
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