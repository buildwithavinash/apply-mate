import { useJobs } from "../hooks/useJobs";
import { formatDate } from "../utils/formatDate";
import { useState } from "react";
import ModalEdit from "./ModalEdit";

const JobCard = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useJobs();

  async function handleDelete(id) {
    if(!window.confirm("Are you sure you want to delete this job?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE'
      });

      if(!res.ok) {
        throw new Error('Failed to delete job');
      }

      dispatch({
        type: "DELETE_JOB",
        payload: id,
      });

      alert("Job deleted successfully!");
    } catch(err) {
      console.log("Error deleting job:", err);
      alert("Failed to delete job: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit() {
    setIsOpen(true);
    setEditingJob(job);
  }

  const getStatusStyles = (status) => {
  const styles = {
    applied: 'bg-blue-100 text-blue-700 border-blue-300',
    interviewing: 'bg-orange-100 text-orange-700 border-orange-300',
    rejected: 'bg-red-100 text-red-700 border-red-300',
    offer: 'bg-green-100 text-green-700 border-green-300',
  };
  return styles[status] || styles.applied;
};

const capitalizeStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

  return (
    <>
      <div className="relative border border-zinc-200 px-2 py-3 rounded-md flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <p className={`absolute top-3 right-2 rounded-full w-fit px-4 py-0.5 text-xs ${getStatusStyles(job.status)}`}>
            {capitalizeStatus(job.status)}
          </p>
        <div className="flex flex-col">
          <div className="bg-pale-sky-100 h-12 w-12 text-2xl flex justify-center items-center font-semibold rounded-md">
            {job.companyName.at(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-semibold mt-1">{job.companyName}</h2>
          <h3 className="text-slate-800 mb-2 -mt-1">{job.jobRole}</h3>
          <p className="text-xs">{formatDate(job.date)}</p>
        </div>

        <hr className="my-1 text-zinc-300"/>
        <div className="flex items-center w-full gap-1 mt-auto">
          <button
            onClick={handleEdit}
            className="border text-sky-500 font-medium bg-sky-100 border-sky-400 rounded-lg px-2 py-1 cursor-pointer flex-1 hover:opacity-70 transition-all duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(job._id)}
            disabled={loading}
            className="border border-red-400 bg-red-100 text-red-500 font-medium rounded-lg px-2 py-1 cursor-pointer flex-1 hover:opacity-70 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "..." : "Delete"}
          </button>
        </div>
      </div>

      {isOpen && (
        <ModalEdit
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setEditingJob={setEditingJob}
          editingJob={editingJob}
        />
      )}
    </>
  );
};

export default JobCard;
