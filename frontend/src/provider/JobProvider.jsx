import { useEffect, useReducer, useState } from "react";
import { jobReducer } from "../reducers/jobReducer";
import { JobContext } from "../context/JobContext";

const initialState = {
    jobs: []
}

// context provider component
export const JobProvider = ({children}) => {
    const [state, dispatch] = useReducer(jobReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    
    // Fetch jobs from backend on component mount
    useEffect(()=> {
        const fetchJobs = async ()=> {
            try {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
                const data = await res.json();

                dispatch({
                    type: "SET_JOBS",
                    payload: data
                })

                setLoading(false)
            }catch(err){
                setError(err);
                console.log("Error fetching jobs:", error);
            }finally{
                setError(null)
            }
        }
        fetchJobs();
    }, [error])
    
    return (
        <JobContext.Provider value={{jobs: state.jobs, dispatch, loading}}>
            {children}
        </JobContext.Provider>
    )
}