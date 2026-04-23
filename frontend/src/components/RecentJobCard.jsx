import { formatDate } from "../utils/formatDate"

const RecentJobCard = ({job}) => {

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
    <div className="border border-zinc-300 bg-pale-sky-50/10 hover:shadow transition-all duration-200 cursor-pointer px-2 py-1.5 rounded-xl flex justify-between">
                <div className="flex flex-col items-start">
                  <h2 className="font-medium text-lg">
                {job.companyName}
                  </h2>

                  <p className="text-slate-800 -mt-0.5">
                    {job.jobRole}
                  </p>

                  <div className="text-xs">
                    {formatDate(job.date)}
                  </div>
                </div>


                <div className="flex items-start">
                  <p className={`border rounded-full px-3 py-0.5 text-xs ${getStatusStyles(job.status)}`}>
                  {capitalizeStatus(job.status)}
                  </p>
                </div>
              </div>
  )
}

export default RecentJobCard