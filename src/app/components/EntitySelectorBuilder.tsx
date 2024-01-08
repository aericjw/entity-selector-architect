import React, {useState} from "react";
import { EntitySelector } from "./EntitySelector"
import { EntitySelectorResult } from "./EntitySelectorResult";
import { Button } from "@dynatrace/strato-components-preview";
import { SelectedEntity } from "../App.types";

export const EntitySelectorBuilder = () => {
  
  const [entities, setEntities] = useState<SelectedEntity[]>([{key: 0, type: ""}])

  function updateEntity(key: number, newEntity: SelectedEntity) {
    setEntities(entities.map((entity, index) => {
      if (index === key) {
        return newEntity
      } else {
        return entity
      }
    }))
  }

  function addEntitySelector() {
    const entity : SelectedEntity = {
      key: entities.length,
      baseType: entities[entities.length - 1]
    }
    setEntities([...entities, entity])
  }

  function removeEntitySelector() {
    setEntities(entities.splice(0, entities.length - 1))
  }

  return (
    <>
    {
      entities.map((entity) => (
        <EntitySelector key={entity.key} entity={entity} updateEntity={updateEntity}/>
      ))
    }
    <Button onClick={() => addEntitySelector()}>+Add Relationship</Button>
    <Button onClick={() => removeEntitySelector()}>-Remove Relationship</Button>
    <EntitySelectorResult entities={entities}/>
    </>    
  )
}