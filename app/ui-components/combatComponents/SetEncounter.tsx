'use client';
// dep imports
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loadStoredData } from '@/lib/slices/storageManager';
import { phaseNext } from '@/lib/slices/appDefaults';

const SetEncounter = () => {
	const dispatch = useAppDispatch();
	const phase = useAppSelector((state) => state.appDefaults.encounterPhase);
	const [currentPhase, setCurrentPhase] = useState(phase);

	useEffect(() => {
		dispatch(loadStoredData());
	}, []);

	useEffect(() => {
		setCurrentPhase(phase);
		// console.log(currentPhase);
	}, [phase]);

	const handleStartEncounter = () => {
		dispatch(phaseNext());
	};

	return (
		<div
			className={`${
				currentPhase !== 0 && 'hidden'
			} bg-neutral rounded-md w-11/12 h-20 flex items-center justify-center`}
		>
			<div
				className={`w-full h-full flex flex-row px-10 py-5 gap-4 justify-evenly items-center`}
			>
				<button
					onClick={() => handleStartEncounter()}
					className={`btn btn-primary w-2/12`}
				>
					Add New Encounter
				</button>
				<button className={`btn btn-secondary w-2/12`}>Load Encounter</button>
			</div>
		</div>
	);
};
export default SetEncounter;
