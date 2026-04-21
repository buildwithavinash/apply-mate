import { useJobs } from "../hooks/useJobs";
import { formatDate } from "../utils/formatDate";
import { useState } from "react";
import ModalEdit from "./ModalEdit";

const JobCard = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const { dispatch } = useJobs();

  function handleDelete(id) {
    dispatch({
      type: "DELETE_JOB",
      payload: id,
    });
  }

  function handleEdit() {
    setIsOpen(true);
    setEditingJob(job);
  }

  const getStatusStyles = (status) => {
  const styles = {
    Applied: 'bg-blue-100 text-blue-700 border-blue-300',
    Interviewing: 'bg-orange-100 text-orange-700 border-orange-300',
    Rejected: 'bg-red-100 text-red-700 border-red-300',
    Offer: 'bg-green-100 text-green-700 border-green-300',
  };
  return styles[status] || styles.Applied;
};


  return (
    <>
      <div className="relative border border-zinc-200 px-2 py-3 rounded-md flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <p className={`absolute top-3 right-2 rounded-full w-fit px-4 py-0.5 text-xs ${getStatusStyles(job.status)}`}>
            {job.status}
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
            onClick={() => handleDelete(job.id)}
            className="border border-red-400 bg-red-100 text-red-500 font-medium rounded-lg px-2 py-1 cursor-pointer flex-1 hover:opacity-70 transition-all duration-200"
          >
            Delete
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
