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


                    <br></br> {/*temporary solution*/}
                    <table className="w-full rounded-xl bg-[#1B1D2F]">
                            <thead className="border-b border-gray-500">
                            <tr className="">
                                <th className="p-2">#</th>
                                <th className="p-2">Username</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Status</th>
                            </tr>
                            </thead>

                            <tbody className="">
                            <tr>
                                <td className="p-2">1</td>
                                <td className="p-2">Ceo of sex</td>
                                <td className="p-2">David</td>
                                <td className="p-2">Not arrived</td>
                            </tr>

                            <tr>
                                <td className="p-2">2</td>
                                <td className="p-2">Gay lord</td>
                                <td className="p-2">Auto</td>
                                <td className="p-2">Present</td>
                            </tr>
                            </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}