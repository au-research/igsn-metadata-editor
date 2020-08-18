import convert from "xml-js";

function opt(thing, defaultValue = "") {
  return thing ? thing : defaultValue
}

function optArr(thing) {
  return opt(thing, [])
}

export default {

  getBlankIGSNv3() {
    return {
      resourceTypes: [""],
      materialTypes: [""],
      location: [],
      relatedResources: [],
      contributors: []
    }
  },

  getJSONDOCFromDOMDoc(doc) {

    return {
      _declaration: {
        _attributes: { version: "1.0", encoding: "utf-8" }
      },
      resources: {
        _attributes: {
          xmlns: 'https://igsn.csiro.au/schemas/3.0',
          'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
          'xsi:schemaLocation': "https://igsn.csiro.au/schemas/3.0 https://igsn.csiro.au/schemas/3.0/igsn-csiro-v3.0.xsd"
        },
        resource: {
          _attributes: {
            registeredObjectType: doc.registeredObjectType
          },
          resourceIdentifier: doc.resourceIdentifier,
          landingPage: doc.landingPage,

          isPublic: {
            _attributes: {
              emBargoDate: doc.embargoEnd
            },
            _text: doc.visibility
          },

          resourceTitle: doc.resourceTitle,

          alternateIdentifiers: {
            alternateIdentifier: doc.alternateIdentifiers?.map((identifier) => {
              return identifier
            })
          },

          resourceTypes: {
            resourceType: doc.resourceTypes?.map((type) => {
              return type
            })
          },

          materialTypes: {
            materialType: doc.materialTypes?.map((type) => {
              return type
            })
          },

          classifications: {
            classification: doc.classifications?.map((classification) => {
              return {
                _attributes: {
                  classificationURI: classification.classificationURI
                },
                _text: classification.classification
              }
            })
          },

          purpose: doc.purpose,
          sampledFeatures: {
            sampledFeature: doc.sampledFeatures?.map((sampledFeature) => {
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
                localityURI: doc.location?.localityURI
              },
              _text: doc.location?.locality
            },
            geometry: {
              _attributes: {
                srid: doc.location?.geometrySRID,
                verticalDatum: doc.location?.geometryVerticalDatum,
                geometryURI: doc.location?.geometryURI
              },
              _text: doc.location?.geometry
            }
          },

          //date
          method: {
            _text: doc.method,
            _attributes: {
              methodURI: doc.methodURI
            }
          },
          campaign: doc.campaign,

          curationDetails: {
            curation: doc.curationDetails?.map((cur) => {
              return {
                curator: cur.curator,
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
            contributor: doc.contributors?.map((contributor) => {
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
            relatedResource: doc.relatedResources?.map((related) => {
              return {
                _text: related.resource,
                _attributes: {
                  relatedResourceIdentifierType: related.relatedResourceIdentifierType,
                  relationType: related.relationType
                }
              }
            })
          },
          comments: doc.comments,
          logDate: doc.logDate,
        }
      }
    };
  },

  makeArray(stuff) {
    if (! stuff) {
      return []
    }
    return Array.isArray(stuff) ? stuff : [stuff]
  },

  getCurationDetails(curation) {
    // console.log("getCurationDetails", curation)
    return this.makeArray(curation).map((curation) => {
      return {
        curator: curation.curator?._text,
        curationDate: curation.curationDate?._text,
        curationLocation: curation.curationLocation?._text,
        curatingInstitution: curation.curatingInstitution?._text,
        institutionURI: curation.curatingInstitution?._attributes?.institutionURI
      }
    })
  },

  convertJSONDocToDOMDoc(jsondoc) {
    let resource = 'resources' in jsondoc && 'resource' in jsondoc.resources ? jsondoc.resources.resource : {};
    return {
      registeredObjectType: opt(resource._attributes?.registeredObjectType),

      alternateIdentifiers: optArr(resource.alternateIdentifiers?.alternateIdentifier?.map((identifier) => {
        return identifier._text
      })),

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
      curationDetails: this.makeArray(optArr(resource.curationDetails?.curation)).map((curation) => {
        return {
          curator: curation.curator?._text,
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

      materialTypes: opt(this.makeArray(resource.materialTypes?.materialType)?.map((type) => {
        return type._text
      }), ['']),

      method: opt(resource.method?._text),
      methodURI: opt(resource.method?._attributes?.methodURI),
      purpose: opt(resource.purpose?._text),
      relatedResources: this.makeArray(resource.relatedResources?.relatedResource).map((related) => {
        return {
          relatedResourceIdentifiers: this.makeArray(related.relatedResourceIdentifiers)
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
      resourceTypes: opt(this.makeArray(resource.resourceTypes?.resourceType).map((resourceType) => {
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

  convertJSONDocToXML(doc) {
    return convert.json2xml(doc, {
      compact: true,
      trim: true,
      spaces: 2,
      fullTagEmptyElement: true
    });
  },

  convertXMLTOJSONDoc(xml) {
    return JSON.parse(convert.xml2json(xml, { compact: true, trim: true }))
  },

  getSampleXML() {
    return `<resources xmlns="https://igsn.csiro.au/schemas/3.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://igsn.csiro.au/schemas/3.0 https://igsn.csiro.au/schemas/3.0/igsn-csiro-v3.0.xsd">
            <resource registeredObjectType="http://pid.geoscience.gov.au/def/voc/igsn-codelists/PhysicalSample">
                <resourceIdentifier>CSTSTDOCO1</resourceIdentifier>
                <landingPage>http://example.com.au/abcde</landingPage>
                <isPublic>true</isPublic>
                <resourceTitle>A title worthy for kings</resourceTitle>
                <alternateIdentifiers>
                    <alternateIdentifier>Another identifer option</alternateIdentifier>
                    <alternateIdentifier>And again another identifer</alternateIdentifier>
                </alternateIdentifiers>
                <resourceTypes>
                    <resourceType>http://vocabulary.odm2.org/specimentype/core</resourceType>
                    <resourceType>http://vocabulary.odm2.org/specimentype/corePiece</resourceType>
                </resourceTypes>
                <materialTypes>
                    <materialType>http://vocabulary.odm2.org/medium/particulate</materialType>
                    <materialType>http://vocabulary.odm2.org/medium/air</materialType>
                </materialTypes>
                <classifications>
                    <classification classificationURI="http://www.classification.com/tin">Some phrases for classification</classification>
                    <classification classificationURI="http://www.classification.com/gold">maybe gold or silver</classification>
                </classifications>
                <purpose>This is a test resource for demo multi</purpose>
                <sampledFeatures>
                    <sampledFeature sampledFeatureURI="http://www.samplefeature.com/uri/abcde">A sample feature sitting somewhere</sampledFeature>
                    <sampledFeature sampledFeatureURI="http://www.samplefeature.com/uri/hfsgfs">A lalala land</sampledFeature>
                    <sampledFeature sampledFeatureURI="http://www.samplefeature.com/uri/gfnbgdgfd">Curry for dinner</sampledFeature>
                </sampledFeatures>
                <location>
                    <locality localityURI="http://google.map/perth">Canning vale</locality>
                    <geometry srid="https://epsg.io/4326" verticalDatum="https://epsg.io/4326" geometryURI="http://www.altova.com">POLYGON ((127.05688476563 -20.5224609375, 124.24438476563 -28.2568359375, 143.22875976563 -32.1240234375, 142.17407226563 -20.8740234375, 127.05688476563 -20.5224609375))</geometry>
                </location>
                <date>
                    <timePeriod>
                        <start>2003</start>
                        <end>2002</end>
                    </timePeriod>
                </date>
                <method methodURI="http://method.com/collection">Lab sampling</method>
                <campaign>a</campaign>
                <curationDetails>
                    <curation>
                        <curator>Curtin</curator>
                        <curationDate>2001-12</curationDate>
                        <curationLocation>Bentley</curationLocation>
                        <curatingInstitution institutionURI="http://www.curtin.org">Curtin University</curatingInstitution>
                    </curation>
                    <curation>
                        <curator>CSIRO</curator>
                        <curationDate>2001-12</curationDate>
                        <curationLocation>In the lab somewhere</curationLocation>
                        <curatingInstitution institutionURI="http://csiro.au">ARRC</curatingInstitution>
                    </curation>
                </curationDetails>
                <contributors>
                    <contributor contributorType="http://registry.it.csiro.au/def/isotc211/CI_RoleCode/pointOfContact">
                        <contributorName>Victor Tey</contributorName>
                        <contributorIdentifier contributorIdentifierType="http://pid.geoscience.gov.au/def/voc/igsn-codelists/ORCID">Contributor to something</contributorIdentifier>
                    </contributor>
                    <contributor contributorType="http://registry.it.csiro.au/def/isotc211/CI_RoleCode/originator">
                        <contributorName>Adam Brown</contributorName>
                        <contributorIdentifier contributorIdentifierType="http://pid.geoscience.gov.au/def/voc/igsn-codelists/EISSN">this has to mean something</contributorIdentifier>
                    </contributor>
                </contributors>
                <relatedResources>
                    <relatedResource relatedResourceIdentifierType="http://pid.geoscience.gov.au/def/voc/igsn-codelists/ARK" relationType="http://pid.geoscience.gov.au/def/voc/igsn-codelists/HasDigitalRepresentation">A related resource somewhere</relatedResource>
                    <relatedResource relatedResourceIdentifierType="http://pid.geoscience.gov.au/def/voc/igsn-codelists/DOI" relationType="http://pid.geoscience.gov.au/def/voc/igsn-codelists/IsMemberOf">A related resource somewhere</relatedResource>
                </relatedResources>
                <comments>This is a comment fit for kings</comments>
                <logDate eventType="registered">2002</logDate>
            </resource>
        </resources>`;
  },


}