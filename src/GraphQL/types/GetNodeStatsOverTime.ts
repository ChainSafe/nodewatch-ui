/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNodeStatsOverTime
// ====================================================

export interface GetNodeStatsOverTime_getNodeStatsOverTime {
  __typename: "NodeStatsOverTime";
  time: number;
  totalNodes: number;
  syncedNodes: number;
  unsyncedNodes: number;
}

export interface GetNodeStatsOverTime {
  getNodeStatsOverTime: GetNodeStatsOverTime_getNodeStatsOverTime[];
}

export interface GetNodeStatsOverTimeVariables {
  start: number;
  end: number;
}
