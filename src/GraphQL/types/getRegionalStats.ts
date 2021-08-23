/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRegionalStats
// ====================================================

export interface GetRegionalStats_getRegionalStats {
  __typename: "RegionalStats";
  totalParticipatingCountries: number;
  hostedNodePercentage: number;
  nonhostedNodePercentage: number;
}

export interface GetRegionalStats {
  getRegionalStats: GetRegionalStats_getRegionalStats;
}
