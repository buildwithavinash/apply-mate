import { useJobs } from "../hooks/useJobs";
import { useState } from "react";

const ModalEdit = ({isOpen, setIsOpen, setEditingJob, editingJob}) => {

    const {dispatch} = useJobs();
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
    const { name, value } = e.target;
    setEditingJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

    async function updateJob(e){
        e.preventDefault();
        
        if(!editingJob.companyName.trim() || !editingJob.jobRole.trim()){
            alert("Company name and role are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${editingJob._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editingJob)
            });

            if(!res.ok) {
                throw new Error('Failed to update job');
            }

            const updatedJob = await res.json();

            dispatch({
                type: 'EDIT_JOB',
                payload: updatedJob
            })

            alert("Job updated successfully!");
            setIsOpen(false);
            setEditingJob(null);
        } catch(err) {
            console.log("Error updating job:", err);
            alert("Failed to update job: " + err.message);
        } finally {
            setLoading(false);
        }
    }
    
  return (
    <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xl flex items-center justify-center">

    
    
    <div>
        <form onSubmit={updateJob}  className="relative border border-slate-200 bg-slate-200 rounded-xl px-4 py-6 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <label htmlFor="companyName" className="text-lg">
                Company Name
              </label>
              <input
                type="text"
                value={editingJob.companyName}
                onChange={handleChange}
                name="companyName"
                id="companyName"
                placeholder="Enter Company Name"
                className="border border-slate-300 px-2 py-1"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="jobRole" className="text-lg">
                Job Role
              </label>
              <input
                type="text"
                value={editingJob.jobRole}
                onChange={handleChange}
                name="jobRole"
                id="jobRole"
                placeholder="Enter role"
                className="border border-slate-300 px-2 py-1"
              />
            </div>

            <div className="flex gap-0.5">
              <label htmlFor="status" className="text-lg">
                Status:{" "}
              </label>
              <select
                name="status"
                id="status"
                value={editingJob.status}
                onChange={handleChange}
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </div>

            <div className="flex gap-0.5">
              <label htmlFor="date" className="text-lg">
                Date Applied:{" "}
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={editingJob.date}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-0.5">
              <label htmlFor="jobLink" className="text-lg">
                Job Link:{" "}
              </label>
              <input
                type="url"
                name="jobLink"
                id="jobLink"
                className="border"
                value={editingJob.jobLink}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="notes" className="text-lg">
                Notes (optional):{" "}
              </label>
              <textarea
                name="notes"
                id="notes"
                className="border"
                value={editingJob.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-4 cursor-pointer py-2 bg-sky-600 text-slate-100 font-medium rounded-md hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button type="button" onClick={()=>{setIsOpen(false); setEditingJob(null)}} className="absolute text-sm top-2 right-2 border border-red-500 px-3 py-0.5 rounded-md bg-red-200 text-red-500 cursor-pointer hover:opacity-80">Close</button>
          </form>
    </div>

    </div>
  )
}

export default ModalEdit