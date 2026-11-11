
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoEmail = "admin@projecthub.com";
  const demoPassword = "Project123";

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (email !== demoEmail || password !== demoPassword) {
      setError("Invalid demo credentials. Please try again.");
      return;
    }

    setLoading(true);

    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <FolderKanban size={28} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your Project Manager account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder={demoEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder={demoPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950">
              {error}
            </p>
          )}

          <Button type="submit" block className="w-full" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950">
          <h3 className="mb-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            Demo Credentials
          </h3>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            Email: <strong>{demoEmail}</strong>
          </p>

          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Password: <strong>{demoPassword}</strong>
          </p>

          <button
            type="button"
            onClick={() => {
              setEmail(demoEmail);
              setPassword(demoPassword);
            }}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
          >
            Use demo credentials
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
