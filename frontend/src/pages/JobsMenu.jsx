import Container from "../components/Container"
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import { useJobs } from "../hooks/useJobs";
import { useState } from "react";

const JobsMenu = () => {
    const [query, setQuery] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all');
    const {jobs} = useJobs();

    const filteredJobs = jobs.filter(job => {

        if(currentFilter === 'all'){
            return true;
        }

        return job.status === currentFilter
}).filter(job => job.companyName.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="min-h-screen bg-white py-8">
        <Container>
            <div>
                <h2 className="text-center text-3xl font-medium">Your Applications</h2>

                <Filters query={query} setQuery={setQuery} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}/>

                <div className="grid grid-cols-1 gap-8 mt-6">
                    {/* jobs card */}
                    {filteredJobs.map(job => {
                        return <JobCard key={job.id} job={job}/>
                    })}
                </div>
            </div>
        </Container>
    </section>
  )
}

export default JobsMenu