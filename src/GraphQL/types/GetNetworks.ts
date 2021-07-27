/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNetworks
// ====================================================

export interface GetNetworks_aggregateByNetwork {
  __typename: "AggregateData";
  name: string;
  count: number;
}

export interface GetNetworks {
  aggregateByNetwork: GetNetworks_aggregateByNetwork[];
}
