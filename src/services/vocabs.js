export default {

    /**
     * Obtain and cache the vocab here
     * 
     * @param {*} vocab 
     */
    getVocabFor(vocab) {
        if (vocab === "igsn") {
            return {
                registeredObjectType: [
                    {
                        value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/PhysicalSample",
                        label: "Physical sample"
                    },
                    {
                        value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/SampleCollection",
                        label: "Sample collection"
                    },
                    {
                        value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/SamplingFeature",
                        label: "Sampling feature"
                    }
                ],
                visibility: [
                    {
                        value: "true",
                        label: "Publicly Visible"
                    },
                    {
                        value: "hidden",
                        label: "Private"
                    },
                    {
                        value: "false",
                        label: "Under Embargo"
                    }
                ],
                resourceTypes: [
                    { label: "Automated", value: "http://vocabulary.odm2.org/specimentype/automated" },
                    { label: "Core", value: "http://vocabulary.odm2.org/specimentype/core" },
                    { label: "Core half round", value: "http://vocabulary.odm2.org/specimentype/coreHalfRound" },
                    { label: "Core piece", value: "http://vocabulary.odm2.org/specimentype/corePiece" },
                    { label: "Core quarter round", value: "http://vocabulary.odm2.org/specimentype/coreQuarterRound" },
                    { label: "Core section", value: "http://vocabulary.odm2.org/specimentype/coreSection" },
                    { label: "Core section half", value: "http://vocabulary.odm2.org/specimentype/coreSectionHalf" },
                    { label: "Core sub-piece", value: "http://vocabulary.odm2.org/specimentype/coreSub-Piece" },
                    { label: "Core whole round", value: "http://vocabulary.odm2.org/specimentype/coreWholeRound" },
                    { label: "Cuttings", value: "http://vocabulary.odm2.org/specimentype/cuttings" },
                    { label: "Dredge", value: "http://vocabulary.odm2.org/specimentype/dredge" },
                    { label: "Foliage digestion", value: "http://vocabulary.odm2.org/specimentype/foliageDigestion" },
                    { label: "Foliage leaching", value: "http://vocabulary.odm2.org/specimentype/foliageLeachingFoliage" },
                    { label: "Forest floor digestion", value: "http://vocabulary.odm2.org/specimentype/forestFloorDigestion" },
                    { label: "Grab", value: "http://vocabulary.odm2.org/specimentype/grab" },
                    { label: "Individual sample", value: "http://vocabulary.odm2.org/specimentype/individualSample" },
                    { label: "Litter fall digestion", value: "http://vocabulary.odm2.org/specimentype/litterFallDigestion" },
                    { label: "Oriented core", value: "http://vocabulary.odm2.org/specimentype/orientedCore" },
                    { label: "Other", value: "http://vocabulary.odm2.org/specimentype/other" },
                    { label: "Petri dish (dry deposition)", value: "http://vocabulary.odm2.org/specimentype/petriDishDryDeposition" },
                    { label: "Precipitation bulk", value: "http://vocabulary.odm2.org/specimentype/precipitationBulk" },
                    { label: "Rock powder", value: "http://vocabulary.odm2.org/specimentype/rockPowder" },
                    { label: "Standard reference specimen", value: "http://vocabulary.odm2.org/specimentype/standardReferenceSpecimen" },
                    { label: "Terrestrial section", value: "http://vocabulary.odm2.org/specimentype/terrestrialSection" },
                    { label: "Thin section", value: "http://vocabulary.odm2.org/specimentype/thinSection" },
                    { label: "Inapplicable", value: "http://www.opengis.net/def/nil/OGC/0/inapplicable" },
                    { label: "Missing", value: "http://www.opengis.net/def/nil/OGC/0/missing" },
                    { label: "Template", value: "http://www.opengis.net/def/nil/OGC/0/template" },
                    { label: "Unknown", value: "http://www.opengis.net/def/nil/OGC/0/unknown" },
                    { label: "Withheld", value: "http://www.opengis.net/def/nil/OGC/0/withheld" },
                ],
                materialTypes: [
                    { label: "Air", value: "http://vocabulary.odm2.org/medium/air" },
                    { label: "Gas", value: "http://vocabulary.odm2.org/medium/gas" },
                    { label: "Habitat", value: "http://vocabulary.odm2.org/medium/habitat" },
                    { label: "Ice", value: "http://vocabulary.odm2.org/medium/ice" },
                    { label: "Liquid aqueous", value: "http://vocabulary.odm2.org/medium/liquidAqueous" },
                    { label: "Liquid organic", value: "http://vocabulary.odm2.org/medium/liquidOrganic" },
                    { label: "Mineral", value: "http://vocabulary.odm2.org/medium/mineral" },
                    { label: "Not applicable", value: "http://vocabulary.odm2.org/medium/notApplicable" },
                    { label: "Organism", value: "http://vocabulary.odm2.org/medium/organism" },
                    { label: "Other", value: "http://vocabulary.odm2.org/medium/other" },
                    { label: "Particulate", value: "http://vocabulary.odm2.org/medium/particulate" },
                    { label: "Regolith", value: "http://vocabulary.odm2.org/medium/regolith" },
                    { label: "Rock", value: "http://vocabulary.odm2.org/medium/rock" },
                    { label: "Sediment", value: "http://vocabulary.odm2.org/medium/sediment" },
                    { label: "Snow", value: "http://vocabulary.odm2.org/medium/snow" },
                    { label: "Soil", value: "http://vocabulary.odm2.org/medium/soil" },
                    { label: "Tissue", value: "http://vocabulary.odm2.org/medium/tissue" },
                    { label: "Inaplicable", value: "http://www.opengis.net/def/nil/OGC/0/inapplicable" },
                    { label: "Missing", value: "http://www.opengis.net/def/nil/OGC/0/missing" },
                    { label: "Template", value: "http://www.opengis.net/def/nil/OGC/0/template" },
                    { label: "Unknown", value: "http://www.opengis.net/def/nil/OGC/0/unknown" },
                    { label: "Withheld", value: "http://www.opengis.net/def/nil/OGC/0/withheld" },
                ],
                contributorTypes: [
                    { label: "Collaborator", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/collaborator" },
                    { label: "Contributor", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/contributor" },
                    { label: "Custodian", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/custodian" },
                    { label: "Funder", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/funder" },
                    { label: "Originator", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/originator" },
                    { label: "Owner", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/owner" },
                    { label: "Point of contact", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/pointOfContact" },
                    { label: "Principal investigator", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/principalInvestigator" },
                    { label: "Processor", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/processor" },
                    { label: "Rights holder", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/rightsHolder" },
                    { label: "Sponsor", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/sponsor" },
                    { label: "Stakeholder", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/stakeholder" },
                    { label: "User", value: "http://registry.it.csiro.au/def/isotc211/CI_RoleCode/user" },
                ],
                identifierTypes: [
                    { label: "ARK", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/ARK" },
                    { label: "arXiv", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/arXiv" },
                    { label: "bibcode", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/bibcode" },
                    { label: "DOI", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/DOI" },
                    { label: "EAN13", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/EAN13" },
                    { label: "EISSN", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/EISSN" },
                    { label: "Handle", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/Handle" },
                    { label: "IGSN", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IGSN" },
                    { label: "ISBN", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/ISBN" },
                    { label: "ISNI", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/ISNI" },
                    { label: "ISSN", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/ISSN" },
                    { label: "ISTC", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/ISTC" },
                    { label: "LISSN", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/LISSN" },
                    { label: "LSID", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/LSID" },
                    { label: "ORCID", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/ORCID" },
                    { label: "PMID", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/PMID" },
                    { label: "PURL", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/PURL" },
                    { label: "UPC", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/UPC" },
                    { label: "URL", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/URL" },
                    { label: "URN", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/URN" },
                    { label: "VIAF", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/VIAF" },
                ],

                relationTypes: [
                    { label: "Has digital representation", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/HasDigitalRepresentation" },
                    { label: "Has reference resource", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/HasReferenceResource" },
                    { label: "Has sampling feature", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/HasSamplingFeature" },
                    { label: "Is aggregate of", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsAggregateOf" },
                    { label: "Is derived from", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsDerivedFrom" },
                    { label: "Is digital representation of", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsDigitalRepresentationOf" },
                    { label: "Is documented by", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsDocumentedBy" },
                    { label: "Is identical to", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsIdenticalTo" },
                    { label: "Is member of", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsMemberOf" },
                    { label: "Is sampling feature of", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsSamplingFeatureOf" },
                    { label: "Is source of", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsSourceOf" },
                    { label: "Participates", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/Participates" },
                    { label: "Has association with", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/hasAssociationWith" },
                    { label: "Collected as part of", value: "http://pid.geoscience.gov.au/def/voc/igsn-codelists/collectedAsPartOf" },
                ],

                ePSG: [
                    { label: "EPSG:3112 - Projected coordinate system", value: "https://epsg.io/3112," },
                    { label: "EPSG:4283 - Geodetic coordinate system", value: "https://epsg.io/4283" },
                    { label: "EPSG:4326 - Geodetic coordinate system", value: "https://epsg.io/4326" },
                    { label: "EPSG:4939 - Geodetic 3D coordinate system", value: "https://epsg.io/4939" },
                    { label: "EPSG:5711 - Vertical coordinate system", value: "https://epsg.io/5711" },
                    { label: "EPSG:5712 - Vertical coordinate system", value: "https://epsg.io/5712" },
                    { label: "EPSG:8311", value: "https://epsg.io/8311" },
                ],

                eventType: [
                    { label: "Registered", value: "registered" },
                    { label: "Updated", value: "updated" },
                    { label: "Deprecated", value: "deprecated" },
                    { label: "Destroyed", value: "destroyed" },
                ]
            }
        }

        return {}
    },


}