import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        savedJobs: [],
        savedJobIds: []
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
            // Reset saved jobs when user changes
            if (!action.payload) {
                state.savedJobs = [];
                state.savedJobIds = [];
            }
        },
        setSavedJobs:(state, action) => {
            state.savedJobs = action.payload || [];
            state.savedJobIds = (action.payload || []).map(job => job._id);
        },
        addSavedJob:(state, action) => {
            if (action.payload && action.payload._id) {
                state.savedJobs.push(action.payload);
                state.savedJobIds.push(action.payload._id);
            }
        },
        removeSavedJob:(state, action) => {
            state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload);
            state.savedJobIds = state.savedJobIds.filter(id => id !== action.payload);
        }
    }
});
export const {setLoading, setUser, setSavedJobs, addSavedJob, removeSavedJob} = authSlice.actions;
export default authSlice.reducer;