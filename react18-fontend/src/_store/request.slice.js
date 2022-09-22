import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { history } from '_helpers';

// create slice

const name = 'request';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const requestActions = { ...slice.actions, ...extraActions };
export const requestReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        amount: null,
        edate: null,
        error: null
    }
}

function createReducers() {
    return {
        request
    };

    function request(state) {
        state.amount = null;
        state.edate = null;
        state.error = null;
        history.navigate('/request');
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1/loans`;
    return {
        apply: apply()
    };    

    function apply() {
        return createAsyncThunk(
            `${name}/apply`,
            async ({ amount, edate,  authId}) => axios.post(baseUrl, {amount: amount, edate: edate, userId: authId})
        );
    }
}

function createExtraReducers() {
    return {
        ...apply()
    };

    function apply() {
        var { pending, fulfilled, rejected } = extraActions.apply;
        return {
            [pending]: (state) => {
                state.amount = null;
                state.edate = null;
            },
            [fulfilled]: (state, action) => {
                if(action.payload.status == 200) {
                    history.navigate('/management');
                }
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
