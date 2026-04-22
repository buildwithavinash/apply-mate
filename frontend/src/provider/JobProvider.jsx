import { useEffect, useReducer } from "react";
import { jobReducer } from "../reducers/jobReducer";
import { JobContext } from "../context/JobContext";

const initialState = {
    jobs: []
}

// context provider component
export const JobProvider = ({children}) => {
    const [state, dispatch] = useReducer(jobReducer, initialState);
    
    // Fetch jobs from backend on component mount
    useEffect(()=> {
        const fetchJobs = async ()=> {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
                const data = await res.json();

                dispatch({
                    type: "SET_JOBS",
                    payload: data
                })
            }catch(err){
                console.log("Error fetching jobs:", err);
            }
        }
        fetchJobs();
    }, [])
    
    return (
        <JobContext.Provider value={{jobs: state.jobs, dispatch}}>
            {children}
        </JobContext.Provider>
    )
}