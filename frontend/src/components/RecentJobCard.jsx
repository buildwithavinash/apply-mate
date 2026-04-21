import { formatDate } from "../utils/formatDate"

const RecentJobCard = ({job}) => {
  return (
    <div className="border border-zinc-300 bg-pale-sky-50 px-2 py-1.5 rounded-xl flex justify-between">
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
                  <p className="border rounded-full px-3 py-0.5 text-xs">
                  {job.status}
                  </p>
                </div>
              </div>
  )
}

export default RecentJobCard