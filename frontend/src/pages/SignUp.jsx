import { useState } from "react"

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();
        console.log(data);
    }
  return (
    <div className="py-16 flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-2">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border"/>
            <input type="text" name="email" placeholder="Email" onChange={handleChange} className="border"/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border"/>
            <button>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp