"use client";

import { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage() {
    const [selected, setSelected] = useState("");
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
                onChange={(e) => setSelected(e.target.value)} className="rounded border p-3"/> Parents</label>
                <label><input type="radio" name="source" value="other" 
                onChange={(e) => setSelected(e.target.value)} className="rounded border p-3"/> Other</label>
                {selected === "other" && (
                    <TextInput label ="" placeholder="Please describe how and provide emergency contact info/address"/>
                )}
                <label className="flex items-center gap-3"><input type="checkbox" /> I accept and understand the rules</label>
                <Button>REGISTER</Button>
            </div>
        </div>
        </main>
    );
}