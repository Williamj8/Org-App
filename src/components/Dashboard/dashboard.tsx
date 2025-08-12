import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import type { User } from "../../services/users-api/types";
import { fetchUsers } from "../../services/users-api/users";


const COLORS = ["#4caf50", "#f44336"]; // green for active, red for inactive

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) return <div>Loading...</div>;

    // Calculate active vs inactive users
    const activeCount = users.filter((u) => u.status === "Active").length;
    const inactiveCount = users.length - activeCount;

    const pieData = [
        { name: "Active", value: activeCount },
        { name: "Inactive", value: inactiveCount },
    ];

    // Prepare line chart data: group by date, count number of logins per day
    // Format last_login: "2025-07-14T07:57:07"
    const loginByDate: Record<string, number> = {};

    users.forEach((user) => {
        if (user.last_login) {
            const date = new Date(user.last_login).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            loginByDate[date] = (loginByDate[date] || 0) + 1;
        }
    });

    // Convert loginByDate to array for Recharts, sorted by date
    const lineData = Object.entries(loginByDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <h2>User Status Overview</h2>

            <ResponsiveContainer width="100%" height={270}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : "0"}%`}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>

            <h2>User Login Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Dashboard;
