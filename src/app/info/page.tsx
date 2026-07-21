'use client'

import Link from "next/link";
import Button from "@/components/ui/Button"

import { useRouter } from 'next/navigation';

export default function InfoPage() {

    const router = useRouter();
    const handleLogout = () => {
        localStorage.clear();   
        router.push("../");
    }


    return (
        <main className="flex justify-center px-3 py-6">
            <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                <div>
                    <button className="mb-3 text-gray-500 hover:text-white items-start" onClick={handleLogout}>Logout</button>
                </div>
                <h1 className="mb-6 text-5xl font-bold">Welcome, user</h1>
                <div className="bg-amber-100 rounded-2xl text-black text-center px-20 py-20">Image</div>
                <label className="text-center text-gray-500 text-sm">SCREENSHOT TO SAVE</label>

                <div className="border-[#dcdce9] rounded-xl bg-[#1B1D2F] p-4">
                    <h1 className="text-xs font-bold text-emerald-600">EVENT INFO</h1>
                    <h2>⏰ Monday, August 3 2026 · 19:00</h2>
                    <h3 className="">📍 Me Smile Cafe | Google maps: 
                        <Link href="https://maps.app.goo.gl/JAwqHpXVpaZadCN19" className="text-blue-500"> Click here!</Link></h3>
                    <br></br>
                    <hr className="text-gray-500 p-3"></hr>
                    <h1 className="text-xs font-bold text-emerald-600">CONTACT INFO</h1>
                    <h2>Discord: <Link href="{https://discord.gg/N79Fp3hZZ}" className="text-blue-500 text-sm">https://discord.gg/N79Fp3hZZ</Link></h2>
                    <h2>Instagram: </h2>
                    <h2>Line: </h2>
                </div>

                <div className="border-[#dcdce9] rounded-xl bg-[#1B1D2F] p-4">
                    <h1 className="text-2xs font-bold text-emerald-600">RULES</h1>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>When arriving find a senior to scan your QR code for attendance</li>
                        <li>Before going anywhere, inform a senior</li>
                        <li>In an event of an emergency, find a senior for help</li>
                        <li>Call your seniors by the correct name or else</li>
                        <li>Be respectful to everyone</li>
                        <li>Don't make a mess</li>
                        <li>Don't drink too much ;)</li>
                    </ol>
                </div>               
                
                <Link href="edit-info"><Button> Edit Info</Button></Link>

            </div>
        </main>
    );
}