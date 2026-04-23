

const Filters = ({currentFilter, setCurrentFilter, query, setQuery}) => {

  return (
    <div className="mt-4">
        <div className="flex border gap-1 border-zinc-300 rounded-lg overflow-hidden w-full">
            <div className="flex-1 w-full">
                <input type="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name" className="px-2 py-1 outline-none"/>
            </div>

            <div className="flex-1 flex items-center w-full bg-pale-sky-50">
                <select value={currentFilter} onChange={(e)=> setCurrentFilter(e.target.value)} className="w-full px-2 outline-none">
                    <option value="all">All</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default Filters