import { EntityType, FromPosition, ToPosition } from "@dynatrace-sdk/client-classic-environment-v2";

export interface SelectedEntity extends EntityType {
    key: number,
    baseType?: EntityType,
    healthState?: string,
    firstSeen?: string
  }

export interface Relationships {
  toRelationships: FromPosition[] | undefined,
  fromRelationships: ToPosition[] | undefined
}