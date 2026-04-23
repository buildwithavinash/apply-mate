import Container from "../components/Container"
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import Skeleton from "../components/Skeleton";
import { useJobs } from "../hooks/useJobs";
import { useState } from "react";

const JobsMenu = () => {
    const [query, setQuery] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all');
    const {jobs} = useJobs();
    const {loading} = useJobs();

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

{loading && (
    <div className="grid grid-cols-1 gap-8 mt-6">
        {
 [1, 2, 3, 4, 5].map((_, index) => {
      return  <Skeleton key={index} />
    })
        }
    </div>
   
)}

                <div className="grid grid-cols-1 gap-8 mt-6">
                    {/* jobs card */}

                    {filteredJobs.length === 0 ? (
                        <p className="text-center text-slate-500">No jobs yet. <br /> Create jobs to start tracking.</p>
                    ) : (
                         filteredJobs.map(job => {
                        return <JobCard key={job.id} job={job}/>
                    })
                    )}
                   
                </div>

                
            </div>
        </Container>
    </section>
  )
}

export default JobsMenu