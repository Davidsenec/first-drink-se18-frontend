import Link from "next/link";

export default function AdminPage() {
    return (
        <div>
            <main className="flex justify-center px-3 py-6">
                <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                    <Link href="../"><button className="mb-3 text-gray-500 hover:text-white ">&#8592; Back</button></Link>
                </div>
            </main>
        </div>
    );
}