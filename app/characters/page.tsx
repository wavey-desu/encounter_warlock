// component imports
import AddCharBtn from './components/AddCharBtn';
import AddCharDialog from "@/app/ui-components/AddCharDialog";
import CharacterList from "./components/CharsList";


const CharsPage = async () => {

	return (
		<>
			<div className="w-full h-full flex flex-col justify-start items-center py-6 gap-6">
				<div className="flex flex-row justify-between w-11/12">
					<div className="w-5"></div>
					<h1 className={`text-center text-2xl`}>All Characters</h1>
					<AddCharBtn />
				</div>
				<div className={`w-11/12 h-5/6 overflow-x-auto flex flex-col items-center`}>
					<table className={"table w-full"}>
						<thead>
							<tr>
								<th>Name</th>
								<th>HP</th>
								<th>Type</th>
								{/*<th>Class</th>*/}
							</tr>
						</thead>
						<tbody>
							<CharacterList />
						</tbody>
					</table>
				</div>
				<AddCharDialog/>
			</div>
		</>
	)
}

export default CharsPage