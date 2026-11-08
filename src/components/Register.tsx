import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // აქ დაამატებ რეგისტრაციის ლოგიკას
        alert(`წარმატებული რეგისტრაცია: ${name}`);
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center py-16">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-8 rounded-3xl shadow-2xl shadow-violet-500/10 w-full max-w-md relative overflow-hidden">
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <h2 className="text-2xl font-black text-white mb-2 text-center">რეგისტრაცია</h2>
                <p className="text-slate-400 text-xs text-center mb-6">შექმენით ახალი ანგარიში მარტივად</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">სახელი</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="თქვენი სახელი"
                            className="w-full bg-slate-800/80 border border-slate-700 text-white py-2.5 px-3.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">ელ-ფოსტა</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full bg-slate-800/80 border border-slate-700 text-white py-2.5 px-3.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">პაროლი</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-800/80 border border-slate-700 text-white py-2.5 px-3.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-violet-600/30 transition-all active:scale-[0.98] mt-2"
                    >
                        რეგისტრაცია
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400 mt-6">
                    უკვე გაქვთ ანგარიში?{" "}
                    <Link to="/login" className="text-violet-400 font-bold hover:underline">
                        შესვლა
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;