import React, { useEffect, useState } from "react";
import { Flex, Container, SelectV2, SelectV2Option, TextInput, Button } from "@dynatrace/strato-components-preview";
import { getEntityTypes } from "../dt-api/getEntityTypes";
import { EntityType, FromPosition, ToPosition, EntityTypePropertyDto } from "@dynatrace-sdk/client-classic-environment-v2";
import { SelectedEntity } from "../App.types";
import { entityTypeLookup, propertiesLookup, relationshipLookup } from "../lookups";

interface EntitySelectorProps {
  entity: SelectedEntity,
  updateEntity: (key: number, entity: SelectedEntity) => void
}

export const EntitySelector = ({ entity, updateEntity }: EntitySelectorProps) => {
  const [entityTypes, setEntityTypes] = useState<EntityType[]>([])
  const [properties, setProperties] = useState<EntityTypePropertyDto[]>([])
  const [toRelationships, setToRelationships] = useState<FromPosition[]>([])
  const [fromRelationships, setFromRelationships] = useState<ToPosition[]>([])

  const [selectedEntityType, setSelectedEntityType] = useState<string>("")
  const [entityName, setEntityName] = useState<string>("")
  const [selectedProperties, setSelectedProperties] = useState<EntityTypePropertyDto[]>([])
  const [tags, setTags] = useState<string>("");
  const [managementZones, setManagementZones] = useState<string>("");
  const [healthState, setHealthState] = useState<string>("");
  const [firstSeen, setFirstSeen] = useState<string>("");

  /* 
  1. Get all entity types from Dynatrace tenant
  2. If there's a base entity selector, only get possible types from toRelationshps and fromRelationships, set state with possible types
  3. If there's no base entity selector, set state with all types
  */

  useEffect(() => {
    getEntityTypes().then((response) => {
      console.log(response)
      if (response.entityTypes != undefined) {
        if (!entity.baseType) {
          setEntityTypes(response.entityTypes)
        }
        else {
          let relationshipTypes: EntityType[] = []
          console.log("BaseType: ")
          console.log(entity.baseType)
          if (entity.baseType.toRelationships) {
            for (let i = 0; i < entity.baseType.toRelationships.length; i++) {
              if (entity.baseType.toRelationships[i].fromTypes !== undefined) {
                relationshipTypes = relationshipTypes.concat(
                  entityTypeLookup(response.entityTypes, entity.baseType.toRelationships[i].fromTypes)
                )
                console.log(relationshipTypes)
              }
            }
          }
          if (entity.baseType.fromRelationships) {
            for (let i = 0; i < entity.baseType.fromRelationships.length; i++) {
              if (entity.baseType.fromRelationships[i].toTypes !== undefined) {
                relationshipTypes = relationshipTypes.concat(
                  entityTypeLookup(response.entityTypes, entity.baseType.fromRelationships[i].toTypes)
                )
              }
            }
          }
          console.log(relationshipTypes)
          setEntityTypes(relationshipTypes)
        }
      }
      else {
        console.log(response.error)
      }
    })
  }, [])

  /*
  selectedEntityType is only text, not an EntityType object
  because of this, need to update possible properties and relationships by looking up entity type
  */

  useEffect(() => {
    if (selectedEntityType) {
      const properties = propertiesLookup(entityTypes, selectedEntityType)
      if (properties) {
        setProperties(properties)
      }

      const relationships = relationshipLookup(entityTypes, selectedEntityType)
      if (relationships?.toRelationships) {
        setToRelationships(relationships.toRelationships)
      }

      if (relationships?.fromRelationships) {
        setFromRelationships(relationships.fromRelationships)
      }
    }
  }, [selectedEntityType])

  useEffect(() => {
    const selectedEntity: SelectedEntity = {
      key: entity.key,
      type: selectedEntityType,
      displayName: entityName,
      properties: selectedProperties,
      tags: tags,
      managementZones: managementZones,
      healthState: healthState,
      firstSeen: firstSeen,
      toRelationships: toRelationships,
      fromRelationships: fromRelationships
    }
    updateEntity(entity.key, selectedEntity)
  }, [entityName, selectedProperties, tags, managementZones, healthState, firstSeen, properties])

  return (
    <>
      <Container as={Flex} width="100%">
        <SelectV2 value={selectedEntityType} onChange={setSelectedEntityType}>
          <SelectV2.Content>
            {entityTypes.map((entityType) => (
              <SelectV2Option id={entityType.type} key={entityType.type} value={entityType.type}>{entityType.displayName}</SelectV2Option>
            ))}
          </SelectV2.Content>
        </SelectV2>
        <TextInput value={entityName} onChange={setEntityName} placeholder="Entity Name" />
        <SelectV2 value={selectedProperties} onChange={setSelectedProperties} multiple>
          <SelectV2.Content>
            {properties.map((property) => (
              <SelectV2Option id={property.id} key={property.id} value={property.id}>{property.displayName}</SelectV2Option>
            ))}
          </SelectV2.Content>
        </SelectV2>
        <TextInput value={tags} onChange={setTags} placeholder="Tags" />
        <TextInput value={managementZones} onChange={setManagementZones} placeholder="Management Zone Name(s)" />
        <TextInput value={healthState} onChange={setHealthState} placeholder="Health State" />
        <TextInput value={firstSeen} onChange={setFirstSeen} placeholder="First Seen" />
      </Container>
    </>
  )
}