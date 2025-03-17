import Dashboard from "../../Layouts/Dashboard"

export default function HistoryPage() {
    return (
        <Dashboard child={<History />} />
    )
}

function History() {
    return (
        <div className="flex flex-col w-full min-h-screen text-white">
            <div className="flex py-10 items-center px-10">
                <h3 className="text-5xl">Total size downloaded: 1.43GB</h3>
            </div>
            <div>
                <p className="text-left px-10">We celebrate your first GB</p>
            </div>
            <div className="flex w-full justify-between px-10">
                <div className="m-15 h-60 text-center border border-cyan-300 w-60 rounded-4xl">
                    <p>Section for new users</p>
                </div>
                <div className="mt-10 p-6  rounded-2xl shadow-lg shadow-cyan-500">
                    <h2 className="text-white text-xl font-bold mb-4">Last Downloaded Songs</h2>
                    <table className="w-full border-collapse border border-cyan-400 shadow-md shadow-cyan-500">
                        <thead>
                            <tr className="bg-cyan-700 text-white">
                                <th className="p-3 border border-cyan-300">#</th>
                                <th className="p-3 border border-cyan-300">Song Name</th>
                                <th className="p-3 border border-cyan-300">Artist</th>
                                <th className="p-3 border border-cyan-300">Album</th>
                                <th className="p-3 border border-cyan-300">Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=" text-white hover:bg-cyan-900 transition">
                                <td className="p-3 border border-cyan-300">1</td>
                                <td className="p-3 border border-cyan-300">Blinding Lights</td>
                                <td className="p-3 border border-cyan-300">The Weeknd</td>
                                <td className="p-3 border border-cyan-300">After Hours</td>
                                <td className="p-3 border border-cyan-300">4.2 MB</td>
                            </tr>
                            <tr className=" text-white hover:bg-cyan-900 transition">
                                <td className="p-3 border border-cyan-300">2</td>
                                <td className="p-3 border border-cyan-300">Levitating</td>
                                <td className="p-3 border border-cyan-300">Dua Lipa</td>
                                <td className="p-3 border border-cyan-300">Future Nostalgia</td>
                                <td className="p-3 border border-cyan-300">3.8 MB</td>
                            </tr>
                            <tr className=" text-white hover:bg-cyan-900 transition">
                                <td className="p-3 border border-cyan-300">3</td>
                                <td className="p-3 border border-cyan-300">Save Your Tears</td>
                                <td className="p-3 border border-cyan-300">The Weeknd</td>
                                <td className="p-3 border border-cyan-300">After Hours</td>
                                <td className="p-3 border border-cyan-300">4.5 MB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}