import { FromPosition, ToPosition, monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2"
export async function getRelationships(type: string) {
    const config = {
        type: type
    }
    let toRelationships: (FromPosition[] | undefined)
    let fromRelationships: (ToPosition[] | undefined)
    let error: (string | null) = null
    try {
        await monitoredEntitiesClient.getEntityType(config).then((res) => {
            toRelationships = res.toRelationships
            fromRelationships = res.fromRelationships
        })
    } catch (e) {
        error = e.message.error;
        toRelationships = undefined
        fromRelationships = undefined
    }

    return {
        toRelationships,
        fromRelationships,
        error
    } 
}