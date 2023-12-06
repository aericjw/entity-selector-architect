import React, { useEffect, useState } from "react";
import { Flex, Heading, Paragraph, Strong, useCurrentTheme, Container, Select, SelectedKeys, SelectOption, TextInput } from "@dynatrace/strato-components-preview";
import { Card } from "../components/Card";
import { getEntityTypes } from "../dt-api/getEntityTypes";
import { getEntityTypeProperties } from "../dt-api/getEntityTypeProperties";

interface EntityTypeDropdownOption {
  id: string,
  text: string
}

export const Home = () => {
  const theme = useCurrentTheme();
  
  const [selectedEntityType, setSelectedEntityType] = useState<SelectedKeys | null>(null)
  const [entityTypes, setEntityTypes] = useState<EntityTypeDropdownOption[]>([])

  const [entityName, setEntityName] = useState<string>("")

  const [selectedProperty, setSelectedProperty] = useState<SelectedKeys | null>(null)
  const [properties, setProperties] = useState<EntityTypeDropdownOption[]>([])

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
    })
  },[])

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
    })
  },[selectedEntityType])

  return (
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <Container as={Flex} width="100%">
        <Select selectedId={selectedEntityType} onChange={setSelectedEntityType}>
          {entityTypes.map((option) => (
            <SelectOption id={option.id} key={option.id}>
              {option.text}
            </SelectOption>
          ))}
        </Select>
        <TextInput value={entityName} onChange={setEntityName} placeholder="Entity Name"/>
        <Select selectedId={selectedProperty} onChange={setSelectedProperty}>
          {properties.map((option) => (
            <SelectOption id={option.id} key={option.id}>
              {option.text}
            </SelectOption>
          ))}
        </Select>
      </Container>

      <Container as={Flex} width="100%" alignItems="center" flexDirection="column" variant="accent">
        <Heading>Welcome To Your Dynatrace App</Heading>
        <Paragraph>
          Edit <Strong>src/app/pages/Home.tsx</Strong> and save to reload the app.
        </Paragraph>
        <Paragraph>For more information and help on app development, check out the following:</Paragraph>

        <Flex gap={48} paddingTop={64} flexFlow="wrap">
          <Card
            href="/data"
            inAppLink
            imgSrc={theme === "light" ? "./assets/data.png" : "./assets/data_dark.png"}
            name="Explore data"
          />
          <Card
            href="https://dt-url.net/developers"
            imgSrc={theme === "light" ? "./assets/devportal.png" : "./assets/devportal_dark.png"}
            name="Dynatrace Developer"
          />
          <Card
            href="https://dt-url.net/devcommunity"
            imgSrc={theme === "light" ? "./assets/community.png" : "./assets/community_dark.png"}
            name="Developer Community"
          />
        </Flex>
      </Container>
    </Flex>
  );
};
