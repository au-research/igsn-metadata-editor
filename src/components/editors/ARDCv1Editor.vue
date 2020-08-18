<template>
  <div class="my-4">
    <form class="pb-8">
      <div class="flex flex-row">
        <!-- Tabs -->
        <div class="bg-white mb-8">
          <nav class="flex flex-col">
            <a
              :class="[tab==='primary' ? 'tab tab-active' : 'tab']"
              @click.prevent="tab='primary'"
            >{{ $t('igsn.tab.primary') }}</a>
            <a
              :class="[tab==='curation_details' ? 'tab tab-active' : 'tab']"
              @click.prevent="tab='curation_details'"
            >Curation Details</a>
            <a
              :class="[tab=='location' ? 'tab tab-active' : 'tab']"
              @click.prevent="tab='location'"
            >Location</a>
            <a
              :class="[tab=='related_resource' ? 'tab tab-active' : 'tab']"
              @click.prevent="tab='related_resource'"
            >Related Resource</a>
            <a
              :class="[tab=='contributors' ? 'tab tab-active' : 'tab']"
              @click.prevent="tab='contributors'"
            >Contributors</a>
            <a
              :class="[tab=='other_information' ? 'tab tab-active' : 'tab']"
              @click.prevent="tab='other_information'"
            >Other Information</a>
            <a
              :class="[tab=='preview_xml' ? 'tab tab-active' : 'tab']"
              @click.prevent="tab='preview_xml'"
            >Preview XML</a>
          </nav>
        </div>

        <!-- Primary Info -->
        <div class="tab-content" v-show="tab=='primary'">
          <InputGroupText
            v-model="doc.resourceIdentifier"
            label="Resource Identifier"
            v-show="doc.resourceIdentifier"
            disabled="true"
          ></InputGroupText>

          <div class="flex">
            <InputGroupVocabSelect
              class="mr-4"
              label="Log Event Type"
              v-model="doc.logDateEventType"
              help="logDate"
              :vocab="vocab.eventType"
              :required="true"
            ></InputGroupVocabSelect>
            <InputGroupDatePicker
              v-if="doc.logDate != undefined"
              class="flex-1"
              v-model="doc.logDate"
              label="Log Date"
            ></InputGroupDatePicker>
          </div>

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
            v-show="doc.visibility == 'false'"
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
                v-if="vocabulary == 'csiro-igsn-codelist'"
                :vocab="vocab.resourceTypes"
                :required="true"
                validation-text="Select a sample or item type"
                :removable="true"
                @remove="doc.resourceTypes.splice(index, 1)"
              ></InputGroupVocabSelect>

              <InputGroupVocabWidgetSelect
                v-model="doc.resourceTypes[index]"
                v-if="vocabulary == 'ga-igsn-codelist'"
              ></InputGroupVocabWidgetSelect>
            </div>
            <button
              class="btn text-xs btn-blue"
              href
              @click.prevent="doc.resourceTypes.push('')"
            >Add a Sample or Item Type</button>
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
            <button
              class="btn text-xs btn-blue"
              href
              @click.prevent="doc.materialTypes.push('')"
            >Add a Material Type</button>
          </div>
        </div>

        <!-- Curation Details -->
        <div class="tab-content" v-show="tab=='curation_details'">
          <fieldset
            v-for="(curation, index) in doc.curationDetails"
            :key="index"
            class="mb-12 bg-gray-200 p-5 shadow-lg"
          >
            <InputGroupText
              v-model="curation.curator"
              label="Curator"
              placeholder="Fred Bloggs"
              :required="true"
            ></InputGroupText>

            <InputGroupDatePicker
              v-if="curation.curationDate != undefined"
              v-model="curation.curationDate"
              label="Curation Date"
            ></InputGroupDatePicker>

            <InputGroupText v-model="curation.curationLocation" label="Curation Location"></InputGroupText>
            <InputGroupText v-model="curation.curatingInstitution" label="Curating Institution"></InputGroupText>
            <InputGroupText v-model="curation.institutionURI" label="Curation Institution URI"></InputGroupText>

            <button
              class="btn btn-red"
              @click.prevent="doc.curationDetails.splice(index, 1)"
            >Remove Curation</button>
          </fieldset>

          <button
            class="btn btn-blue"
            @click.prevent="doc.curationDetails.push({curationDate: ''})"
          >Add New Curation</button>
        </div>

        <!-- Location -->
        <div class="tab-content" v-show="tab=='location'" v-if="doc.location">
          
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
        <div class="tab-content" v-show="tab=='related_resource'">
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
        <div class="tab-content" v-show="tab=='contributors'">
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
        <div class="tab-content" v-show="tab=='other_information'">
          <div class="bg-gray-200 p-5 mb-4">
            <div v-for="(identifier, index) in doc.alternateIdentifiers" :key="index">
              <InputGroupText
                v-model="doc.alternateIdentifiers[index]"
                label="Alternate Identifier"
                :removable="true"
                @remove="doc.alternateIdentifiers.splice(index, 1)"
              ></InputGroupText>
            </div>
            <button
              class="btn btn-blue text-xs"
              @click.prevent="doc.alternateIdentifiers.push('')"
            >Add Alternate Identifier</button>
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
              >Remove</button>
            </div>
            <button
              class="btn btn-blue text-xs"
              @click.prevent="doc.classifications.push({})"
            >Add Classification</button>
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
              >Remove</button>
            </div>
            <button
              class="btn btn-blue text-xs"
              @click.prevent="doc.sampledFeatures.push({})"
            >Add Sampled Feature</button>
          </div>

          <div class="flex">
            <InputGroupText class="flex-1 mr-4" v-model="doc.method" label="Method"></InputGroupText>
            <InputGroupText class="flex-1" v-model="doc.methodURI" label="Method URI"></InputGroupText>
          </div>

          <InputGroupText v-model="doc.campaign" label="Project" placeholder="Campaign"></InputGroupText>
          <InputGroupText v-model="doc.comments" label="Comments"></InputGroupText>
        </div>

        <div class="tab-content" v-show="tab=='preview_xml'">
          <pre>{{ result_xml }}</pre>
        </div>
      </div>
      <hr />
      <div class="mt-8">
        <button type="submit" class="btn btn-blue">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import vocabs from "@/services/vocabs";
