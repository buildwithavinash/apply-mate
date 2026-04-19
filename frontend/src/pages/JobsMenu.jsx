import Container from "../components/Container"
import JobCard from "../components/JobCard";
import { useJobs } from "../hooks/useJobs"

const JobsMenu = () => {
    const {jobs} = useJobs();

  return (
    <section className="min-h-screen bg-slate-100 py-8">
        <Container>
            <div>
                <h2 className="text-center text-3xl">Jobs</h2>

                <div className="grid grid-cols-1 gap-8 mt-4">
                    {/* jobs card */}
                    {jobs.map(job => {
                        return <JobCard key={job.id} job={job}/>
                    })}
                </div>
            </div>
        </Container>
    </section>
  )
}

export default JobsMenu