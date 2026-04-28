import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || "Unable to create account");
            }

            navigate('/login')
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-20 flex justify-center items-center">
        <form onSubmit={handleSubmit} autoComplete="off" className="w-full max-w-sm rounded-md border border-zinc-200 bg-white p-5 shadow-sm flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-semibold text-zinc-950">Create account</h1>
                <p className="text-sm text-zinc-500">Start tracking every role in one place.</p>
            </div>

            {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
                Name
                <input type="text" name="name" value={formData.name} placeholder="Your name" onChange={handleChange} required className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"/>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
                Email
                <input type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} required className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"/>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
                Password
                <input type="password" name="password" value={formData.password} placeholder="Create password" onChange={handleChange} required className="rounded-md border border-zinc-300 px-3 py-2 outline-none transition focus:border-pale-sky-500"/>
            </label>

            <button disabled={loading} className="rounded-md bg-pale-sky-500 px-4 py-2 font-medium text-white transition hover:bg-pale-sky-600 disabled:opacity-60">
                {loading ? "Creating..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-zinc-500">
                Already have an account? <Link to="/login" className="font-medium text-pale-sky-600">Log in</Link>
            </p>
        </form>
    </div>
  )
}

export default SignUp
