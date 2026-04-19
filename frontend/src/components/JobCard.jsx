import { useJobs } from "../hooks/useJobs"
import { formatDate } from "../utils/formatDate"


const JobCard = ({job}) => {

    const {dispatch} = useJobs()
    function handleDelete(id){
        dispatch({
            type: 'DELETE_JOB',
            payload: id
        })
    }

  return (
    <div className="border border-zinc-300 px-2 py-3 rounded-md flex flex-col gap-2">
        <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">{job.companyName}</h2>
            <h3 className="text-slate-800 mb-2">{job.jobRole}</h3>
            <p className="border rounded-full w-fit px-4 py-0.5 text-xs">{job.status}</p>
            <p className="text-xs">{formatDate(job.date)}</p>
        </div>  
        <div className="flex items-center w-full gap-1 mt-auto">
            <button className="border text-sky-500 font-medium bg-sky-100 border-sky-400 rounded-lg px-2 py-1 cursor-pointer flex-1">Edit</button>
            <button onClick={()=>handleDelete(job.id)} className="border border-red-400 bg-red-100 text-red-500 font-medium rounded-lg px-2 py-1 cursor-pointer flex-1">Delete</button>
        </div>
    </div>
  )
}

export default JobCard