import React, {useEffect, useState} from "react";
import { Flex, Container, Markdown} from "@dynatrace/strato-components-preview";
import { SelectedEntity } from "../App.types";
import { EntityTypePropertyDto } from "@dynatrace-sdk/client-classic-environment-v2";

interface EntitySelectorResultProps {
    entities: SelectedEntity[]
}

function propertiesFormatter(properties: EntityTypePropertyDto[]) {
    let resultString = ","
    for (let index = 0; index < properties.length; index++) {
        if (index === properties.length - 1){
            resultString += properties[index].displayName + "(<insert-value-here>)";
        }
        else {
            resultString += properties[index].displayName + "(<insert-value-here>),";
        }
    }
    return resultString
}

function buildEntitySelector(entity: SelectedEntity) {
    let entitySelector = "type(" + entity.type + ")"
        if (entity.displayName !== "") {
            entitySelector += ",entityName.contains(" + entity.displayName + ")"
        }

        if (entity.properties) {
            entitySelector += propertiesFormatter(entity.properties)
        }
    
        if (entity.tags !== "") {
            entitySelector +=",tags(" + entity.tags + ")"
        }
    
        if (entity.managementZones !== "") {
            entitySelector += ",mzName(" + entity.managementZones + ")"
        }
        
        if (entity.healthState !== "") {
            entitySelector += ",healthState(" + entity.healthState + ")"
        }
    
        if (entity.firstSeen !== "") {
            entitySelector += ",firstSeen(" + entity.firstSeen + ")"
        }
    return entitySelector
}

export const EntitySelectorResult = ({entities}: EntitySelectorResultProps) => {
    let entitySelector : string = `Waiting for entity selector to be built...`
    const [markdownResult, setMarkdownResult] = useState<string>(entitySelector)
    
    useEffect(() => {
        if(entities[0].type !== "") {
            for (let i = 0; i < entities.length; i++) {
                let entitySelector = buildEntitySelector(entities[i])
                setMarkdownResult("`" + entitySelector + "`")
            }
        }
    }, [entities])

    return (
        <Container as={Flex} width="100%">
            <Markdown>{markdownResult}</Markdown>
        </Container>
    )
}