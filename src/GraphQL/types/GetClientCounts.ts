/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetClientCounts
// ====================================================

export interface GetClientCounts_aggregateByAgentName {
  __typename: "AggregateData";
  name: string;
  count: number;
}

export interface GetClientCounts {
  aggregateByAgentName: GetClientCounts_aggregateByAgentName[];
}
