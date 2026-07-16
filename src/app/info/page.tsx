import Link from "next/link";
import Button from "@/components/ui/Button"

export default function InfoPage() {
    return (
        <main className="flex justify-center px-3 py-6">
            <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                <Link href="../"><button className="mb-3 text-gray-500 hover:text-white ">&#8592; Back</button></Link>
                <h1 className="mb-6 text-5xl font-bold text-center">Welcome, user</h1>
                <div className="bg-amber-100 rounded-2xl text-black text-center px-20 py-20">Image</div>

                <div className="border-[#dcdce9] rounded-xl bg-[#1B1D2F] p-4">
                    <h1 className="text-xs font-bold text-emerald-600">EVENT INFO</h1>
                    <h2>⏰ Monday, August 3 2026 · 19:00</h2>
                    <h3 className="">📍 Me Smile Cafe | Google maps: 
                        <Link href="https://maps.app.goo.gl/JAwqHpXVpaZadCN19" className="text-blue-500"> Click here!</Link></h3>
                    <p>---</p>
                    <h1 className="text-xs font-bold text-emerald-600">CONTACT INFO</h1>
                    <h2>Discord: </h2>
                    <h2>Line: </h2>
                </div>

                <div className="border-[#dcdce9] rounded-xl bg-[#1B1D2F] p-4">
                    <h1 className="text-2xs font-bold text-emerald-600">RULES</h1>
                </div>               
                
                <Link href="edit-info"><Button> Edit Info</Button></Link>

            </div>
        </main>
    );
}