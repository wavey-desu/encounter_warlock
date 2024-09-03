'use client';
// dep.imports
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// logic imports
import { setAddCharOpen } from '@/lib/slices/appDefaults';
import { addCharacter } from '@/lib/slices/storageManager';
import { Character } from '@/lib/combatTracker';

const AddCharDialog = () => {
	const dispatch = useAppDispatch();
	const addCharOpen = useAppSelector((state) => state.appDefaults.addCharOpen);

	const [charValues, setCharValues] = useState<Character>({
		id: `char-${Math.random().toString(36).substr(2, 9)}`,
		name: '',
		hp: 0,
		type: 'PC',
	});

	const handleAddCharClose = () => {
		dispatch(setAddCharOpen(false));
		setCharValues({
			id: '',
			name: '',
			hp: 0,
			type: 'PC',
		});
	};

	const handleAddChar = () => {
		dispatch(addCharacter(charValues));
		dispatch(setAddCharOpen(false));
	};

	useEffect(() => {
		console.log('charValues', charValues);
	}, [charValues]);

	return (
		<dialog className={`modal ${addCharOpen && 'modal-open'}`}>
			<div className={'modal-box w-10/12'}>
				<div className={'grid grid-cols-4 gap-4 w-full'}>
					<p className={'col-span-4 text-center'}>Add New Character</p>
					<input
						onChange={(e) =>
							setCharValues({ ...charValues, name: e.target.value })
						}
						value={charValues.name}
						name='name'
						type={'text'}
						placeholder={'Name'}
						className={'input input-bordered w-full max-w-xs col-span-2'}
					/>
					<input
						onChange={(e) =>
							setCharValues({ ...charValues, hp: parseFloat(e.target.value) })
						}
						value={charValues.hp}
						name='hp'
						type={'number'}
						placeholder={'Max HP'}
						className={'input input-bordered w-full max-w-xs col-span-2'}
					/>
					<div className={`col-span-4 join flex items-center justify-center`}>
						<button
							onClick={() => setCharValues({ ...charValues, type: 'PC' })}
							className={`w-28 join-item btn ${
								charValues.type === 'PC' && 'btn-active'
							}`}
						>
							PC
						</button>
						<button
							onClick={() => setCharValues({ ...charValues, type: 'NPC' })}
							className={`w-28 join-item btn ${
								charValues.type === 'NPC' && 'btn-active'
							}`}
						>
							NPC
						</button>
					</div>
				</div>
				<div className='modal-action'>
					<form method='dialog'>
						<button onClick={() => handleAddChar()} className={'btn' + ' mx-4'}>
							Add Character
						</button>
						<button onClick={() => handleAddCharClose()} className='btn'>
							Close
						</button>
					</form>
				</div>
			</div>
		</dialog>
	);
};

export default AddCharDialog;
