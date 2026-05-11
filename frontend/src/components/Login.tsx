import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, MonitorSmartphone } from "lucide-react";
import { api } from "../lib/api";
import { getDefaultPathForRole } from "../lib/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("admin@store.com");
  const [password, setPassword] = useState<string>("123456");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate(getDefaultPathForRole(response.data.user?.role), { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden flex-col justify-between border-r border-slate-200 bg-slate-950 p-10 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-slate-950">
              <MonitorSmartphone size={23} />
            </div>
            <div>
              <div className="text-lg font-semibold">POSify</div>
              <div className="text-sm text-slate-400">Retail operations platform</div>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-300">Point of sale</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal">
              Run sales, inventory, and orders from one clean workspace.
            </h1>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Live checkout", "Stock control", "Order history"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-slate-500">Secure staff access for store teams.</div>
        </section>

        <section className="flex items-center justify-center px-5 py-10">
          <form onSubmit={handleLogin} className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Sign in</h2>
              <p className="mt-1 text-sm text-slate-500">Use your staff account to continue.</p>
            </div>

            <div className="mt-7 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:border-slate-950">
                  <Mail size={17} className="text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:border-slate-950">
                  <LockKeyhole size={17} className="text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </label>
            </div>

            {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-10 w-full rounded-lg bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
