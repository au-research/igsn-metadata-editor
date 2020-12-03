<template>
  <div class="my-4">

    <ValidationObserver v-slot="{ handleSubmit, valid, errors }" ref="form">
      <span class="px-8" v-if="!doc || !user.allocations">
        <i class="fas fa-spinner fa-spin"></i> Loading, please wait...
      </span>
      <form class="pb-8" @submit.prevent="handleSubmit" v-if="doc">
        <div class="flex flex-col">

          <!-- Primary Info -->
          <div class="flex flex-row">
            <div class="w-1/2 pr-8">
              <h1 class="text-2xl mb-3 font-sans">Primary Information</h1>
              <ARDCv1PrimaryInfo v-if="user.allocations" :doc="doc" :vocab="vocab" :mode="mode"></ARDCv1PrimaryInfo>
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
          <div class="bg-white mb-8 mt-6">
            <nav class="flex flex-row">
              <a
                  :class="[tab === 'location' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tabTo('location')"
              >{{ $t('igsn.tab.location') }}
                <HelpIcon help="location"></HelpIcon>
              </a>
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
          <button @click.prevent="mint" type="submit" class="btn btn-blue" v-if="mode === 'create' && !loading">Register</button>
          <button @click.prevent="update" type="submit" class="btn btn-blue" v-if="mode === 'edit' && !loading">Update</button>
          <a href class="btn btn-disabled" v-if="loading" @click.prevent=""><i class="fas fa-spinner fa-spin"></i> Loading</a>
        </div>
      </form>

      <modal ref="validationModal">
        <template v-slot:header>
          <h1>Validation Error</h1>
        </template>

        <template v-slot:body>
          Please fix the following validation errors
          <ul class="list-disc" v-for="(e, key) in errors" v-bind:key="key">
            <li class="ml-4" v-if="e.length">{{ key }} : {{ e.join(', ') }}</li>
          </ul>
        </template>

        <template v-slot:footer>
          <div class="flex align-items-center justify-between">
            <a href class="btn btn-blue" @click.prevent="$refs.validationModal.closeModal()"><i class="fa fa-edit"></i>
              Continue editing</a>
          </div>
        </template>
      </modal>

      <modal ref="successModal" :closable="false">
        <template v-slot:header>
          <h1>Success</h1>
        </template>

        <template v-slot:body>
          <div v-if="mode === 'create'">
            <p>IGSN <strong>{{ doc.resourceIdentifier }}</strong> has been minted successfully!</p>
          </div>

          <div v-if="mode === 'edit'">
            <p>IGSN <strong>{{ doc.resourceIdentifier }}</strong> has been updated successfully!</p>
          </div>
        </template>

        <template v-slot:footer>
          <div class="flex align-items-center justify-between">
            <button class="btn btn-blue" @click="$refs.successModal.closeModal();$router.push('/')"><i
                class="fa fa-home"></i> Return to dashboard
            </button>
            <button class="btn btn-blue" @click="openInPortal"><i class="fa fa-globe"></i> View in IGSN Portal</button>
          </div>
        </template>
      </modal>

      <modal ref="errorModal">
        <template v-slot:header>
          <h1>Error</h1>
        </template>

        <template v-slot:body>
          {{ errorMsg }}
        </template>

        <template v-slot:footer>
          <div class="flex align-items-center justify-between">
            <a href class="btn btn-blue" @click.prevent="$refs.errorModal.closeModal()">
              <i class="fa fa-edit"></i> Continue editing</a>
          </div>
        </template>
      </modal>

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
import Modal from "@/components/forms/Modal"
import InputGroup from "@/components/forms/InputGroup";

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('regex', {
  ...regex,
  message: 'This failed validation'
});

extend('w3cdtf', value => {
  let pattern = /(^\d{4}$)|(^\d{4}-\d{2}$)|(^\d{4}-\d{2}-\d{2}$)|(^\d{4}-\d{2}-\d{2}T\d{2}(:\d{2}){1,2}[-+]\d{2}:\d{2}$)/g

  return new RegExp(pattern).test(value)
})

export default {
  name: "ARDCv1Editor",
  components: {
    HelpIcon,
    Modal,
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
      doc: null,
      eventType: 'updated',
      successMsg: null,
      errorMsg: null,
      isMounted: false,
      errors: [],
      loading: false
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
    },

    portalUrl() {
      return this.$registryService.getPortalUrl()
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
      if (this.xml.trim() === "") {
        return;
      }
      let json = ardcv1.xml2json(this.xml)
      this.doc = ardcv1.json2dom(json)
    },

    mint() {
      this.errorMsg = null
      this.successMsg = null

      // trigger computed property
      this.triggerChangeEvent()

      this.loading = true;

      this.$refs.form.validateWithInfo().then((result) => {
        if (!result.isValid) {
          this.$refs.validationModal.openModal()
          this.loading = false;
          return;
        }

        this.errorMsg = null;

        this.$registryService.mint(this.result_xml, this.doc.ownerType, this.doc.ownerID).then(data => {
          this.$refs.successModal.openModal()
          this.loading = false;

          this.successMsg = data.response?.data?.message
        }).catch(error => {
          this.errorMsg = error.response?.data?.message ? error.response?.data?.message: "An error has occurred";
          this.$refs.errorModal.openModal();
          this.loading = false;

          this.successMsg = null
        })

      })
    },

    update() {
      this.errorMsg = null
      this.successMsg = null

      // trigger computed property
      this.triggerChangeEvent()

      this.loading = true;

      // validate the form
      this.$refs.form.validateWithInfo().then((result) => {
        if (!result.isValid) {
          this.$refs.validationModal.openModal()
          this.loading = false;
          return;
        }

        this.$registryService.update(this.result_xml).then(data => {
          this.$refs.successModal.openModal()
          this.loading = false;

          // todo update successMsg to the request.message
          this.successMsg = data.message ? data.message : "Update successful"
        }).catch(error => {
          this.errorMsg = error.response?.data?.message ? error.response?.data?.message: "An error has occurred";
          this.$refs.errorModal.openModal();
          this.loading = false;
        })

      })


    },

    // a hack to recompute computed property that relies on eventType
    // ie. result_xml
    triggerChangeEvent() {
      let exactEventType = this.eventType
      this.eventType = 'changed'
      this.eventType = exactEventType
      this.$forceUpdate()
    },

    openInPortal() {
      window.open(this.portalUrl + 'view/' + this.doc.resourceIdentifier)
    }

  },
  mounted() {
    this.initDoc()

    // generate IGSN value if mode is create
    if (this.mode === "create") {
      this.eventType = 'registered';

      // empty xml
      let json = ardcv1.xml2json("")
      this.doc = ardcv1.json2dom(json)

      // default ownerID to currentUserID and ownerType to User
      this.doc.ownerID = this.user.id;
      this.doc.ownerType = 'User'
    }

  },
  watch: {

    // if xml from the parent change (load new XML into form)
    xml() {
      this.initDoc();
    },
  }
};
</script>
