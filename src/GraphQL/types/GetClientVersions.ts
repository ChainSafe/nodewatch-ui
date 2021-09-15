/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetClientVersions
// ====================================================

export interface GetClientVersions_aggregateByClientVersion_versions {
  __typename: "AggregateData";
  name: string;
  count: number;
}

export interface GetClientVersions_aggregateByClientVersion {
  __typename: "ClientVersionAggregation";
  client: string;
  count: number;
  versions: GetClientVersions_aggregateByClientVersion_versions[];
}

export interface GetClientVersions {
  aggregateByClientVersion: GetClientVersions_aggregateByClientVersion[];
}
