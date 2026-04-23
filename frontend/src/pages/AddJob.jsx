import { useState } from "react";
import Container from "../components/Container";
import { useJobs } from "../hooks/useJobs";

const AddJob = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    status: "applied",
    date: getTodayDate(),
    jobLink: "",
    notes: "",
  });
  
  const [loading, setLoading] = useState(false);
  const {dispatch} = useJobs()

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function createJob(e){
    e.preventDefault();
    if(!formData.companyName.trim() || !formData.jobRole.trim()){
        alert("Company name and role are required");
        return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if(!res.ok) {
        throw new Error('Failed to add job');
      }

      const newJob = await res.json();
      
      dispatch({
        type: 'ADD_JOB',
        payload: newJob
      });

      // Reset form
      setFormData({
        companyName: "",
        jobRole: "",
        status: "applied",
        date: getTodayDate(),
        jobLink: "",
        notes: "",
      });
      
      alert("Job added successfully!");
    } catch(err) {
      console.log("Error adding job:", err);
      alert("Failed to add job: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  return (
    <section className="min-h-screen py-16">
      <Container>
        <div>
          <form onSubmit={createJob}  className="border border-slate-200 rounded-md p-2 flex flex-col gap-6">
            <div className="flex flex-col gap-0.5">
              <label htmlFor="companyName" className="text-lg text-pale-sky-500 font-medium">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                name="companyName"
                id="companyName"
                placeholder="Enter Company Name"
                className="border border-zinc-300 outline-none focus:border-pale-sky-300 rounded-md px-2 py-1 transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="jobRole" className="text-lg text-pale-sky-500 font-medium">
                Job Role
              </label>
              <input
                type="text"
                value={formData.jobRole}
                onChange={handleChange}
                name="jobRole"
                id="jobRole"
                placeholder="Enter role"
                className="border border-zinc-300 outline-none focus:border-pale-sky-300 rounded-md px-2 py-1 transition-all duration-200"
              />
            </div>

            <div className="flex gap-2">
              <label htmlFor="status" className="text-lg text-pale-sky-500 font-medium">
                Status:{" "}
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-zinc-300 outline-none focus:border-pale-sky-300 rounded-md px-2 py-1 transition-all duration-200 w-full"
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </div>

            <div className="flex gap-1">
              <label htmlFor="date" className="text-lg text-nowrap text-pale-sky-500 font-medium">
                Applied On: 
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-zinc-300 outline-none focus:border-pale-sky-300 rounded-md px-2 py-1 transition-all duration-200 flex-1"
              />
            </div>

            <div className="flex gap-1">
              <label htmlFor="jobLink" className="text-lg text-nowrap text-pale-sky-500 font-medium">
                Job Link:{" "}
              </label>
              <input
                type="url"
                name="jobLink"
                id="jobLink"
                className="border border-zinc-300 outline-none focus:border-pale-sky-300 rounded-md px-2 py-1 transition-all duration-200 w-full"
                value={formData.jobLink}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label htmlFor="notes" className="text-lg text-pale-sky-500 font-medium">
                Notes (optional):{" "}
              </label>
              <textarea
                name="notes"
                id="notes"
                className="border resize-none border-zinc-300 outline-none focus:border-pale-sky-300 rounded-md px-2 py-1 transition-all duration-200 w-full"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-pale-sky-500 px-3 py-1 rounded-md font-medium text-pale-sky-50 cursor-pointer hover:opacity-90 mb-2 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default AddJob;
