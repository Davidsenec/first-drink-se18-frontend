import Link from "next/link";

export default function AdminPage() {
    return (
        <div>
            <main className="flex justify-center px-3 py-6">
                <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                    <Link href="../"><button className="mb-3 text-gray-500 hover:text-white ">&#8592; Back</button></Link>
                    <h1 className="mb-6 text-5xl font-bold">ADMIN</h1>
                    <p>Total: <label className="text">0</label></p>
                    <p>Not arrived: <label className="text-red-500">0</label></p>
                    <p>Present: <label className="text-green-500">0</label></p>
                    <p>Departed: <label className="text-violet-500">0</label></p>


                    
                </div>
            </main>
        </div>
    );
}