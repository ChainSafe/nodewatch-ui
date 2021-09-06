/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNodeStats
// ====================================================

export interface GetNodeStats_getNodeStats {
  __typename: "NodeStats";
  totalNodes: number;
  nodeSyncedPercentage: number;
  nodeUnsyncedPercentage: number;
}

export interface GetNodeStats {
  getNodeStats: GetNodeStats_getNodeStats;
}
