<template>
  <div class="my-4">
    <ValidationObserver v-slot="{ handleSubmit, valid }" ref="form">
      <form class="pb-8">
        <div class="flex flex-row">

          <!-- Tabs -->
          <div class="bg-white mb-8">
            <nav class="flex flex-col">
              <a
                  :class="[tab === 'primary' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tab='primary'"
              >{{ $t('igsn.tab.primary') }}</a>
              <a
                  :class="[tab === 'curation_details' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tab='curation_details'"
              >{{ $t('igsn.tab.curationDetails') }}</a>
              <a
                  :class="[tab === 'location' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tabTo('location')"
              >{{ $t('igsn.tab.location') }}</a>
              <a
                  :class="[tab === 'related_resource' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tab='related_resource'"
              >{{ $t('igsn.tab.relatedResources') }}</a>
              <a
                  :class="[tab === 'contributors' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tab='contributors'"
              >{{ $t('igsn.tab.contributors') }}</a>
              <a
                  :class="[tab === 'other_information' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tab='other_information'"
              >{{ $t('igsn.tab.otherInformation') }}</a>
              <a
                  :class="[tab === 'preview_xml' ? 'tab tab-active' : 'tab']"
                  @click.prevent="tab='preview_xml'"
              >{{ $t('igsn.tab.previewXML') }}</a>
            </nav>
          </div>

          <!-- Primary Info -->
          <div class="tab-content" v-show="tab === 'primary'">
            <ValidationObserver ref="primary">
              <InputGroupText
                  v-model="doc.resourceIdentifier"
                  :label="$t('igsn.label.resourceIdentifier')"
                  :disabled="true"
              ></InputGroupText>

              <ValidationProvider name="landingPage" rules="required" v-slot="v">
              <InputGroupText
                  v-model="doc.landingPage"
                  :label="$t('igsn.label.landingPage')"
                  :errors="v.errors"
              ></InputGroupText>
              </ValidationProvider>

              <ValidationProvider name="registeredObjectType" rules="required" v-slot="v">
                <InputGroupVocabSelect
                    label="Registered Object Type"
                    v-model="doc.registeredObjectType"
                    :vocab="vocab.registeredObjectType"
                    :errors="v.errors"
                    help="registeredObjectType"
                ></InputGroupVocabSelect>
              </ValidationProvider>

              <ValidationProvider name="visibility" rules="required" v-slot="v">
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

          <!-- Curation Details -->
          <div class="tab-content" v-show="tab === 'curation_details'">
            <fieldset
                v-for="(curation, index) in doc.curationDetails"
                :key="index"
                class="mb-12 bg-gray-200 p-5 shadow-lg"
            >

              <ValidationProvider name="curatorName" rules="required" v-slot="v" immediate>
                <InputGroupText
                    v-model="curation.curatorName"
                    label="Curator"
                    placeholder="Fred Bloggs"
                    :errors="v.errors"
                ></InputGroupText>
              </ValidationProvider>

              <div class="my-4 border-b-2 border-t-2 py-5">
                <label>Curator Identifier</label>
                <div class="flex items-start">
                  <ValidationProvider name="curatorIdentifierType" rules="required" v-slot="v" immediate>
                  <InputGroupVocabSelect
                      class="mr-4 w-64"
                      v-model="curation.curatorIdentifierType"
                      :vocab="vocab.identifierTypes"
                      :required="true"
                      :errors="v.errors"
                  ></InputGroupVocabSelect>
                  </ValidationProvider>
                  <InputGroupText
                      v-model="curation.curatorIdentifier"
                      class="flex-1"
                      :required="true"
                  ></InputGroupText>
                </div>
              </div>

              <InputGroupDatePicker
                  v-model="curation.curationDate"
                  label="Curation Date"
              ></InputGroupDatePicker>

              <InputGroupText v-model="curation.curationLocation" label="Curation Location"></InputGroupText>

              <ValidationProvider name="curatingInstitution" rules="required" v-slot="v" immediate>
                <InputGroupText
                    v-model="curation.curatingInstitution"
                    label="Curating Institution"
                    :errors="v.errors"></InputGroupText>
              </ValidationProvider>

              <InputGroupText v-model="curation.institutionURI" label="Curation Institution URI"></InputGroupText>

              <button
                  class="btn btn-red"
                  v-if="index > 0"
                  @click.prevent="doc.curationDetails.splice(index, 1)"
              >Remove Curation
              </button>
            </fieldset>

            <button
                class="btn btn-blue"
                @click.prevent="doc.curationDetails.push({})"
            >Add New Curation
            </button>
          </div>

          <!-- Location -->
          <div class="tab-content" v-show="tab === 'location'" v-if="doc.location">

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

          <!-- Related Resource -->
          <div class="tab-content" v-show="tab==='related_resource'">
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

          <!-- Contributors -->
          <div class="tab-content" v-show="tab === 'contributors'">
            <fieldset
                v-for="(contributor, index) in doc.contributors"
                :key="index"
                class="mb-8 bg-gray-200 p-5 shadow-lg"
            >

              <ValidationProvider name="contributorName" rules="required" v-slot="v" immediate>
              <InputGroupText
                  v-model="contributor.contributorName"
                  label="Contributor Name"
                  placeholder="Fredd Bloggs"
                  :errors="v.errors"
              ></InputGroupText>
              </ValidationProvider>

              <InputGroupVocabSelect
                  label="Contributor Type"
                  v-model="contributor.contributorType"
                  :vocab="vocab.contributorTypes"
              ></InputGroupVocabSelect>

              <InputGroupText
                  v-model="contributor.contributorIdentifier"
                  label="Contributor Identifier"
                  placeholder="Contributor Identifier, eg. ORCID"
              ></InputGroupText>

              <InputGroupVocabSelect
                  label="Contributor Identifier Type"
                  v-model="contributor.contributorIdentifierType"
                  :vocab="vocab.identifierTypes"
              ></InputGroupVocabSelect>

              <a
                  class="btn btn-red"
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

          <!-- Other Information -->
          <div class="tab-content" v-show="tab === 'other_information'">
            <div class="bg-gray-200 p-5 mb-4">
              <div v-for="(identifier, index) in doc.alternateIdentifiers" :key="index">
                <div class="flex">
                  <ValidationProvider name="alternateIdentifierType" rules="required" v-slot="v">
                    <InputGroupVocabSelect
                        class="mr-4 w-32"
                        label="Type"
                        v-model="doc.alternateIdentifiers[index].type"
                        :vocab="vocab.identifierTypes"
                        :required="true"
                        :errors="v.errors"
                    ></InputGroupVocabSelect>
                  </ValidationProvider>
                  <InputGroupText
                      class="flex-1"
                      v-model="doc.alternateIdentifiers[index].value"
                      label="Alternate Identifier"
                      :removable="true"
                      @remove="doc.alternateIdentifiers.splice(index, 1)"
                  ></InputGroupText>
                </div>

              </div>
              <button
                  class="btn btn-blue text-xs"
                  @click.prevent="doc.alternateIdentifiers.push('')"
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
                ></InputGroupText>
                <InputGroupText
                    class="flex-1 mr-2"
                    v-model="classification.classificationURI"
                    label="Classification URI"
                ></InputGroupText>
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

            <InputGroupText v-model="doc.purpose" label="Purpose"></InputGroupText>

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
                ></InputGroupText>
                <InputGroupText
                    class="flex-1 mr-2"
                    v-model="sampledFeature.sampledFeatureURI"
                    label="Sampled Feature URI"
                ></InputGroupText>
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
              <InputGroupText class="flex-1 mr-4" v-model="doc.method" label="Method"></InputGroupText>
              <InputGroupText class="flex-1" v-model="doc.methodURI" label="Method URI"></InputGroupText>
            </div>

            <InputGroupText v-model="doc.campaign" label="Project" placeholder="Campaign"></InputGroupText>
            <InputGroupText v-model="doc.comments" label="Comments"></InputGroupText>
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
          <button @click.prevent="handleSubmit(update)" type="submit" class="btn btn-blue" v-if="mode === 'edit'">Update</button>
          <div>
            <i v-if="valid" class="fa fa-check"></i>
            <i v-if="!valid" class="fa fa-times"></i>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import InputGroupDatePicker from "@/components/forms/InputGroupDatePicker";
