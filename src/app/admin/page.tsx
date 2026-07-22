"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown, {Option} from "@/components/ui/Dropdown";
import { useRouter } from "next/navigation"

// Mock types for now 
enum UserStatus {
    NotArrived = "Not arrived",
    Present = "Present",
    Departed = "Departed",
}

type User = {
    id: number;
    user_name: string;
    nick_name: string;
    status: UserStatus;
};

export default function AdminPage() {

    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setError] = useState("");

    const handleLogout = () => {
        localStorage.clear();   
        router.push("../");
    }

    const handleRefresh = () => {
        router.refresh()
    }
    
    function updateStatus(id: number, status: UserStatus) {
        setUsers(
            users.map(user =>
                user.id === id
                    ? { ...user, status }
                    : user
            )
        );
    }

    const options = [
    { label: "Not arrived", value: UserStatus.NotArrived, color: "red" },
    { label: "Present", value: UserStatus.Present, color: "green" },
    { label: "Departed", value: UserStatus.Departed, color: "violet" },
    ];

    let totalno = 0;
    let notar = 0;
    let presentno = 0;
    let departedno = 0;
    const total = users.length;

    const present = users.filter(user => user.status === UserStatus.Present).length;
    const departed = users.filter(user => user.status === UserStatus.Departed).length;
    const notArrived = users.filter(user => user.status === UserStatus.NotArrived).length;

    useEffect(() => {
        async function fetchUserData() {    
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://127.0.0.1:8000/admin/get_user', {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }); 
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Something wrong');
            }

            setUsers(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Something went wrong, please try again.")
            }
        } finally {
            setIsLoading(false);
        }
        }
        fetchUserData();
    }, []);

    return (
        <main className="flex justify-center px-3 py-6">
            <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                <div className="align-start">
                    <button className="mb-3 mr-5 text-gray-500 hover:text-white" onClick={handleLogout}>Logout</button>
                    <button className="mb-3 text-gray-500 hover:text-white" onClick={() => router.refresh()}>refresh</button>
                </div>
                <h1 className="mb-6 text-5xl font-bold">ADMIN</h1>
                <div className="mb-6">
                    <p>Total: <label className="italic">{total}</label></p>
                    <p>Not arrived: <label className="italic text-red-500">{notArrived}</label></p>
                    <p>Present: <label className="italic text-green-500">{present}</label></p>
                    <p>Departed: <label className="italic text-violet-500">{departed}</label></p>
                </div>


                <table className="w-full rounded-lg border border-gray-500 border-separate border-spacing-0 bg-[#1B1D2F]">
                    <thead className="border-b border-gray-500">
                    <tr className="">
                        <th className="p-2">#</th>
                        <th className="">Username</th>
                        <th className="">Name</th>
                        <th className="">Status</th>
                    </tr>
                    </thead>

                    <tbody className="text-center">
                        {users.map((user) =>
                            <tr key={user.id} className="border-b">
                                <td className="p-2">{user.id}</td>
                                <td>{user.user_name}</td>
                                <td>{user.nick_name}</td>
                                <td className="p-2"><Dropdown value={user.status} onChange={(value) => updateStatus(user.id, value as UserStatus)} 
                                options={options}></Dropdown></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}