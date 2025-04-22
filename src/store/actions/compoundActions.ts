import { Compound } from "@/helpers/types.ts";

// Action Types
export const FETCH_COMPOUNDS_SUCCESS = 'FETCH_COMPOUNDS_SUCCESS';
export const FETCH_COMPOUNDS_FAILURE = 'FETCH_COMPOUNDS_FAILURE';
export const CREATE_COMPOUND_SUCCESS = 'CREATE_COMPOUND_SUCCESS';
export const CREATE_COMPOUND_FAILURE = 'CREATE_COMPOUND_FAILURE';
export const RETRIEVE_COMPOUND_SUCCESS = 'RETRIEVE_COMPOUND_SUCCESS';
export const RETRIEVE_COMPOUND_FAILURE = 'RETRIEVE_COMPOUND_FAILURE';
export const UPDATE_COMPOUND_SUCCESS = 'UPDATE_COMPOUND_SUCCESS';
export const UPDATE_COMPOUND_FAILURE = 'UPDATE_COMPOUND_FAILURE';
export const DELETE_COMPOUND_SUCCESS = 'DELETE_COMPOUND_SUCCESS';
export const DELETE_COMPOUND_FAILURE = 'DELETE_COMPOUND_FAILURE';

// Action Creators
export const fetchCompoundsSuccess = (compounds: Compound[]) => ({
    type: FETCH_COMPOUNDS_SUCCESS,
    payload: compounds,
});

export const fetchCompoundsFailure = (error: string) => ({
    type: FETCH_COMPOUNDS_FAILURE,
    payload: error,
});

export const createCompoundSuccess = (compound: Compound) => ({
    type: CREATE_COMPOUND_SUCCESS,
    payload: compound,
});

export const createCompoundFailure = (error: string) => ({
    type: CREATE_COMPOUND_FAILURE,
    payload: error,
});

export const retrieveCompoundSuccess = (compound: Compound) => ({
    type: RETRIEVE_COMPOUND_SUCCESS,
    payload: compound,
});

export const retrieveCompoundFailure = (error: string) => ({
    type: RETRIEVE_COMPOUND_FAILURE,
    payload: error,
});

export const updateCompoundSuccess = (compound: Compound) => ({
    type: UPDATE_COMPOUND_SUCCESS,
    payload: compound,
});

export const updateCompoundFailure = (error: string) => ({
    type: UPDATE_COMPOUND_FAILURE,
    payload: error,
});

export const deleteCompoundSuccess = (id: string) => ({
    type: DELETE_COMPOUND_SUCCESS,
    payload: id,
});

export const deleteCompoundFailure = (error: string) => ({
    type: DELETE_COMPOUND_FAILURE,
    payload: error,
});