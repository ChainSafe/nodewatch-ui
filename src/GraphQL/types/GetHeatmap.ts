/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHeatmap
// ====================================================

export interface GetHeatmap_getHeatmapData {
  __typename: "HeatmapData";
  networkType: string;
  clientType: string;
  syncStatus: string;
  latitude: number;
  longitude: number;
}

export interface GetHeatmap {
  getHeatmapData: GetHeatmap_getHeatmapData[];
}
