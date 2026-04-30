import { useJobs } from "../hooks/useJobs";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { API_URL, authHeaders } from "../utils/api";

const ModalEdit = ({ setIsOpen, setEditingJob, editingJob}) => {

    const {dispatch} = useJobs();
    const { token } = useAuth();
    const { showToast } = useToast();
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
            showToast("Company name and role are required", "error");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/jobs/${editingJob._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeaders(token)
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

            showToast("Job updated successfully", "success");
            setIsOpen(false);
            setEditingJob(null);
        } catch(err) {
            console.log("Error updating job:", err);
            showToast("Failed to update job: " + err.message, "error");
        } finally {
            setLoading(false);
        }
    }
    
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-sm">


    <div className="w-full max-w-lg">
        <form onSubmit={updateJob}  className="relative max-h-[calc(100vh-3rem)] overflow-y-auto rounded-md border border-zinc-200 bg-white p-5 shadow-xl flex flex-col gap-4">
            <div className="pr-20">
              <h2 className="text-xl font-semibold text-zinc-950">Edit application</h2>
              <p className="text-sm text-zinc-500">Update the details for this role.</p>
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="editCompanyName" className="text-sm font-medium text-zinc-700">
                Company Name
              </label>
              <input
                type="text"
                value={editingJob.companyName}
                onChange={handleChange}
                name="companyName"
                id="editCompanyName"
                placeholder="Enter Company Name"
                required
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="editJobRole" className="text-sm font-medium text-zinc-700">
                Job Role
              </label>
              <input
                type="text"
                value={editingJob.jobRole}
                onChange={handleChange}
                name="jobRole"
                id="editJobRole"
                placeholder="Enter role"
                required
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="editStatus" className="text-sm font-medium text-zinc-700">
                Status
              </label>
              <select
                name="status"
                id="editStatus"
                value={editingJob.status}
                onChange={handleChange}
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="editDate" className="text-sm font-medium text-zinc-700">
                Date Applied
              </label>
              <input
                type="date"
                name="date"
                id="editDate"
                value={editingJob.date}
                onChange={handleChange}
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="editJobLink" className="text-sm font-medium text-zinc-700">
                Job Link
              </label>
              <input
                type="url"
                name="jobLink"
                id="editJobLink"
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"
                value={editingJob.jobLink || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="editNotes" className="text-sm font-medium text-zinc-700">
                Notes
              </label>
              <textarea
                name="notes"
                id="editNotes"
                rows="4"
                className="resize-none rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"
                value={editingJob.notes || ""}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={()=>{setIsOpen(false); setEditingJob(null)}} disabled={loading} className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60">Cancel</button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-pale-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pale-sky-600 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>

            <button type="button" onClick={()=>{setIsOpen(false); setEditingJob(null)}} disabled={loading} className="absolute right-4 top-4 rounded-md border border-zinc-300 px-3 py-1 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-60">Close</button>
          </form>
    </div>

    </div>
  )
}

export default ModalEdit
