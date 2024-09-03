//dep. imports
import Link from "next/link";
// css
import '../css/sidebar.css'

const SideBar = () => {
	return (
		<div className="col-span-1 h-full bg-base-200 text-white flex gap-2 flex-col p-2">
			<Link href="/">
				<button className={`sidebar-button w-full`}>
					Encounters
				</button>
			</Link>
			<Link href="/characters">
				<button className={`sidebar-button w-full`}>
					Characters
				</button>
			</Link>
		</div>
	)
}

export default SideBar;