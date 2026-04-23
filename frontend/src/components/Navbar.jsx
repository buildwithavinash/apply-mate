import Container from "./Container"

const Navbar = () => {
  return (
    <header className="py-2 border-b border-b-zinc-200 shadow-xs fixed top-0 right-0 left-0 backdrop-blur-lg">
        <Container>
            <div className="flex justify-between">

        <div className="text-2xl font-medium text-pale-sky-500">
            ApplyMate
        </div>
        
        <div className="flex gap-2">
            <button>D</button>
            <button>H</button>
        </div>
            </div>
        </Container>
    </header>
  )
}

export default Navbar