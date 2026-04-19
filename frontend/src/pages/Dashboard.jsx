import Container from "../components/Container"
import { useJobs } from "../hooks/useJobs"

const Dashboard = () => {
  const {jobs} = useJobs();

  return (
    <section className="min-h-screen bg-slate-100 py-8">
      <Container>
        <div>

          {/* stats */}
          <div className="flex rounded-xl justify-between gap-2 p-2">
            {/* applied */}
            <div className="border border-zinc-300 p-1 rounded-md flex flex-col gap-2 items-center justify-center">
              <p className="">Applied</p>
              <p className="text-2xl">
              {jobs.filter(job => job.status === 'Applied').length}
              </p>
            </div>

            {/* interview */}
            <div className="border border-zinc-300 p-1.5 rounded-md flex flex-col gap-2 items-center justify-center">
              <p className="">Interview</p>
              <p className="text-2xl">
              {jobs.filter(job => job.status === 'Interviewing').length}
              </p>
            </div>

            {/* reject */}
            <div className="border border-zinc-300 p-1.5 rounded-md flex flex-col gap-2 items-center justify-center">
              <p className="">Rejected</p>
              <p className="text-2xl">
              {jobs.filter(job => job.status === 'Rejected').length}
              </p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}

export default Dashboard