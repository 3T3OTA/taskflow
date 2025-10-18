import DefaultLayout from "@/layouts/default";
import { registerUser } from "@/services/api";
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/react";
import { SEO, pageSEO } from "@/components/SEO";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    try {
      const response = await registerUser(name, email, password);
      Cookies.set("token", response.token, { expires: 7 });
      addToast({ title: response.message, color: "success" });
      navigate('/');
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error.message || "Failed to register. Please try again.");
      addToast({ title: error.message || "Failed to register. Please try again.", color: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <SEO {...pageSEO.register} />
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md shadow-lg dark:bg-gray-900">
          <CardHeader className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold">Join us today</h1>
            <p className="text-muted-foreground text-balance">
              Create your TaskFlow Inc account and start your journey
            </p>
          </CardHeader>
          <CardBody>
            {error && (
              <div className="bg-danger-50 text-danger border border-danger-200 rounded-md p-3 mb-4">
                {error}
              </div>
            )}
            <Form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <Input
                isRequired
                errorMessage="Please enter a valid name"
                label="Name"
                labelPlacement="outside"
                name="name"
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                color="primary"
              />
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
                Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
              </p>
            </Form>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}

