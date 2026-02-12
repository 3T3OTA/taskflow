import DefaultLayout from "@/layouts/default";
import { loginUser } from "@/services/api";
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { SEO, pageSEO } from "@/components/SEO";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { refreshAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(email, password);
      Cookies.set("token", response.token, { expires: 7 });
      addToast({ title: response.message, color: "success" });
      await refreshAuth();
      navigate('/');
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message || "Failed to login. Please try again.");
      addToast({ title: error.message || "Failed to login. Please try again.", color: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <SEO {...pageSEO.login} />
      <div className="relative min-h-[calc(100vh-200px)] overflow-hidden bg-[#f6f1e8] dark:bg-[#0b0f14]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(20,20,20,0.06)_1px,transparent_1px),linear-gradient(60deg,rgba(20,20,20,0.04)_1px,transparent_1px)] [background-size:48px_48px] opacity-40 dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,0.06)_1px,transparent_1px)] dark:opacity-20" />
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[rgba(59,130,246,0.25)] blur-3xl dark:bg-[rgba(59,130,246,0.18)]" />
        <div className="absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-[rgba(14,165,233,0.25)] blur-3xl dark:bg-[rgba(14,165,233,0.18)]" />
        <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-12">
          <Card className="w-full overflow-hidden border border-black/10 bg-white/90 shadow-[0_30px_70px_rgba(20,20,20,0.15)] backdrop-blur-md dark:border-white/10 dark:bg-[#0f151c]/90 dark:shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
            <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
              <div className="hidden md:flex flex-col justify-between gap-8 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25)_0%,rgba(255,255,255,0)_55%)] p-10 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25)_0%,rgba(0,0,0,0)_60%)]">
                <div className="space-y-4">
                  <span className="inline-flex items-center justify-center rounded-full bg-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#141414] dark:bg-white/10 dark:text-white/80">
                    TaskFlow
                  </span>
                  <h1 className="text-4xl font-semibold leading-tight text-[#141414] dark:text-white">
                    Welcome back. Your boards missed you.
                  </h1>
                  <p className="text-base text-black/60 dark:text-white/60">
                    Jump into your workspace and keep momentum on the tasks that matter.
                  </p>
                </div>
                <div className="space-y-3 text-sm text-black/60 dark:text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                    Plan boards with clarity and speed.
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                    Track progress visually, in one place.
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                    Stay focused with smart lists.
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-10">
                <CardHeader className="flex flex-col gap-2 px-0 pt-0 text-left">
                  <h2 className="text-3xl font-semibold text-[#141414] dark:text-white">Sign in</h2>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Use your email and password to continue.
                  </p>
                </CardHeader>
                <CardBody className="px-0">
                  {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-500/15 dark:text-red-200">
                      {error}
                    </div>
                  )}
                  <Form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <Input
                      isRequired
                      errorMessage="Please enter a valid email"
                      label="Email"
                      labelPlacement="outside"
                      name="email"
                      placeholder="name@company.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      color="primary"
                      classNames={{
                        label: "text-black/70 dark:text-white/70",
                        inputWrapper: "bg-white/70 border border-black/10 shadow-none hover:bg-white/90 focus-within:border-blue-500 dark:bg-white/5 dark:border-white/10",
                        input: "text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40",
                      }}
                    />
                    <Input
                      isRequired
                      errorMessage="Please enter a valid password"
                      label="Password"
                      labelPlacement="outside"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      color="primary"
                      classNames={{
                        label: "text-black/70 dark:text-white/70",
                        inputWrapper: "bg-white/70 border border-black/10 shadow-none hover:bg-white/90 focus-within:border-blue-500 dark:bg-white/5 dark:border-white/10",
                        input: "text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40",
                      }}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/60 dark:text-white/60">Keep me signed in</span>
                      <a href="/forgot-password" className="text-blue-600 font-semibold hover:underline dark:text-blue-300">
                        Forgot password?
                      </a>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-semibold transition hover:bg-blue-500 hover:shadow-[0_12px_24px_rgba(37,99,235,0.35)] dark:bg-blue-500 dark:hover:bg-blue-400 dark:hover:shadow-[0_12px_24px_rgba(59,130,246,0.35)]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <span className="animate-spin">⟳</span> Logging in...
                        </div>
                      ) : "Login"}
                    </Button>
                    <p className="text-center text-sm text-black/60 dark:text-white/60">
                      Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline dark:text-blue-300">Create one</Link>
                    </p>
                  </Form>
                </CardBody>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}

