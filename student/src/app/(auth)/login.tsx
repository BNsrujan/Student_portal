import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/toast"; // Reusable alert component
// import Cookies from "js-cookie"
function Login() {
    const [usn, setUsn] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    interface LoginResponse {
        token: string;
        message?: string;
    }

    interface ApiError {
        message: string;
        status: number;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post<LoginResponse>(
                "/api/v1/student/login",
                { usn, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            console.log(data)
            // const { token } = response.data;
            // if (token) {
            //     Cookies.set("token", response.data.token, {
            //         expires: 1,
            //         secure: true,
            //         sameSite: "Strict",
            //     })
            //     navigate("/dashboard");
            // } else {
            //     setError("Invalid USN or password");
            // }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const apiError = err as AxiosError<ApiError>;
                setError(apiError.response?.data?.message || "Invalid USN or password, try again");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                </div>
                {error && <Alert type="error" message={error} />}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <Label htmlFor="usn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                USN
                            </Label>
                            <Input
                                id="usn"
                                type="text"
                                required
                                value={usn}
                                onChange={(e) => setUsn(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
