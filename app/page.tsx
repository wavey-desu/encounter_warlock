import SetEncounter from '@/app/ui-components/combatComponents/SetEncounter';
import CreateEncounter from './ui-components/combatComponents/CreateEncounter';
import AddCharDialog from './ui-components/AddCharDialog';

export default function Home() {
	return (
		<div className={`flex flex-col px-1 py-4 items-center h-full w-full`}>
			<SetEncounter />
			<CreateEncounter />
			<AddCharDialog />
		</div>
	);
}
