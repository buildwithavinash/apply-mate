import { Route, Routes } from "react-router-dom"
import BottomBar from "./components/BottomBar"
import JobsMenu from "./pages/JobsMenu"
import AddJob from "./pages/AddJob"

const App = () => {
  return (
    <>
    <BottomBar />
    <Routes>
      <Route path="/" element={<JobsMenu/>}/>
      <Route path="/createjob" element={<AddJob/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App