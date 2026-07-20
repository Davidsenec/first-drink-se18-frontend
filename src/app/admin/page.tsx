import Link from "next/link";
import Dropdown from "@/components/ui/Dropdown";

export default function AdminPage() {
    const attendees = [];
    const status = ["Not arrived", "Present", "Departed"];
    var total = 0;
    var notar = 0;
    var present = 0;
    var departed = 0;

    return (
        <div>
            <main className="flex justify-center px-3 py-6">
                <div className="flex flex-col w-full max-w-xl px-4 py-8 gap-3">
                    <Link href="../"><button className="mb-3 text-gray-500 hover:text-white ">&#8592; Back</button></Link>
                    <h1 className="mb-6 text-5xl font-bold">ADMIN</h1>
                    <p>Total: <label className="italic">{total}</label></p>
                    <p>Not arrived: <label className="italic text-red-500">{notar}</label></p>
                    <p>Present: <label className="italic text-green-500">{present}</label></p>
                    <p>Departed: <label className="italic text-violet-500">{departed}</label></p>


                    <br></br> {/*temporary solution*/}
                    <table className="w-full rounded-xl  bg-[#1B1D2F]">
                            <thead className="border-b border-gray-500">
                            <tr className="">
                                <th className="p-2">#</th>
                                <th className="p-2">Username</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Status</th>
                            </tr>
                            </thead>

                            <tbody className="text-center">
                            <tr>
                                <td className="p-2">1</td>
                                <td className="p-2">Ceo of sex</td>
                                <td className="p-2">David</td>
                                <td className="p-2"><Dropdown options={status}></Dropdown></td>
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