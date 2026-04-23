
const Skeleton = () => {
  return (
    <div className="animate-pulse border rounded-md border-zinc-200">
        <div className="relative px-2 py-3 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className={`absolute top-3 right-2 rounded-full w-5 h-2 px-4 py-0.5 text-xs bg-slate-400`}>
                    
                  </div>
                <div className="flex flex-col">
                  <div className="bg-slate-400 mb-4 h-12 w-12 text-2xl flex justify-center items-center font-semibold rounded-md">
                  </div>
                  <div className="w-20 h-6 mb-2 bg-slate-400"></div>
                  <div className="w-12 h-4 mb-1 bg-slate-400"></div>
                  <div className="w-8 h-2 bg-slate-400"></div>
                </div>
        
                <hr className="my-1 text-zinc-300"/>
                <div className="flex items-center w-full gap-1 mt-auto">
                  
                  <div className="bg-slate-400 w-30 h-6 flex-1"></div>

                  <div className="bg-slate-400 w-30 h-6 flex-1"></div>
                </div>
              </div>
    </div>
  )
}

export default Skeleton