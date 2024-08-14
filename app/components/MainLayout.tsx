import {ReactNode} from "react";

const MainLayout = ({children}: {children: ReactNode}) => {
	return (
		<div className=" flex flex-col h-screen w-screen">
			<div className=" w-screen h-12 bg-indigo-950 text-center">
				<h1 className={`font-semibold text-2xl`}>Appbar</h1>
			</div>
			<div className= "h-full grid grid-cols-8 gap-4">
				<div className= "col-span-1 h-full bg-gray-500 text-white flex flex-col p-4">
					<h2>Sidebar</h2>
				</div>
				<main className="col-span-7 flex items-center justify-center">
					{children}
				</main>
			</div>
		</div>
	)
}

export default MainLayout;