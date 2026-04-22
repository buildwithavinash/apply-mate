export function jobReducer(state, action) {
    switch(action.type){
        case "ADD_JOB":
            return {
                ...state, jobs: [action.payload, ...state.jobs]
            }
        
        case "DELETE_JOB":
            return {
                ...state, jobs: state.jobs.filter(job => job._id !== action.payload)
            }

        case "EDIT_JOB": 
            return {
                ...state, jobs: state.jobs.map(job => job._id === action.payload._id ? action.payload : job)
            };
        
        case "SET_JOBS":
            return {
                ...state,
                jobs: action.payload
            }
        
        default:
            return state;
    }
}