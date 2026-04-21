export function jobReducer(state, action) {
       console.log(state);
    switch(action.type){
        case "ADD_JOB":
            return {
                ...state, jobs: [action.payload, ...state.jobs]
            }
        
        case "DELETE_JOB":
            return {
                ...state, jobs: state.jobs.filter(job => job.id !== action.payload)
            }

        case "EDIT_JOB": 
            return {
                ...state, jobs: state.jobs.map(job => job.id === action.payload.id ? action.payload : job)
            };
        
        default:
            return state;
    }

  
}