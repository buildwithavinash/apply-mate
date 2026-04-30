import Container from "../components/Container"
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import Skeleton from "../components/Skeleton";
import { useJobs } from "../hooks/useJobs";
import { useState } from "react";

const JobsMenu = () => {
    const [query, setQuery] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all');
    const {jobs, loading} = useJobs();

    const filteredJobs = jobs.filter(job => {

        if(currentFilter === 'all'){
            return true;
        }

        return job.status === currentFilter
}).filter(job => job.companyName.toLowerCase().includes(query.toLowerCase()));

    const hasFilters = query.trim() || currentFilter !== "all";

  return (
    <section className="min-h-screen bg-white py-16">
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

                {!loading && (
                <div className="grid grid-cols-1 gap-8 mt-6">
                    {/* jobs card */}

                    {filteredJobs.length === 0 ? (
                        <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-4 py-10 text-center">
                            <p className="text-lg font-medium text-zinc-800">
                                {hasFilters ? "No matching applications" : "No jobs yet"}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                {hasFilters ? "Try changing the search or status filter." : "Create your first job application to start tracking."}
                            </p>
                        </div>
                    ) : (
                         filteredJobs.map(job => {
                        return <JobCard key={job._id} job={job}/>
                    })
                    )}
                   
                </div>
                )}

                
            </div>
        </Container>
    </section>
  )
}

export default JobsMenu
