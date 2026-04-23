import { useNavigate } from "react-router-dom";
import Container from "../components/Container"
import { useJobs } from "../hooks/useJobs"
import RecentJobCard from "../components/RecentJobCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const {jobs} = useJobs();
  const appliedLength = jobs.filter(job => job.status === 'applied').length;
  const interviewLength = jobs.filter(job => job.status === 'interviewing').length;
  const offerLength = jobs.filter(job => job.status === 'offer').length;
  const rejectedLength = jobs.filter(job => job.status === 'rejected').length;

  const getJobPercentage = (length) => {
    if(jobs.length === 0){
      return `${0}%`
    }
      return `(${Math.floor((length / jobs.length) * 100)}%)`
  }

  return (
    <section className="min-h-screen bg-white pt-8 pb-16">
      <Container>
        <div>

          {/* total applications */}
          <div className="flex justify-center bg-gray-50 items-center border border-zinc-300 rounded-md px-2 py-1">
            <h3 className="text-xl text-pale-sky-600 font-medium">Total Applications : {jobs.length}</h3>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 rounded-xl gap-2 p-2 mt-2">
            {/* applied */}
            <div className="border border-zinc-300 bg-gray-50 p-1 rounded-md flex flex-col gap-2 items-center justify-center">
              <p className="font-semibold text-pale-sky-700">Applied</p>
              <p className="text-3xl font-bold text-pale-sky-700">
              {appliedLength}
              </p>
            </div>

            {/* interview */}
            <div className="border border-zinc-300 bg-gray-50 p-1.5 rounded-md flex flex-col gap-2 items-center justify-center">
              <p className="font-semibold text-orange-400">Interview</p>
              <div className="text-2xl flex  gap-1 items-baseline">
                <p className="text-3xl font-bold text-orange-400">
                  {interviewLength}
                </p>

                <p className="text-xs text-orange-400">
               {getJobPercentage(interviewLength)}
                </p>
              </div>
            </div>

            {/* reject */}
            <div className="border border-zinc-300 p-1.5 bg-gray-50 rounded-md flex flex-col gap-2 items-center justify-center">
              <p className="text-rose-500 font-semibold">Rejected</p>
              <div className="text-2xl flex  gap-1 items-baseline">
                <p className="text-3xl font-bold text-rose-500">
                  {rejectedLength}
                </p>

                <p className="text-xs text-rose-500">
              {getJobPercentage(rejectedLength)}
                </p>
              </div>
            </div>

            {/* offer */}
            <div className="border border-zinc-300 p-1.5 bg-gray-50 rounded-md flex flex-col gap-2 items-center justify-center">
              <p className="font-semibold text-emerald-600">Offer</p>
              <div className="text-2xl flex  gap-1 items-baseline">
                <p className="text-3xl font-bold text-emerald-500">
                  {offerLength}
                </p>

                <p className="text-xs text-emerald-500">
               {getJobPercentage(offerLength)}
                </p>
              </div>
            </div>

          </div>


          {/* recent */}
          <div className="border border-zinc-300 bg-white rounded-md px-2 py-1 text-center mt-4">

        <div className="flex justify-between items-start mt-2">
            <h3 className="text-zinc-900 font-medium">Recent Applications</h3>
            <button onClick={()=> navigate('/createjob')} className="bg-pale-sky-500 px-3 py-1 rounded-md text-sm font-medium text-pale-sky-50 cursor-pointer hover:opacity-90 transition-all duration-200">Add</button>
        </div>

<hr className="my-4 text-zinc-300 font-bold" />

            <div className="grid grid-cols-1 gap-4 mt-4 py-4"> 

              {jobs.length === 0 ? (
                        <p className="text-center text-slate-500">No jobs yet. <br /> Create jobs to start tracking.</p>
                    ) : (
                         jobs.reverse().slice(0, 5).map(job => (
              <RecentJobCard key={job.id} job={job}/>
            ))
                    )}
                   
           
            </div>

            {jobs.length !== 0 && (
                <div>
              <button onClick={()=> navigate('/jobsmenu')} className="bg-pale-sky-500 px-3 py-1 rounded-md font-medium text-pale-sky-50 cursor-pointer hover:opacity-90 mt-4 transition-all duration-200 mb-2">Show All Applications</button>
            </div>
            )}
            
          </div>
        </div>
      </Container>      
    </section>
  )
}

export default Dashboard