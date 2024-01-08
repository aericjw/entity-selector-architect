import { EntityType, EntityTypePropertyDto } from "@dynatrace-sdk/client-classic-environment-v2";
import { Relationships } from "./App.types";
export function entityTypeLookup(entityTypes: EntityType[], keys: string[] | undefined) : EntityType[] {
    let results : EntityType[] = []
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const result = entityTypes.find((entityType) => entityType.type === key)
        console.log("Key: " + key)
        if (result) {
          results.push(result)
        }
        console.log(results)
      }
    }
    return results
  }
  
export function propertiesLookup(entityTypes: EntityType[], type: string) : EntityTypePropertyDto[] | undefined {
    const result = entityTypes.find((entityType) => entityType.type == type)
    if (result && result.properties) {
      return result.properties
    }
  }
  
export function relationshipLookup(entityTypes: EntityType[], type: string) : Relationships | undefined {
    const result = entityTypes.find((entityType) => entityType.type == type)
    console.log("Relationship Lookup: " + type)
    console.log(result)
    if (result && (result.toRelationships || result.fromRelationships)) {
      return {
        toRelationships: result.toRelationships,
        fromRelationships: result.fromRelationships
      }
    }
  }