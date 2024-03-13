import Link from "next/link";

export default function Home() {
    return (
        <main className="grid">
            <nav className="flex gap-3 bg-blue-200 shadow-2xl h-[60px] p-2">
                <h1 className="text-3xl mx-4">Code24</h1>
                <ul className="flex gap-4 mt-2">
                    <Link href="/pages/todo/"
                          className="hover:text-white">
                        <li>
                            Todos
                        </li>
                    </Link>
                    <Link href="/pages/counter/" className="hover:text-white">
                        <li>
                            Counter
                        </li>
                    </Link>
                    <Link href="/pages/weather/" className="hover:text-white">
                        <li>
                            weather forecast
                        </li>
                    </Link>
                </ul>
            </nav>
        </main>
    );
}
