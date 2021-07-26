/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllUsers
// ====================================================

export interface GetAllUsers_getAllUsers {
  __typename: "User";
  id: number | null;
  firstName: string | null;
  email: string | null;
  password: string | null;
}

export interface GetAllUsers {
  getAllUsers: (GetAllUsers_getAllUsers | null)[] | null;
}
