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
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md shadow-lg dark:bg-gray-900">
          <CardHeader className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Login to your TaskFlow Inc account
            </p>
          </CardHeader>
          <CardBody>
            {error && (
              <div className="bg-danger-50 text-danger border border-danger-200 rounded-md p-3 mb-4">
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
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color="primary"
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
              />
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
              <Button 
                type="submit" 
                color="primary"
                className="w-full mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> Logging in...
                  </div>
                ) : "Login"}
              </Button>
              <p className="text-center mt-4 text-sm">
                Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
              </p>
            </Form>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}

