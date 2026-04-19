import { useState } from "react";
import Container from "../components/Container";

const AddJob = () => {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    companyName: "",
    jobRole: "",
    status: "applied",
    date: getTodayDate(),
    jobLink: "",
    notes: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function createJob(e){
    e.preventDefault();
    if(!formData.companyName.trim() || !formData.jobRole.trim()){
        alert("Company name and role are required");
        return;
    }
    console.log(formData);

    setFormData({
  companyName: "",
  jobRole: "",
  status: "applied",
  date: getTodayDate(),
  jobLink: "",
  notes: "",
});
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
          <form onSubmit={createJob}  className="border border-slate-200 p-2 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <label htmlFor="companyName" className="text-lg">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
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
                value={formData.jobRole}
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
                value={formData.status}
                onChange={handleChange}
              >
                <option value="applied">
                  Applied
                </option>
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
                value={formData.date}
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
                value={formData.jobLink}
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
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-sky-400 text-slate-100 font-medium rounded-md"
            >
              Add
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default AddJob;
