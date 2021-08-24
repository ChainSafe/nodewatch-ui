/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOperatingSystems
// ====================================================

export interface GetOperatingSystems_aggregateByOperatingSystem {
  __typename: "AggregateData";
  name: string;
  count: number;
}

export interface GetOperatingSystems {
  aggregateByOperatingSystem: GetOperatingSystems_aggregateByOperatingSystem[];
}
