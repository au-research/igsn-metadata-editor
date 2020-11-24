import convert from "xml-js";
import ardcv1Vocab from "@/services/vocabs/ardcv1.json"
import {opt, optArr, makeArray, clearEmpties, initEmptyArrayWithSingleObj, initEmptyArray} from "@/services/util"

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
                            embargoEnd: dom.embargoEnd
                        },
                        _text: dom.visibility === "true" ? "true" : "false"
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
                                    classificationURI: opt(classification.classificationURI)
                                },
                                _text: opt(classification.classification)
                            }
                        })
                    },

                    purpose: dom.purpose,
                    sampledFeatures: {
                        sampledFeature: dom.sampledFeatures?.map((sampledFeature) => {
                            return {
                                _attributes: {
                                    sampledFeatureURI: opt(sampledFeature.sampledFeatureURI)
                                },
                                _text: opt(sampledFeature.sampledFeature)
                            }
                        })
                    },

                    date: {
                        timePeriod: dom.dateTimePeriodStart && dom.dateTimePeriodEnd ? {
                            start: dom.dateTimePeriodStart,
                            end: dom.dateTimePeriodEnd
                        }: {},
                        timeInstant: opt(dom.dateTimeInstant, "")
                    },

                    location: {
                        locality: {
                            _attributes: {
                                localityURI: dom.location?.localityURI
                            },
                            _text: opt(dom.location?.locality)
                        },
                        geometry: {
                            _attributes: {
                                srid: dom.location?.geometrySRID,
                                verticalDatum: dom.location?.geometryVerticalDatum,
                                geometryURI: dom.location?.geometryURI
                            },
                            _text: opt(dom.location?.geometry)
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
                                    curatorIdentifier: {
                                        _attributes: {
                                            curatorIdentifierType: cur.curatorIdentifierType
                                        },
                                        _text: opt(cur.curatorIdentifier)
                                    },
                                },
                                curationDate: cur.curationDate,
                                curationLocation: cur.curationLocation,
                                curatingInstitution: {
                                    _attributes: {
                                        institutionURI: cur.institutionURI
                                    },
                                    _text: opt(cur.curatingInstitution)
                                }
                            }
                        })
                    },

                    contributors: {
                        contributor: dom.contributors?.map((contributor) => {
                            let con = {
                                _attributes: {
                                    contributorType: contributor.contributorType,
                                },
                                contributorName: contributor.contributorName
                            }

                            if (contributor.contributorIdentifier) {
                                con.contributorIdentifier = {
                                    _attributes: {
                                        contributorIdentifierType: contributor.contributorIdentifierType,
                                    },
                                    _text: contributor.contributorIdentifier
                                }
                            }

                            return con;
                        })
                    },

                    relatedResources: {
                        relatedResource: dom.relatedResources?.map(related => {
                            return {
                                relatedResourceTitle: related.relatedResourceTitle,
                                relatedResourceIdentifier: {
                                    _text: related.relatedResourceIdentifier,
                                    _attributes: {
                                        relatedResourceIdentifierType: related.relatedResourceIdentifierType
                                    }
                                },
                                _attributes: {
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
            registeredObjectType: opt(resource._attributes?.registeredObjectType, "http://pid.geoscience.gov.au/def/voc/ga/igsncode/PhysicalSample"),

            alternateIdentifiers: makeArray(resource.alternateIdentifiers?.alternateIdentifier).map((identifier) => {
                return {
                    value: identifier._text,
                    type: identifier._attributes?.alternateIdentifierType
                }
            }),

            campaign: opt(resource.campaign?._text),
            classifications: optArr(makeArray(resource.classifications?.classification).map((classification) => {
                return {
                    classificationURI: opt(classification._attributes?.classificationURI),
                    classification: opt(classification._text)
                }
            })),
            comments: opt(resource.comments?._text),
            contributors: optArr(makeArray(resource.contributors?.contributor).map((contributor) => {
                return {
                    contributorName: contributor.contributorName?._text,
                    contributorType: contributor._attributes?.contributorType,
                    contributorIdentifier: contributor.contributorIdentifier?._text,
                    contributorIdentifierType: contributor.contributorIdentifier?._attributes?.contributorIdentifierType
                }
            })),
            //curationDetails
            curationDetails: initEmptyArrayWithSingleObj(makeArray(optArr(resource.curationDetails?.curation)).map((curation) => {
                return {
                    curatorIdentifier: curation.curator?.curatorIdentifier?._text,
                    curatorIdentifierType: curation.curator?.curatorIdentifier?._attributes?.curatorIdentifierType,
                    curatorName: curation.curator?.curatorName?._text,
                    curationDate: curation.curationDate?._text,
                    curationLocation: curation.curationLocation?._text,
                    curatingInstitution: curation.curatingInstitution?._text,
                    institutionURI: curation.curatingInstitution?._attributes?.institutionURI
                }
            })),

            //date
            visibility: opt(resource.isPublic?._text, "true") === "true" ? "true" : "false",
            embargoDate: opt(resource.isPublic?._attributes?.embargoEnd, ""),
            landingPage: opt(resource.landingPage?._text),

            // resource.location can be an object, (single) or an array, multiple
            location: {
                locality: resource.location?.locality?._text,
                localityURI: resource.location?.locality?._attributes?.localityURI,
                geometrySRID: opt(resource.location?.geometry?._attributes?.srid, "https://epsg.io/4326"),
                geometryVerticalDatum: resource.location?.geometry?._attributes?.verticalDatum,
                geometryURI: resource.location?.geometry?._attributes?.geometryURI,
                geometry: resource.location?.geometry?._text
            },

            logDate: opt(resource.logDate?._text),
            logDateEventType: opt(resource.logDate?._attributes?.eventType),

            materialTypes: initEmptyArray(makeArray(resource.materialTypes?.materialType)?.map((type) => {
                return type._text
            }), ''),

            method: opt(resource.method?._text),
            methodURI: opt(resource.method?._attributes?.methodURI),
            purpose: opt(resource.purpose?._text),

            relatedResources: makeArray(resource.relatedResources?.relatedResource).map((related) => {
                return {
                    relatedResourceIdentifier: opt(related.relatedResourceIdentifier._text),
                    relatedResourceIdentifierType: opt(related.relatedResourceIdentifier._attributes.relatedResourceIdentifierType),
                    relatedResourceTitle: opt(related.relatedResourceTitle?._text),
                    relationType: related._attributes?.relationType
                }
            }),

            resourceIdentifier: opt(resource.resourceIdentifier?._text),
            resourceTitle: opt(resource.resourceTitle?._text),
            resourceTypes: initEmptyArray(makeArray(resource.resourceTypes?.resourceType).map((resourceType) => {
                return resourceType._text
            }), ""),

            sampledFeatures: optArr(makeArray(resource.sampledFeatures?.sampledFeature).map((sampledFeature) => {
                return {
                    sampledFeatureURI: sampledFeature._attributes?.sampledFeatureURI,
                    sampledFeature: sampledFeature._text
                }
            }))
        }
    },

    json2xml(doc) {
        // convert to xml
        let xml =  convert.json2xml(doc, {
            compact: true,
            trim: true,
            spaces: 2,
            fullTagEmptyElement: true
        });

        // remove empty tags with regex, do it 4 times because regex can't do recursive
        for (let i = 0; i < 4; i++) {
            xml = xml.replaceAll(/<[^/>][^>]*>\s*<\/[^>]+>\s*/gi, "");
        }
        return xml;
    },

    xml2json(xml) {
        return JSON.parse(convert.xml2json(xml, {compact: true, trim: true}))
    },

    xml2dom(xml) {
        let json = this.xml2json(xml)
        return this.json2dom(json)
    }

}