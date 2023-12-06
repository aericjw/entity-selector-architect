import { EntityType, monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2"
export async function getEntityTypes() {
    const config = {
        pageSize: 500
    }
    let entityTypes: (EntityType[] | undefined)
    let error: (String | null) = null
    try {
        await monitoredEntitiesClient.getEntityTypes(config).then((res) => {
            entityTypes = res.types
        })
    } catch (e) {
        error = JSON.parse(e.message)?.error;
        entityTypes = undefined
    }

    return {
        entityTypes,
        error
    } 
}