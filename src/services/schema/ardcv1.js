import convert from "xml-js";
import ardcv1Vocab from "@/services/vocabs/ardcv1.json"
import {opt, optArr, makeArray} from "@/services/util"

/**
 * ARDC Descriptive v1 service
 * Used for transitioning between xml <-> json <-> dom type document
 * xml is the pure XML string
 * json is the json representation of the XML
 * dom is the representation of the json, but fit for DOM binding
 */
export default {

    schemaLocation() {
        return "https://identifiers.ardc.edu.au/igsn-schema/descriptive/1.0/resource.xsd"
    },

    id() {
        return "ardc-desc-igsn-v1"
    },

    vocab() {
        return ardcv1Vocab;
    },

    /**
     * provide a blank document
     *
     * @returns {{resourceTypes: [string], location: [], materialTypes: [string], contributors: [], relatedResources: []}}
     */
    blank() {
        return {
            resourceTypes: [""],
            materialTypes: [""],
            location: [],
            relatedResources: [],
            contributors: []
        }
    },

    dom2json(dom, eventType) {

        return {
            _declaration: {
                _attributes: {'version': "1.0", encoding: "utf-8"}
            },
            resources: {
                _attributes: {
                    xmlns: 'https://identifiers.ardc.edu.au/schemas/ardc-igsn-desc',
                    'xmlns:xsi': `http://www.w3.org/2001/XMLSchema-instance`,
                    'xsi:schemaLocation': `https://identifiers.ardc.edu.au/schemas/ardc-igsn-desc`
                },
                resource: {
                    _attributes: {
                        registeredObjectType: dom.registeredObjectType
                    },
                    resourceIdentifier: dom.resourceIdentifier,
                    landingPage: dom.landingPage,

                    isPublic: {
                        _attributes: {
                            emBargoDate: dom.embargoEnd
                        },
                        _text: dom.visibility
                    },

                    resourceTitle: dom.resourceTitle,

                    alternateIdentifiers: {
                        alternateIdentifier: dom.alternateIdentifiers?.map((identifier) => {
                            return {
                                _attributes: {
                                    alternateIdentifierType: identifier.type,
                                },
                                _text: identifier.value
                            }
                        })
                    },

                    resourceTypes: {
                        resourceType: dom.resourceTypes?.map((type) => {
                            return type
                        })
                    },

                    materialTypes: {
                        materialType: dom.materialTypes?.map((type) => {
                            return type
                        })
                    },

                    classifications: {
                        classification: dom.classifications?.map((classification) => {
                            return {
                                _attributes: {
                                    classificationURI: classification.classificationURI
                                },
                                _text: classification.classification
                            }
                        })
                    },

                    purpose: dom.purpose,
                    sampledFeatures: {
                        sampledFeature: dom.sampledFeatures?.map((sampledFeature) => {
                            return {
                                _attributes: {
                                    sampledFeatureURI: sampledFeature.sampledFeatureURI
                                },
                                _text: sampledFeature.sampledFeature
                            }
                        })
                    },

                    location: {
                        locality: {
                            _attributes: {
                                localityURI: dom.location?.localityURI
                            },
                            _text: dom.location?.locality
                        },
                        geometry: {
                            _attributes: {
                                srid: dom.location?.geometrySRID,
                                verticalDatum: dom.location?.geometryVerticalDatum,
                                geometryURI: dom.location?.geometryURI
                            },
                            _text: dom.location?.geometry
                        }
                    },

                    //date
                    method: {
                        _text: dom.method,
                        _attributes: {
                            methodURI: dom.methodURI
                        }
                    },
                    campaign: dom.campaign,

                    curationDetails: {
                        curation: dom.curationDetails?.map((cur) => {
                            return {
                                curator: {
                                    curatorName: cur.curatorName,
                                    curatorIdentifier: cur.curatorIdentifiers.map((identifier) => {
                                        return {
                                            _attributes: {
                                                curatorIdentifierType: identifier.type
                                            },
                                            _text: identifier.value
                                        }
                                    })
                                },
                                curationDate: cur.curationDate,
                                curationLocation: cur.curationLocation,
                                curatingInstitution: {
                                    _attributes: {
                                        institutionURI: cur.institutionURI
                                    },
                                    _text: cur.curatingInstitution
                                }
                            }
                        })
                    },

                    contributors: {
                        contributor: dom.contributors?.map((contributor) => {
                            return {
                                _attributes: {
                                    contributorType: contributor.contributorType,
                                },
                                contributorName: contributor.contributorName,
                                contributorIdentifier: {
                                    _attributes: {
                                        contributorIdentifierType: contributor.contributorIdentifierType,
                                    },
                                    _text: contributor.contributorIdentifier
                                }
                            }
                        })
                    },
                    relatedResources: {
                        relatedResource: dom.relatedResources?.map((related) => {
                            return {
                                _text: related.resource,
                                _attributes: {
                                    relatedResourceIdentifierType: related.relatedResourceIdentifierType,
                                    relationType: related.relationType
                                }
                            }
                        })
                    },
                    comments: dom.comments,
                    logDate: {
                        _attributes: {
                            eventType: eventType
                        },
                        _text: new Date().toISOString()
                    },
                }
            }
        };
    },

    json2dom(json) {
        let resource = 'resources' in json && 'resource' in json.resources ? json.resources.resource : {};

        if (resource === {}) {
            return {}
        }

        return {
            registeredObjectType: opt(resource._attributes?.registeredObjectType),

            alternateIdentifiers: makeArray(resource.alternateIdentifiers).map((identifier) => {
                return {
                    value: identifier.alternateIdentifier?._text,
                    type: identifier.alternateIdentifier?._attributes.alternateIdentifierType
                }
            }),

            campaign: opt(resource.campaign?._text),
            classifications: optArr(resource.classifications?.classification?.map((classification) => {
                return {
                    classificationURI: classification._attributes?.classificationURI,
                    classification: classification._text
                }
            })),
            comments: opt(resource.comments?._text),
            contributors: optArr(resource.contributors?.contributor?.map((contributor) => {
                return {
                    contributorName: contributor.contributorName?._text,
                    contributorType: contributor._attributes?.contributorType,
                    contributorIdentifier: contributor.contributorIdentifier?._text,
                    contributorIdentifierType: contributor.contributorIdentifier?._attributes?.contributorIdentifierType
                }
            })),
            //curationDetails
            curationDetails: makeArray(optArr(resource.curationDetails?.curation)).map((curation) => {
                return {
                    curatorIdentifiers: makeArray(curation.curator?.curatorIdentifier)
                        .map((identifier) => {
                            return {
                                value: identifier._text,
                                type: identifier._attributes?.curatorIdentifierType
                            }
                        }),
                    curatorName: curation.curator?.curatorName?._text,
                    curationDate: curation.curationDate?._text,
                    curationLocation: curation.curationLocation?._text,
                    curatingInstitution: curation.curatingInstitution?._text,
                    institutionURI: curation.curatingInstitution?._attributes?.institutionURI
                }
            }),

            //date
            visibility: opt(resource.isPublic?._text),
            landingPage: opt(resource.landingPage?._text),

            // resource.location can be an object, (single) or an array, multiple
            location: {
                locality: resource.location?.locality?._text,
                localityURI: resource.location?.locality?._attributes?.localityURI,
                geometrySRID: resource.location?.geometry?._attributes?.srid,
                geometryVerticalDatum: resource.location?.geometry?._attributes?.verticalDatum,
                geometryURI: resource.location?.geometry?._attributes?.geometryURI,
                geometry: resource.location?.geometry?._text
            },

            logDate: opt(resource.logDate?._text),
            logDateEventType: opt(resource.logDate?._attributes?.eventType),

            materialTypes: opt(makeArray(resource.materialTypes?.materialType)?.map((type) => {
                return type._text
            }), ['']),

            method: opt(resource.method?._text),
            methodURI: opt(resource.method?._attributes?.methodURI),
            purpose: opt(resource.purpose?._text),
            relatedResources: makeArray(resource.relatedResources?.relatedResource).map((related) => {
                return {
                    relatedResourceIdentifiers: makeArray(related.relatedResourceIdentifiers)
                        .map((identifier) => {
                            return {
                                value: identifier._text,
                                type: identifier._attributes?.relatedResourceIdentifierType
                            }
                        }),
                    relatedResourceTitle: related.relatedResourceTitle._text,
                    relationType: related._attributes?.relationType
                }
            }),
            resourceIdentifier: opt(resource.resourceIdentifier?._text),
            resourceTitle: opt(resource.resourceTitle?._text),
            resourceTypes: opt(makeArray(resource.resourceTypes?.resourceType).map((resourceType) => {
                return resourceType._text
            }), ['']),

            sampledFeatures: optArr(resource.sampledFeatures?.sampledFeature?.map((sampledFeature) => {
                return {
                    sampledFeatureURI: sampledFeature._attributes?.sampledFeatureURI,
                    sampledFeature: sampledFeature._text
                }
            }))
        }
    },

    json2xml(doc) {
        return convert.json2xml(doc, {
            compact: true,
            trim: true,
            spaces: 2,
            fullTagEmptyElement: true
        });
    },

    xml2json(xml) {
        return JSON.parse(convert.xml2json(xml, {compact: true, trim: true}))
    },

    xml2dom(xml) {
        let json = this.xml2json(xml)
        return this.json2dom(json)
    }

}