import InputGroupText from "@/components/forms/InputGroupText";
import InputGroupVocabSelect from "@/components/forms/InputGroupVocabSelect";
import InputGroupVocabWidgetSelect from "@/components/forms/InputGroupVocabWidgetSelect";
import InputGroupDatePicker from "@/components/forms/InputGroupDatePicker";
import util from "@/services/util.js";

export default {
  name: "CSIROv3Editor",
  components: {
    InputGroupText,
    InputGroupVocabSelect,
    InputGroupVocabWidgetSelect,
    InputGroupDatePicker
  },
  props: {
    xml: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: "primary",
      doc: {}
    };
  },
  computed: {
    vocab() {
      return vocabs.getVocabFor("igsn");
    },
    result_xml() {
      // dom doc -> jsondoc -> xml
      let jsondoc = util.getJSONDOCFromDOMDoc(this.doc);
      return util.convertJSONDocToXML(jsondoc);
    },
    source_json_doc() {
      return util.convertXMLTOJSONDoc(this.xml);
    }
  },
  methods: {
    visibilityUpdated() {
      // the resource is now not under embargo due to
      if (this.doc.visibility != "false") {
        delete this.doc.embargoEnd;
      }
    },
    initDoc() {
      // convert xml -> jsondoc -> dom doc for form functionality
      let jsondoc = util.convertXMLTOJSONDoc(this.xml);
      this.jsondoctmp = jsondoc;
      let doc = util.convertJSONDocToDOMDoc(jsondoc);
      this.doc = doc;
    }
  },
  mounted() {
    this.initDoc();
  },
  watch: {
    xml() {
      // if xml from the parent change (load new XML into form)
      this.initDoc();
    }
  }
};
</script>
