export function jobReducer(state, action) {
    switch(action.type){
        case "ADD_JOB":
            return [...state, action.payload]
        
        case "DELETE_JOB":
            return state.filter(job => job.id !== action.payload)
        
        default:
            return state;
    }
}