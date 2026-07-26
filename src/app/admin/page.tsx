"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown, {Option} from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput";

enum UserStatus {
    not_arrived = "not_arrived",
    in_party = "in_party",
    departed = "departed",
}

type BackUser = {
    id: number;
    user_name: "string";
    full_name: "string";
    nick_name: "string";
    contact_info: "string";
    address: "string";
    is_admin: boolean;
    status: UserStatus;
};

type User = {
    id: number;
    user_name: string;
    contact_info: string;
    nick_name: string;
    address: string;
    status: UserStatus;
};

export default function AdminPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setError] = useState("");
    const [searchName, setSearch] = useState("");

    function searchNickname() {

        if (!searchName.trim()) {
            return users;
        }

        const query = searchName.toLowerCase();
        return users.filter(user => 
            user.nick_name.toLowerCase().includes(query)
        );
    }

    const handleLogout = () => {
        localStorage.clear();   
        router.push("../");
    }
    
    const options = [
        { label: "Not arrived", value: UserStatus.not_arrived, color: "red" },
        { label: "Present", value: UserStatus.in_party, color: "green" },
        { label: "Departed", value: UserStatus.departed, color: "violet" },
    ];

    const total = users.length;
    const present = users.filter(user => user.status === UserStatus.in_party).length;
    const departed = users.filter(user => user.status === UserStatus.departed).length;
    const notArrived = users.filter(user => user.status === UserStatus.not_arrived).length;
    const visibleUsers = searchNickname();
    
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

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleRefresh = () => {
        fetchUserData();
    }

async function updateStatus(id: number, status: UserStatus) {
    try {
        const token = localStorage.getItem("token");
        console.log({
            id,
            status,
        });
        const response = await fetch(`http://127.0.0.1:8000/admin/check_in/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status}),
        });

        if (!response.ok) {
            console.log("Status:", response.status);
            console.log("Status Text:", response.statusText);

            const error = await response.json();
            console.log(error);
            throw new Error(`Failed to load users (${response.status})`);
        }

        router.refresh();
    } catch(err) {
        console.error(err);
    }
    setUsers(
        users.map(user =>
            user.id === id
                ? { ...user, status }
                : user
        )
    );
}
    return (
        <main className="flex justify-center px-3 py-6">
            <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                <div className="align-start">
                    <button className="mb-3 mr-5 text-gray-500 hover:text-white" onClick={handleLogout}>Logout</button>
                    <button className="mb-3 text-gray-500 hover:text-white" onClick={handleRefresh}>refresh</button>
                </div>
                <h1 className="mb-6 text-5xl font-bold">ADMIN</h1>
                <div>
                    <p>Total: <label className="italic">{total}</label></p>
                    <p>Not arrived: <label className="italic text-red-500">{notArrived}</label></p>
                    <p>Present: <label className="italic text-green-500">{present}</label></p>
                    <p>Departed: <label className="italic text-violet-500">{departed}</label></p>
                </div>

                <TextInput label="" value={searchName} onChange={setSearch} placeholder="Search Nickname" />
                <table className="w-full rounded-lg border border-gray-500 border-separate border-spacing-0 bg-[#1B1D2F] mt-6">
                    <thead className="border-b border-gray-500">
                    <tr className="">
                        <th className="p-2">#</th>
                        <th className="">Nickname</th>
                        <th className="">ContactInfo</th>
                        <th className="">Address</th>
                        <th className="">Status</th>
                    </tr>
                    </thead>

                    <tbody className="text-center">
                        {visibleUsers.map((user) =>
                            <tr key={user.id} className="border-b">
                                <td className="p-2">{user.id-1}</td>
                                <td>{user.nick_name}</td>
                                <td>{user.contact_info}</td>
                                <td>{user.address}</td>
                                <td className="p-2"><Dropdown 
                                    value={user.status} 
                                    onChange={(value) => updateStatus(user.id, value as UserStatus)} 
                                    options={options}>
                                </Dropdown></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}