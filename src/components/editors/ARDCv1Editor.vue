<template>
  <div class="my-4">
    <ValidationObserver v-slot="{ handleSubmit, valid }" ref="form">
      <form class="pb-8" @submit.prevent="handleSubmit">
        <div class="flex flex-col">

          <!-- Owner-->
          <div class="flex">
            <InputGroup label="Owner">
              <div class="flex">
                <select
                    name
                    v-model="owner"
                >
                  <option v-for="item in ownerValues" :key="item.value" :value="item.value">{{ item.label }}</option>
                </select>
              </div>
            </InputGroup>
          </div>

          <!-- Primary Info -->
          <div class="flex flex-row">
            <div class="w-1/2 pr-8">
              <h1 class="text-2xl mb-3 font-sans">Primary Information</h1>
              <ARDCv1PrimaryInfo :doc="doc" :vocab="vocab"></ARDCv1PrimaryInfo>
            </div>
            <div class="w-1/2">
              <h1 class="text-2xl mb-3 font-sans">
                <HelpIcon help="curationDetails"></HelpIcon>
                Curation Details
              </h1>
              <CurationDetails :doc="doc" :vocab="vocab"></CurationDetails>
            </div>
          </div>

          <!-- Tabs -->
          <div class="bg-white mb-8">
            <nav class="flex flex-row">
              <a
                  :class="[tab === 'location' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tabTo('location')"
              >{{ $t('igsn.tab.location') }}</a>
              <a
                  :class="[tab === 'related_resource' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tabTo('related_resource')"
              >{{ $t('igsn.tab.relatedResources') }}</a>
              <a
                  :class="[tab === 'contributors' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tabTo('contributors')"
              >{{ $t('igsn.tab.contributors') }}</a>
              <a
                  :class="[tab === 'other_information' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tabTo('other_information')"
              >{{ $t('igsn.tab.otherInformation') }}</a>
              <a
                  :class="[tab === 'preview_xml' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tabTo('preview_xml')"
              >{{ $t('igsn.tab.previewXML') }}</a>
            </nav>
          </div>

          <!-- Location -->
          <div class="tab-content" v-show="tab === 'location'" v-if="doc.location">
            <Location :doc="doc" :vocab="vocab"></Location>
          </div>

          <!-- Related Resource -->
          <div class="tab-content" v-show="tab==='related_resource'">
            <RelatedResource :doc="doc" :vocab="vocab"></RelatedResource>
          </div>

          <!-- Contributors -->
          <div class="tab-content" v-show="tab === 'contributors'">
            <Contributors :doc="doc" :vocab="vocab"></Contributors>
          </div>

          <!-- Other Information -->
          <div class="tab-content" v-show="tab === 'other_information'">
            <OtherInformation :doc="doc" :vocab="vocab"></OtherInformation>
          </div>

          <div class="tab-content" v-show="tab === 'preview_xml'">
            <pre>{{ result_xml }}</pre>
          </div>
        </div>
        <hr/>

        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert"
             v-if="successMsg">
          <span class="font-bold">SUCCESS!</span>
          <span class="block sm:inline">{{ successMsg }}</span>
        </div>

        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
             v-if="errorMsg">
          <span class="block sm:inline">{{ errorMsg }}</span>
        </div>

        <div class="mt-8 flex items-center space-x-2 justify-end">
          <div v-if="mode === 'edit'">
            <input type="radio" v-model="eventType" v-bind:value="'destroyed'"> Destroy
          </div>
          <div v-if="mode === 'edit'">
            <input type="radio" v-model="eventType" v-bind:value="'deprecated'"> Deprecate
          </div>
          <div v-if="mode === 'edit'">
            <input type="radio" v-model="eventType" v-bind:value="'updated'"> Update
          </div>
          <button @click.prevent="mint" type="submit" class="btn btn-blue" v-if="mode === 'create'">Register</button>
          <button @click.prevent="update" type="submit" class="btn btn-blue" v-if="mode === 'edit'">Update</button>
          <div>
            Valid: {{ valid }}
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {ValidationObserver, extend} from 'vee-validate';
import {required, regex} from 'vee-validate/dist/rules';
import ardcv1 from "@/services/schema/ardcv1";
import {EventBus} from "@/services/event-bus"
import ARDCv1PrimaryInfo from "@/components/editors/ARDCv1PrimaryInfo";
import CurationDetails from "@/components/editors/CurationDetails";
import Location from "@/components/editors/Location";
import RelatedResource from "@/components/editors/RelatedResource";
import Contributors from "@/components/editors/Contributors";
import OtherInformation from "@/components/editors/OtherInformation";
import HelpIcon from "@/components/forms/HelpIcon";
import InputGroup from "@/components/forms/InputGroup";

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('regex', {
  ...regex,
  message: 'This failed validation'
});

