<template>
  <div class="my-4">
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

          <InputGroupText
              v-model="doc.resourceIdentifier"
              :label="$t('igsn.label.resourceIdentifier')"
              :disabled="true"
          ></InputGroupText>

          <InputGroupText
              v-model="doc.landingPage"
              :label="$t('igsn.label.landingPage')"
          ></InputGroupText>

          <InputGroupVocabSelect
              label="Registered Object Type"
              v-model="doc.registeredObjectType"
              :vocab="vocab.registeredObjectType"
              :required="true"
              help="registeredObjectType"
          ></InputGroupVocabSelect>

          <InputGroupVocabSelect
              label="Metadata Visibility"
              v-model="doc.visibility"
              :vocab="vocab.visibility"
              v-on:change="visibilityUpdated"
              help="visibility"
              :required="true"
          ></InputGroupVocabSelect>

          <InputGroupText
              v-model="doc.embargoEnd"
              v-show="doc.visibility === 'false'"
              label="Embargo Date"
          ></InputGroupText>

          <InputGroupText
              v-model="doc.resourceTitle"
              label="Sample or Item Title"
              placeholder="Zircons from fraser range amphibolite on expoxy SHRIMP mount sample number 175423"
              :required="true"
              help="resourceTitle"
              validation-text="Provide a title for the sample or item"
          ></InputGroupText>

          <div class="bg-gray-200 p-5 mb-4">
            <label for>Sample or Item Type</label>
            <div class="mb-4" v-for="(resourceType, index) in doc.resourceTypes" :key="index">
              <InputGroupVocabSelect
                  v-model="doc.resourceTypes[index]"
                  :vocab="vocab.resourceTypes"
                  :required="true"
                  validation-text="Select a sample or item type"
                  :removable="true"
                  @remove="doc.resourceTypes.splice(index, 1)"
              ></InputGroupVocabSelect>
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
            <div class="mb-4" v-for="(type, index) in doc.materialTypes" :key="index">
              <InputGroupVocabSelect
                  v-model="doc.materialTypes[index]"
                  :vocab="vocab.materialTypes"
                  :required="true"
                  :removable="true"
                  @remove="doc.materialTypes.splice(index, 1)"
              ></InputGroupVocabSelect>
            </div>
            <a
                class="btn text-xs btn-blue"
                href
                @click.prevent="doc.materialTypes.push('')"
            >Add a Material Type
            </a>
          </div>
        </div>

        <!-- Curation Details -->
        <div class="tab-content" v-show="tab === 'curation_details'">
          <fieldset
              v-for="(curation, index) in doc.curationDetails"
              :key="index"
              class="mb-12 bg-gray-200 p-5 shadow-lg"
          >
            <InputGroupText
                v-model="curation.curatorName"
                label="Curator"
                placeholder="Fred Bloggs"
                :required="true"
            ></InputGroupText>

            <div class="my-4 border-b-2 border-t-2 py-5">
              <label>Curator Identifiers</label>
              <div class="flex items-start"
                   v-for="(identifier, index) in curation.curatorIdentifiers" :key="index">
                <InputGroupVocabSelect
                    class="mr-4 w-32"
                    v-model="curation.curatorIdentifiers[index].type"
                    :vocab="vocab.identifierTypes"
                    :required="true"
                ></InputGroupVocabSelect>
                <InputGroupText
                    v-model="identifier.value"
                    class="w-64"
                    :required="true"
                ></InputGroupText>
                <a
                    href=""
                    class="btn btn-red ml-2 text-xs mt-3"
                    @click.prevent="curation.curatorIdentifiers.splice(index, 1)"
                ><i class="fas fa-trash-alt"></i>
                </a>
              </div>
              <a
                  href=""
                  class="btn text-xs btn-blue"
                  @click.prevent="curation.curatorIdentifiers.push({type: '', value: ''})"
              ><i class="fas fa-plus-square"></i> Identifier
              </a>
            </div>


            <InputGroupDatePicker
                v-if="curation.curationDate !== undefined"
                v-model="curation.curationDate"
                label="Curation Date"
            ></InputGroupDatePicker>

            <InputGroupText v-model="curation.curationLocation" label="Curation Location"></InputGroupText>
            <InputGroupText v-model="curation.curatingInstitution" label="Curating Institution"></InputGroupText>
            <InputGroupText v-model="curation.institutionURI" label="Curation Institution URI"></InputGroupText>

            <button
                class="btn btn-red"
                @click.prevent="doc.curationDetails.splice(index, 1)"
            >Remove Curation
            </button>
          </fieldset>

          <button
              class="btn btn-blue"
              @click.prevent="doc.curationDetails.push({curationDate: ''})"
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

            <InputGroupVocabSelect
                class="flex-1 mr-4"
                label="Geometry SRID"
                v-model="doc.location.geometrySRID"
                :vocab="vocab.ePSG"
            ></InputGroupVocabSelect>

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
              v-for="(resource, index) in doc.relatedResources"
              :key="index"
              class="mb-12 bg-gray-200 p-5 shadow-lg"
          >
            <InputGroupText
                v-model="resource.resource"
                label="Related Resource Identifier"
                placeholder="Grant Search"
            ></InputGroupText>

            <InputGroupVocabSelect
                label="Related Identifier Type"
                v-model="resource.relatedResourceIdentifierType"
                :vocab="vocab.identifierTypes"
            ></InputGroupVocabSelect>

            <InputGroupVocabSelect
                label="Relation Type"
                v-model="resource.relationType"
                :vocab="vocab.relationTypes"
            ></InputGroupVocabSelect>

            <a
                class="btn btn-red"
                href
                @click.prevent="doc.related_resource.splice(index, 1)"
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
            <InputGroupText
                v-model="contributor.contributorName"
                label="Contributor Name"
                placeholder="Fredd Bloggs"
            ></InputGroupText>

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
                <InputGroupVocabSelect
                    class="mr-4 w-32"
                    label="Type"
                    v-model="doc.alternateIdentifiers[index].type"
                    :vocab="vocab.identifierTypes"
                    :required="true"
                ></InputGroupVocabSelect>
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
        <button type="submit" class="btn btn-blue" v-if="mode === 'create'">Register</button>
        <button type="submit" class="btn btn-blue" v-if="mode === 'edit'">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import InputGroupDatePicker from "@/components/forms/InputGroupDatePicker";
import LocationPicker from "@/components/forms/LocationPicker"
import ardcv1 from "@/services/schema/ardcv1";
import {EventBus} from "@/services/event-bus"

export default {
  name: "ARDCv1Editor",
  components: {
    InputGroupText,
    InputGroupVocabSelect,
    InputGroupDatePicker,
    LocationPicker
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
      eventType: 'updated'
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
    }
  },
  mounted() {
    this.initDoc();

    // generate IGSN value if mode is create
    if (this.mode === "create") {
      this.eventType = 'registered';
      // todo generate IGSN Value
      this.$registryService.generateIGSNIdentifier().then((data) => {
        this.doc.resourceIdentifier = "10273/XXAB001AG"
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
