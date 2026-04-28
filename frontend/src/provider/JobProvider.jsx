import { useEffect, useReducer, useState } from "react";
import { jobReducer } from "../reducers/jobReducer";
import { JobContext } from "../context/JobContext";
import { useAuth } from "../hooks/useAuth";
import { API_URL, authHeaders } from "../utils/api";

const initialState = {
    jobs: []
}

// context provider component
export const JobProvider = ({children}) => {
    const [state, dispatch] = useReducer(jobReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const { token, isAuthenticated } = useAuth();
    
    // Fetch jobs from backend on component mount
    useEffect(()=> {
        if(!isAuthenticated){
            dispatch({
                type: "SET_JOBS",
                payload: []
            });
            return;
        }

        const fetchJobs = async ()=> {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/api/jobs`, {
                    headers: authHeaders(token)
                });

                if(!res.ok){
                    throw new Error("Failed to fetch jobs");
                }

                const data = await res.json();

                dispatch({
                    type: "SET_JOBS",
                    payload: data
                })
            }catch(err){
                setError(err);
                console.log("Error fetching jobs:", err);
            }finally{
                setLoading(false)
            }
        }
        fetchJobs();
    }, [isAuthenticated, token])
    
    return (
        <JobContext.Provider value={{jobs: state.jobs, dispatch, loading, error}}>
            {children}
        </JobContext.Provider>
    )
}
