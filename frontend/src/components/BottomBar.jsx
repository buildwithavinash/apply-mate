import { useNavigate } from "react-router-dom"

const BottomBar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 right-0 left-0 bg-sky-700 h-12 flex justify-center items-center">
        <div className="w-full flex justify-around items-center">
            <button onClick={()=> navigate('/dashboard')}>Dashboard</button>
            <button onClick={()=> navigate('/createjob')}>Create</button>
            <button onClick={()=> navigate('/jobsmenu')}>Jobs</button>
        </div>
    </div>
  )
}

export default BottomBar