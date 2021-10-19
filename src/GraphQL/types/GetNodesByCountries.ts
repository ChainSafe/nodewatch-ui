/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNodesByCountries
// ====================================================

export interface GetNodesByCountries_aggregateByCountry {
  __typename: "AggregateData";
  name: string;
  count: number;
}

export interface GetNodesByCountries {
  aggregateByCountry: GetNodesByCountries_aggregateByCountry[];
}
