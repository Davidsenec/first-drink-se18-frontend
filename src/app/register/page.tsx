"use client";

import { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [selected, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setError] = useState("");
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [full_name, setFullName] = useState("");
    const [nick_name, setNickName] = useState("");
    const [contact_info, setContactInfo] = useState("");
    const [address, setAddress] = useState("parent");
    const router = useRouter();

    
    async function fetchRegister() {

        const isValid = /^[a-zA-Z0-9_-]+$/.test(user_name);

        if (!user_name || !password || !full_name || !nick_name || !contact_info || !address) {
            setError("Please fill in all fields");
            return;
        }

        if (user_name.length < 3 || user_name.length >128 || !isValid) {
            setError("Username must be 3-50 characters long (letters, numbers, `_`, `-` only)");
            return;
        }

        if (password.length < 8 || password.length >128) {
            setError("Password must be 8-128 characters long");
            return;
        }


        if (full_name.length < 1 || full_name.length > 100) {
            setError("Fullname must be 1-100 characters long");
            return;
        }

        if (nick_name.length < 1 || nick_name.length > 50) {
            setError("nickname must be 1-50 characters long");
            return;
        }

        if (contact_info.length < 1 || contact_info.length >100) {
            setError("contact info must be 1-100 characters long");
            return;
        }

        if (address.length < 1 || address.length >255) {
            setError("address must be 1-255 characters long");
            return;
        }

        if (password != confirmPassword) {
            setError("Password doesn't match");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/register", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name, password, full_name, nick_name, contact_info, address}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Registration failed');
            }
            router.push("../")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Something went wrong, please try again.")
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex justify-center px-6 py-12">
        <div className="w-full max-w-xl p-4 animate-card">
            <Link href="../"><button className="mb-3 text-gray-500 hover:text-white ">&#8592; Back</button></Link>
            <h1 className="mb-6 text-5xl font-bold text-center animate-header">REGISTER</h1>

            <div className="flex flex-col gap-6">
                <TextInput
                    label="Username"
                    placeholder="Ex.69011xx, Big D"
                    value={user_name}
                    onChange={setUsername}
                />
                
                <TextInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                />

                <TextInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />

                <TextInput
                    label="Full name"
                    value={full_name}
                    onChange={setFullName}
                />

                <TextInput
                    label="Nickname"
                    value={nick_name}
                    onChange={setNickName}
                />

                <TextInput
                    label="Contact info (Please specify)"
                    placeholder="Ex.LineID:davidishandsome842"
                    value={contact_info}
                    onChange={setContactInfo}
                />

                <p>How are you going home?</p>
                <label><input type="radio" name="source" value="parents" 
                onChange={(e) => setSelectedOption(e.target.value)} className="rounded border p-3"/> Parents</label>
                <label><input type="radio" name="source" value="senior" 
                onChange={(e) => setSelectedOption(e.target.value)} className="rounded border p-3"/> Senior</label>
                <label><input type="radio" name="source" value="other" 
                onChange={(e) => setSelectedOption(e.target.value)} className="rounded border p-3"/> Other</label>
                {selected == "other" && (
                    <TextInput
                        label =""
                        placeholder="Please describe how"
                        value={address}
                        onChange={setAddress}
                    />
                )}

                <label className="flex items-center gap-3">
                    <input type="checkbox"/> 
                    {/* <Link href="" className="underline text-emerald-500 link-underline">rules</Link> */}
                    <Modal
                        title="Rules"
                        trigger={
                            <span className="cursor-pointer"> 
                                I accept and understand the <label className="underline text-emerald-500">rules</label>
                            </span>
                        }
                        >
                        <ol className="list-decimal list-inside space-y-1 text-sm text-white">
                            <li>When arriving find a senior to check in</li>
                            <li>Before going anywhere, inform a senior</li>
                            <li>In an event of an emergency, find a senior for help</li>
                            <li>Call your seniors by the correct name or else</li>
                            <li>Be respectful to everyone</li>
                            <li>Don't make a mess</li>
                            <li>Don't drink too much</li>
                        </ol>
                    </Modal>
                </label>

                {errorMessage && (
                <span className="text-red-400 text-center text-[14px] animate-shake">{errorMessage}</span>
                )}
                <Button
                    children="Register"
                    onClick={fetchRegister}
                />
            </div>
        </div>
        </main>
    );
}