<template>
  <div>
    <ValidationObserver ref="primary">

      <InputGroup label="Owner" v-if="mode === 'create'">
        <div class="flex">
          <select
              name
              v-model="owner"
          >
            <option v-for="item in ownerValues" :key="item.value" :value="item.value">{{ item.label }}</option>
          </select>
        </div>
      </InputGroup>

      <!-- Owner-->
      <ValidationProvider
          v-if="mode === 'create' "
          name="resourceIdentifier"
          v-slot="v" immediate
          :rules="{ required: true, regex: /([A-Za-z0-9\-.]+)/ }"
          :customMessages="{regex: 'IGSN Failed Regex', required: 'Please provide an identifier'}">
        <InputGroup :label="$t('igsn.label.resourceIdentifier')"
                    help="resourceIdentifier"
                    :error="v.valid ? '' : v.errors[0]">
          <div class="flex flex-rows items-center">
            <span
                class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight h-10 bg-gray-100"
                v-text="igsn.prefix + '/' + igsn.namespace"/>
            <input type="text" v-model="igsn.value"/>
          </div>
        </InputGroup>
      </ValidationProvider>

      <InputGroupText
          v-if="mode === 'edit' "
          v-model="doc.resourceIdentifier"
          :label="$t('igsn.label.resourceIdentifier')"
          :disabled="true"
          help="resourceIdentifier"
      ></InputGroupText>

      <ValidationProvider
          name="landingPage"
          v-slot="v" immediate
          :rules="{ required: true, regex: /https?:\/\/.+/ }"
          :customMessages="{regex: $t('igsn.validation.url')}">
        <InputGroupText
            v-model="doc.landingPage"
            :label="$t('igsn.label.landingPage')"
            :errors="v.errors"
            help="landingPage"
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

      <div class="flex flex-row">
        <div :class="[doc.visibility === 'false' ? 'w-1/2 mr-4' : 'w-full']">
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
        </div>
        <div :class="[doc.visibility === 'false' ? 'w-1/2' : '']">
          <InputGroupDatePicker
              v-model="doc.embargoEnd"
              v-show="doc.visibility === 'false'"
              label="Embargo Date"
              help="embargoDate"
          ></InputGroupDatePicker>
        </div>
      </div>

      <ValidationProvider name="resourceTitle" v-slot="v" rules="required" immediate
                          :customMessages="{required: $t('igsn.validation.resourceTitle')}">
        <InputGroupText
            v-model="doc.resourceTitle"
            label="Sample or Item Title"
            placeholder="Zircons from fraser range amphibolite on expoxy SHRIMP mount sample number 175423"
            :errors="v.errors"
            help="resourceTitle"
        ></InputGroupText>
      </ValidationProvider>

      <div class="bg-gray-200 p-5 mb-4">
        <div class="mb-4" v-for="(resourceType, index) in doc.resourceTypes" :key="index">
          <ValidationProvider name="resourceType" rules="required" immediate v-slot="v"
                              :customMessages="{required: $t('igsn.validation.resourceType')}">
            <InputGroupVocabSelect
                v-model="doc.resourceTypes[index]"
                :vocab="vocab.resourceTypes"
                :errors="v.errors"
                :removable="index > 0"
                @remove="doc.resourceTypes.splice(index, 1)"
                help="resourceType"
                label="Sample or Item Type"
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
        <div class="mb-4" v-for="(materialType, index) in doc.materialTypes" :key="index">
          <ValidationProvider name="materialType" rules="required" immediate v-slot="v"
                              :customMessages="{required: $t('igsn.validation.materialType')}">
            <InputGroupVocabSelect
                v-model="doc.materialTypes[index]"
                :vocab="vocab.materialTypes"
                :errors="v.errors"
                :removable="index > 0"
                @remove="doc.materialTypes.splice(index, 1)"
                label="Material Type"
                help="materialType"
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
import InputGroup from "@/components/forms/InputGroup";
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import InputGroupDatePicker from "@/components/forms/InputGroupDatePicker";
import {extend, ValidationObserver, ValidationProvider} from "vee-validate"

export default {
  name: "ARDCv1PrimaryInfo",
  components: {
    InputGroup,
    InputGroupText,
    ValidationProvider,
    ValidationObserver,
    InputGroupVocabSelect,
    InputGroupDatePicker
  },
  props: ['doc', 'vocab', 'mode'],
  data() {
    return {
      igsn: {},
      ownerValues: [{value: 'private', label: 'Private'}],
      owner: 'private',
      ownerID: null,
      ownerType: 'User'
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
  },
  methods: {
    // the resource is now not under embargo due to
    visibilityUpdated() {
      if (this.doc.visibility !== "false") {
        delete this.doc.embargoEnd;
      }
    },

    obtainIGSN() {

      // obtain allocationID
      // if the ownerType is DataCenter,
      // the AllocationID is the ID of the first Allocation that has the DataCenter.id equals to the associated OwnerID
      let allocationID = null
      if (this.doc.ownerType === 'DataCenter') {
        // find allocationID based on ownerID being the dataCenterID
        let allocation = this.user.allocations.find(alloc => {
          return alloc.dataCenters.filter(dataCenter => {
            return dataCenter.id === this.ownerID
          }).length > 0
        })
        if (allocation !== undefined) {
          allocationID = allocation.id
        }
      }

      this.$registryService.generateIGSNIdentifier(allocationID).then((data) => {
        //this.doc.resourceIdentifier = data.igsn
        this.igsn = data
      })
    }

  },
  mounted() {

    if (this.mode === 'edit') {
      return;
    }

    this.obtainIGSN()

    // populate ownerValues with user data centers
    this.user.dataCenters.forEach(dataCenter => {
      this.ownerValues.push({
        value: dataCenter.id,
        label: dataCenter.name
      })
    })
  },
  watch: {

    igsn: {
      deep: true,
      handler() {
        if (this.mode === 'edit') {
          return;
        }


        this.doc.resourceIdentifier = `${this.igsn.prefix}/${this.igsn.namespace}${this.igsn.value}`
        this.doc.landingPage = `https://test.identifiers.ardc.edu.au/igsn-portal/view/${this.doc.resourceIdentifier}`
      }
    },

    owner(newVal) {

      if (this.mode === 'edit') {
        return;
      }

      if (newVal === 'private') {
        this.doc.ownerID = this.user.id;
        this.doc.ownerType = 'User'
        return;
      }

      // otherwise it's dataCenter
      this.doc.ownerType = 'DataCenter'
      this.doc.ownerID = newVal

      this.obtainIGSN()
    },
  }
}
</script>

<style scoped>

</style>