import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { branches, semesters } from "@/constent";
import { z } from "zod";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
    username: z.string().min(3, "Please enter your name"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    semester: z.string().min(1, "Please select a semester"),
    branch: z.string().min(1, "Please select a branch"),
    usn: z.string().min(1, "Please enter your USN"),
    section: z.string().max(1, "Section should be one letter"),
});

type FormData = z.infer<typeof formSchema>;

function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        semester: "",
        branch: "",
        usn: "",
        section: "",
    });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationResult = formSchema.safeParse(formData);
        console.log(formData)
        if (!validationResult.success) {
            setError(validationResult.error.errors[0]?.message || "Invalid Input");
            console.log(validationResult.error.errors[0]?.message)
            return;
        }

        try {
            await axios.post("/api/v1/student/register");
            navigate("/login");
        } catch (err) {
            // setError(err.response?.data?.message || "Registration failed. Please try again.");
            console.log(err)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                </div>
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="username">Name</Label>
                            <Input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleChange("username", e.target.value)}
                                className="mt-1 block w-full  bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="usn">USN</Label>
                            <Input
                                id="usn"
                                type="text"
                                value={formData.usn}
                                onChange={(e) => handleChange("usn", e.target.value)}
                                className="mt-1 block w-full  bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="mt-1 block w-full  bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                className="mt-1 block w-full  bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="branch">Branch</Label>
                            <Select onValueChange={(value) => handleChange("branch", value)}>
                                <SelectTrigger className="mt-1 w-full">
                                    <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {branches.map((branch) => (
                                        <SelectItem key={branch} value={branch}>
                                            {branch}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="semester">Current Semester</Label>
                            <Select
                                onValueChange={(value) => handleChange("semester", value)}
                            >
                                <SelectTrigger className="mt-1 w-full">
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {semesters.map((sem) => (
                                        <SelectItem key={sem} value={sem}>
                                            {sem}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="section">Section</Label>
                            <Input
                                id="section"
                                type="text"
                                value={formData.section}
                                onChange={(e) => handleChange("section", e.target.value)}
                                className="mt-1 block w-full  bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>


                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </Button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
