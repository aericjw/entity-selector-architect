import { EntityTypePropertyDto, monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2"
export async function getEntityTypeProperties(type:string) {
    const config = {
        type: type
    }
    let properties: (EntityTypePropertyDto[] | undefined)
    let stringProperties: (EntityTypePropertyDto[] | undefined) = []
    let error: (String | null) = null
    try {
        await monitoredEntitiesClient.getEntityType(config).then((res) => {
            properties = res.properties
            if (properties != undefined) {
                for (let index = 0; index < properties.length; index++) {
                    if(properties[index].type === "String"){
                        stringProperties?.push(properties[index])
                    }
                }
            }
            console.log(stringProperties)
        })
    } catch (e) {
        error = JSON.parse(e.message)?.error;
        stringProperties = undefined
    }

    return {
        stringProperties,
        error
    } 
}