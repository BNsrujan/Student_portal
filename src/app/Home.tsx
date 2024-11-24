import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        }
        else {
            axios
                .get("/api/v1/student/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => setMessage(response.data.message))
        }
    }, []);


    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
        </div>
    );
}

export default Dashboard;