import LocationPicker from "@/components/forms/LocationPicker"
import ardcv1 from "@/services/schema/ardcv1";
import {EventBus} from "@/services/event-bus"

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: "ARDCv1Editor",
  components: {
    InputGroupText,
    InputGroupVocabSelect,
    InputGroupDatePicker,
    LocationPicker,
    ValidationProvider,
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
      tab: "primary",
      doc: {},
      eventType: 'updated',
      successMsg: null,
      errorMsg: null,
      isMounted: false,
      errors: []
    };
  },

  computed: {
    vocab() {
      return ardcv1.vocab();
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
    },

    // the resource is now not under embargo due to
    visibilityUpdated() {
      if (this.doc.visibility !== "false") {
        delete this.doc.embargoEnd;
      }
    },

    // convert xml -> json -> dom doc for form functionality
    initDoc() {
      let json = ardcv1.xml2json(this.xml)
      this.doc = ardcv1.json2dom(json)
    },

    mint() {
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
      this.$registryService.update(this.result_xml).then(data => {
        // todo update successMsg to the request.message
        that.successMsg = data.message ? data.message : "Update successful"
      }).catch(error => {
        that.errorMsg = error.response?.data?.message
      })
    }

  },
  mounted() {
    this.initDoc()

    // generate IGSN value if mode is create
    if (this.mode === "create") {
      this.eventType = 'registered';
      // todo generate IGSN Value
      this.$registryService.generateIGSNIdentifier().then((data) => {
        this.doc.resourceIdentifier = data
        this.doc.landingPage = this.doc.landingPage ? this.doc.landingPage : "https://test.identifiers.ardc.edu.au/igsn-portal/view/" + this.doc.resourceIdentifier
      })
    }

  },
  watch: {
    // if xml from the parent change (load new XML into form)
    xml() {
      this.initDoc();
    }
  }
};
</script>
