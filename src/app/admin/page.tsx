"use client";

import { useState } from "react";
import Link from "next/link";
import Dropdown, {Option} from "@/components/ui/Dropdown";

// Mock types for now 
enum UserStatus {
    NotArrived = "Not arrived",
    Present = "Present",
    Departed = "Departed",
}

type User = {
    id: number;
    username: string;
    nickname: string;
    status: UserStatus;
};

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            username: "ceo_of_sex",
            nickname: "David",
            status: UserStatus.NotArrived,
        },
        {
            id: 2,
            username: "GayLord",
            nickname: "Auto",
            status: UserStatus.Present,
        },
        {
            id: 3,
            username: "LilD",
            nickname: "Beam",
            status: UserStatus.NotArrived,
        },
    ]);
    
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

    return (
        <main className="flex justify-center px-3 py-6">
            <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                <Link href="../"><button className="mb-3 text-gray-500 hover:text-white ">&#8592; Back</button></Link>
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
                        {users.map((user, index) =>
                            <tr key={user.id} className="border-b">
                                <td className="p-2">{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.nickname}</td>
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