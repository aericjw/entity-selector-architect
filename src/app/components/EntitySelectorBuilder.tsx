import React, { useEffect, useState } from "react";
import { Flex, Container, SelectV2, SelectV2Option, SelectV2MultiValue, Button, TextInput } from "@dynatrace/strato-components-preview";
import { EntitySelectorResult } from "../components/EntitySelectorResult";
import { getEntityTypes } from "../dt-api/getEntityTypes";
import { getEntityTypeProperties } from "../dt-api/getEntityTypeProperties";

interface EntityTypeDropdownOption {
  id: string,
  text: string
}

export const EntitySelectorBuilder = () => {
  const [selectedEntityType, setSelectedEntityType] = useState<string | null>(null)
  const [entityTypes, setEntityTypes] = useState<EntityTypeDropdownOption[]>([])

  const [entityName, setEntityName] = useState<string>("")

  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [properties, setProperties] = useState<EntityTypeDropdownOption[]>([])

  const [tags, setTags] = useState<string>("");

  const [managementZoneNames, setManagementZoneNames] = useState<string>("");

  const [healthState, setHealthState] = useState<string>("");

  const [firstSeen, setFirstSeen] = useState<string>("");

  useEffect(() => {
    getEntityTypes().then((response) => {
      console.log(response)
      if(response.entityTypes != undefined) {
        const options: EntityTypeDropdownOption[] = response.entityTypes.map((entityType) => ({
          id: `${entityType.type}`,
          text: `${entityType.displayName}`
        }));
        setEntityTypes(options)
      }
      else {
        console.log(response.error)
        return Array(1).fill(undefined)
      }
    })},[])
    
  useEffect(() => {
    console.log(selectedEntityType?.toString())
    getEntityTypeProperties(selectedEntityType?.toString()!).then((response) => {
      if(response.stringProperties != undefined) {
        const options: EntityTypeDropdownOption[] = response.stringProperties.map((property) => ({
          id: `${property.id}`,
          text: `${property.displayName}`
        }));
        setProperties(options)
      }
    })},[selectedEntityType])

  return (
    <>
    <Container as={Flex} width="100%">
      <SelectV2 value={selectedEntityType} onChange={setSelectedEntityType}>
        <SelectV2.Content>
        {entityTypes.map((option) => (
          <SelectV2Option id={option.id} key={option.id} value={option.id}>{option.text}</SelectV2Option>
        ))}
        </SelectV2.Content>
      </SelectV2>
      <TextInput value={entityName} onChange={setEntityName} placeholder="Entity Name"/>
      <SelectV2 value={selectedProperties} onChange={setSelectedProperties} multiple> 
        <SelectV2.Content>
        {properties.map((option) => (
          <SelectV2Option id={option.id} key={option.id} value={option.id}>{option.text}</SelectV2Option>
        ))}
        </SelectV2.Content>
      </SelectV2>
      <TextInput value={tags} onChange={setTags} placeholder="Tags"/>
      <TextInput value={managementZoneNames} onChange={setManagementZoneNames} placeholder="Management Zone Name(s)"/>
      <TextInput value={healthState} onChange={setHealthState} placeholder="Health State"/>
      <TextInput value={firstSeen} onChange={setFirstSeen} placeholder="First Seen"/>
    </Container>
    <EntitySelectorResult entityType={selectedEntityType} entityName={entityName} properties={selectedProperties} tags={tags} managementZones={managementZoneNames} healthState={healthState} firstSeen={firstSeen}/>
    </>
    
  )
}  