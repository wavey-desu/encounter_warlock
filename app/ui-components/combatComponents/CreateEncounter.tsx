'use client';
// component imports
import AddCharBtn from '@/app/characters/components/AddCharBtn';
// dep imports
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setAddCharOpen } from '@/lib/slices/appDefaults';
import { loadStoredData, startNewEncounter } from '@/lib/slices/storageManager';
import { X } from 'tabler-icons-react';
// type imports
import { Character } from '@/lib/combatTracker';

type Participant = {
	name: string;
	characterId: string;
	initiative: number;
};

const CreateEncounter = () => {
	const dispatch = useAppDispatch();
	const storageChars = useAppSelector(
		(state) => state.encounterReducer.characters
	);
	const phase = useAppSelector((state) => state.appDefaults.encounterPhase);

	const [currentPhase, setCurrentPhase] = useState(phase);
	const [encName, setEncName] = useState('');
	const [participants, setParticipants] = useState<Participant[]>([]);

	const handleCharSelect = (char: Character) => {
		const newChar = {
			name: char.name,
			characterId: char.name,
			initiative: 0,
		};

		setParticipants([...participants, newChar]);
	};

	const handlePartDelete = (partId: string) => {
		const partTemp = participants.filter(
			(participant) => participant.characterId !== partId
		);
		setParticipants(partTemp);
	};

	useEffect(() => {
		dispatch(loadStoredData());
	}, [dispatch]);

	useEffect(() => {
		setCurrentPhase(phase);
		console.log(currentPhase);
	}, [phase]);

	useEffect(() => {
		console.log('storageChars', storageChars);
	}, [storageChars]);

	return (
		<div
			className={`${
				currentPhase !== 1 && 'hidden'
			} w-full h-full flex flex-col justify-start items-center gap-5 py-5`}
		>
			<input
				className='w-2/4 input input-bordered'
				placeholder='Encounter Name'
				value={encName}
				onChange={(e) => setEncName(e.target.value)}
			/>
			<div className='w-full h-full flex flex-row justify-start items-start'>
				{/* Add Chars Pannel */}
				<div className=' flex flex-col gap-2 w-1/3 h-full p-5 rounded bg-base-300'>
					<p className='text-xl text-center'>All Characters</p>
					<div className='w-full h-5/6 flex flex-col gap-2 justify-start items-center'>
						{storageChars.map((char, index) => (
							<div
								key={index}
								className='flex flex-row justify-around items-center w-full'
							>
								<>
									<span className='w-1/4'>
										<p className='text-md'>{char.name}</p>
									</span>
									<button
										onClick={() => handleCharSelect(char)}
										className={`btn btn-secondary btn-sm`}
									>
										Add
									</button>
								</>
							</div>
						))}
					</div>
					<AddCharBtn />
					{/* <button
						onClick={() => setAddCharOpen(true)}
						className='btn btn-primary'
					>
						Create New Char
					</button> */}
				</div>
				{/* Participant list + initiative set */}
				<div className='flex flex-col gap-5 justify-start items-center w-2/3 h-full p-5'>
					<p className='text-xl text-center'>Participants</p>
					<div className='w-5/6 flex flex-col gap-5 py-5 justify-start items-center'>
						{participants.map((part, index) => (
							<div
								key={index}
								className='w-full flex flex-row justify-around items-center'
							>
								<>
									<button
										onClick={() => handlePartDelete(part.characterId)}
										className='btn btn-sm'
									>
										{<X />}
									</button>
									<span className='w-1/4'>
										<p className='text-lg'>{part.name}</p>
									</span>
									<span className='flex flex-row w-1/4 justify-around items-center gap-3'>
										<p>Initiative:</p>
										<input
											className='input input-bordered w-32'
											defaultValue={part.initiative}
											// value={part.initiative}
											type='number'
										/>
									</span>
								</>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEncounter;
