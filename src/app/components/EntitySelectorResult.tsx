import React from "react";
import { Flex, Container, Markdown} from "@dynatrace/strato-components-preview";

interface EntitySelectorResultProps {
    entityType: string | null,
    entityName: string,
    properties: string[],
    tags: string,
    managementZones: string,
    healthState: string,
    firstSeen: string
}

function propertiesFormatter(properties: string[]) {
    let resultString = ","
    for (let index = 0; index < properties.length; index++) {
        if (index === properties.length - 1){
            resultString += properties[index] + "(<insert-value-here>)";
        }
        else {
            resultString += properties[index] + "(<insert-value-here>),";
        }
    }
    return resultString
}

export const EntitySelectorResult = ({entityType, entityName, properties, tags, managementZones, healthState, firstSeen}: EntitySelectorResultProps) => {
    let entitySelector: string | null
    let markdownResult: string
    if (entityType === null) {
        entitySelector = null
        markdownResult = `Waiting for entity selector to be built...`
    }
    else {
        entitySelector = "type(" + entityType + ")"
        if (entityName !== "") {
            entitySelector += ",entityName.contains(" + entityName + ")"
        }

        if (properties.length > 0) {
            entitySelector += propertiesFormatter(properties)
        }
    
        if (tags !== "") {
            entitySelector +=",tags(" + tags + ")"
        }
    
        if (managementZones !== "") {
            entitySelector += ",mzName(" + managementZones + ")"
        }
        
        if (healthState !== "") {
            entitySelector += ",healthState(" + healthState + ")"
        }
    
        if (firstSeen !== "") {
            entitySelector += ",firstSeen(" + firstSeen + ")"
        }
        markdownResult = "`" + entitySelector + "`"
    }

    return (
        <Container as={Flex} width="100%">
            <Markdown>{markdownResult}</Markdown>
        </Container>
    )

}