export default {
  name: "ARDCv1Editor",
  components: {
    InputGroup,
    HelpIcon,
    OtherInformation,
    Contributors,
    RelatedResource,
    Location,
    CurationDetails,
    ARDCv1PrimaryInfo,
    ValidationObserver
  },
  props: {
    xml: {
      type: String,
      required: true
    },
    mode: {
      type: String, required: false, default: "create"
    }
  },
  data() {
    return {
      tab: "location",
      doc: {},
      eventType: 'updated',
      successMsg: null,
      errorMsg: null,
      isMounted: false,
      errors: [],
      igsn: {},
      ownerValues: [{value: 'private', label: 'Private'}],
      owner: 'private',
      ownerID: null,
      ownerType: 'User'
    };
  },

  computed: {
    vocab() {
      return ardcv1.vocab();
    },
    user() {
      return this.$store.getters["auth/user"];
    },
    result_xml() {
      // dom -> json -> xml
      let json = ardcv1.dom2json(this.doc, this.eventType);
      return ardcv1.json2xml(json);
    }
  },
  methods: {

    tabTo(tab) {
      this.tab = tab
      EventBus.$emit('tab', this.tab);
      this.triggerChangeEvent()
    },

    // convert xml -> json -> dom doc for form functionality
    initDoc() {
      let json = ardcv1.xml2json(this.xml)
      this.doc = ardcv1.json2dom(json)
    },

    mint() {

      // trigger computed property
      this.triggerChangeEvent()

      this.$refs.form.validateWithInfo().then((result) => {
        console.log('validation', result)
        if (!result.isValid) {
          return;
        }

        this.errorMsg = null;
        let that = this
        this.$registryService.mint(this.result_xml).then(data => {
          that.successMsg = data.response.data.message
        }).catch(error => {
          that.errorMsg = error.response.data.message
          that.successMsg = null
        })
      })
    },

    update() {
      this.errorMsg = null
      this.successMsg = null
      let that = this

      // trigger computed property
      this.triggerChangeEvent()

      this.$registryService.update(this.result_xml).then(data => {
        // todo update successMsg to the request.message
        that.successMsg = data.message ? data.message : "Update successful"
      }).catch(error => {
        that.errorMsg = error.response?.data?.message
      })
    },

    // a hack to recompute computed property that relies on eventType
    // ie. result_xml
    triggerChangeEvent() {
      console.log('trigger')
      let exactEventType = this.eventType
      this.eventType = 'changed'
      this.eventType = exactEventType
    },

    obtainIGSN() {

      // obtain allocationID
      // if the ownerType is DataCenter,
      // the AllocationID is the ID of the first Allocation that has the DataCenter.id equals to the associated OwnerID
      let allocationID = null
      if (this.ownerType === 'DataCenter') {
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
        this.doc.resourceIdentifier = data.igsn
        this.doc.landingPage = this.doc.landingPage ? this.doc.landingPage : "https://test.identifiers.ardc.edu.au/igsn-portal/view/" + this.doc.resourceIdentifier
      })
    }

  },
  mounted() {
    this.initDoc()

    // generate IGSN value if mode is create
    if (this.mode === "create") {
      this.eventType = 'registered';


      // default ownerID to currentUserID and ownerType to User
      this.ownerID = this.user.id;
      this.ownerType = 'User'

      this.obtainIGSN()

      // populate ownerValues with user data centers
      this.user.dataCenters.forEach(dataCenter => {
        this.ownerValues.push({
          value: dataCenter.id,
          label: dataCenter.name
        })
      })

    }

  },
  watch: {

    owner(newVal) {
      if (newVal === 'private') {
        this.ownerID = this.user.id;
        this.ownerType = 'User'
        return;
      }

      // otherwise it's dataCenter
      this.ownerType = 'DataCenter'
      this.ownerID = newVal

      this.obtainIGSN()
    },

    // if xml from the parent change (load new XML into form)
    xml() {
      this.initDoc();
    },
  }
};
</script>
