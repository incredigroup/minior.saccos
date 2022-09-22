import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// create slice
const name = 'role';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports
export const roleActions = { ...slice.actions, ...extraActions };
export const roleReducer = slice.reducer;

// implementation
function createInitialState() {
    return {
        roles: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1/roles`;

    return {
        getRoles: getRoles()
    };    

    function getRoles() {
        return createAsyncThunk(
            `${name}/getRoles`,
            async () => await axios.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    return {
        ...getRoles()
    };

    function getRoles() {
        var { pending, fulfilled, rejected } = extraActions.getRoles;
        return {
            [pending]: (state) => {
                state.roles = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.roles = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.roles = { error: action.error };
            }
        };
    }
}
