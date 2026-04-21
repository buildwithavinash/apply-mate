import { useNavigate } from "react-router-dom"
import { MdAddBox, MdDashboard, MdWork } from "react-icons/md";

const BottomBar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-100 bottom-0 right-0 left-0 bg-pale-sky-500/20 backdrop-blur-xl h-12 flex justify-center items-center">
        <div className="w-full flex justify-around items-center">
            <button onClick={()=> navigate('/dashboard')} className="text-pale-sky-600 text-2xl cursor-pointer"><MdDashboard/></button>
            <button onClick={()=> navigate('/createjob')} className="text-pale-sky-600 text-2xl cursor-pointer"><MdAddBox/></button>
            <button onClick={()=> navigate('/jobsmenu')} className="text-pale-sky-600 text-2xl cursor-pointer"><MdWork/></button>
        </div>
    </div>
  )
}

export default BottomBar