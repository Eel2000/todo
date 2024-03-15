import Link from "next/link";

export default function NavBar(){
    return (
        <div>
            <nav className="flex gap-3 bg-blue-200 shadow h-[60px] p-2">
                <h1 className="text-3xl mx-4 self-center">
                    <Link href="/">
                        Code24
                    </Link>
                </h1>
                <ul className="flex gap-4 self-center">
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
        </div>
    )
}