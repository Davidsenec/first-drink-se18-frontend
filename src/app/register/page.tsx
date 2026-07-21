"use client";

import { useState, useEffect } from "react";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage() {
    const [data, setData] = useState(null);
    const [errorMessage, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [nickName, setNickName] = useState("");
    const [contact_info, setContactInfo] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        // async function fetchRegister() {

        //     const controller = new AbortController();

        //     try {
        //         const response = await fetch("http://127.0.0.1:8000/register", {
        //             signal: controller.signal
        //         });

        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }

        //         const json = await response.json();
        //         setData(json);
        //     } catch (err) {
        //         if (err instanceof Error) {
        //             setError(err.message)
        //         } else {
        //             setError("Something went wrong, please try again.")
        //         }
        //     }
        // }
    })





    return (
        <main className="flex justify-center px-6 py-12">
        <div className="w-full max-w-xl p-4">
            <Link href="../"><button className="mb-3 text-gray-500 hover:text-white ">&#8592; Back</button></Link>
            <h1 className="mb-6 text-5xl font-bold text-center">⚽ REGISTER</h1>

            <div className="flex flex-col gap-6">
                <TextInput label="Username" placeholder="Example: 69011xx, Big D"/>
                
                <TextInput label="Password" type="password"/>

                <TextInput label="Confirm Password" type="password"/>

                <TextInput label="Full name"/>

                <TextInput label="Nickname"/>

                <TextInput label="Contact info" placeholder="Phone number, Line ID, etc."/>

                <p>How are you going home?</p>
                <label><input type="radio" name="source" value="parents" 
                onChange={(e) => setAddress(e.target.value)} className="rounded border p-3"/> Parents</label>
                <label><input type="radio" name="source" value="other" 
                onChange={(e) => setAddress(e.target.value)} className="rounded border p-3"/> Other</label>
                {address === "other" && (
                    <TextInput label ="" placeholder="Please describe how and provide emergency contact info/address"/>
                )}
                <label className="flex items-center gap-3"><input type="checkbox" /> I accept and understand the<Link href="" className="underline text-emerald-500">rules</Link></label>
                <Button>REGISTER</Button>
            </div>
        </div>
        </main>
    );
}