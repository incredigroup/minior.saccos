import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {history} from '_helpers';

// create slice

const name = 'loan';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const loanActions = { ...slice.actions, ...extraActions };
export const loanReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        loans: {},
        roles: {},
        error: null,
        appoveerror: null,
        roleerror: null
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1`;
    return {
        getAll: getAll(),
        approveLoan: approveLoan(),
        getRoles: getRoles()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await axios.get(baseUrl + '/loans')
        );
    };

    function approveLoan() {
        return createAsyncThunk(
            `${name}/approveLoan`,
            async ({loanId, authId}) => await axios.post(baseUrl + '/approveloan', {loanid: loanId, authid: authId})
        );
    }

    function getRoles() {
        return createAsyncThunk(
            `${name}/getRoles`,
            async ({loanId, authId}) => await axios.get(baseUrl + '/roles')
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...approveLoan(),
        ...getRoles()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.loans = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.loans = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = { error: action.payload.error };
            }
        };
    };

    function approveLoan() {
        var { pending, fulfilled, rejected } = extraActions.approveLoan;
        return {
            [pending]: (state) => {
                state.loans = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.loans = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.appoveerror = { error: action.payload.error };
            }
        };
    };

    function getRoles() {
        var { pending, fulfilled, rejected } = extraActions.getRoles;
        return {
            [pending]: (state) => {
                state.roles = { loading: true };
            },
            [fulfilled]: (state, action) => {
                console.log(action.payload)
                state.roles = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.roleerror = { error: action.payload.error };
            }
        };
    }
}
