/*
Copyright 2022 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNextHardForkSchedule
// ====================================================

export interface GetNextHardForkSchedule_aggregateByHardforkSchedule {
  __typename: "NextHardforkAggregation";
  version: string;
  epoch: string;
  count: number;
}

export interface GetNextHardForkSchedule {
  aggregateByHardforkSchedule: GetNextHardForkSchedule_aggregateByHardforkSchedule[];
}
