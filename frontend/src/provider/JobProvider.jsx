import { useEffect, useReducer } from "react";
import { jobReducer } from "../reducers/jobReducer";
import { JobContext } from "../context/JobContext";


const initialState = {
    jobs: []
}
// context provider component
export const JobProvider = ({children}) => {
    const [state, dispatch] = useReducer(jobReducer, initialState, (initialState)=> {
        const storedJobs = localStorage.getItem('jobs');
        return storedJobs ? {jobs: JSON.parse(storedJobs)} : initialState
    });

    console.log(state);

    useEffect(()=> {
        localStorage.setItem('jobs', JSON.stringify(state.jobs))
    }, [state.jobs])

    return (
        <JobContext.Provider value={{jobs: state.jobs, dispatch}}>
            {children}
        </JobContext.Provider>
    )
}