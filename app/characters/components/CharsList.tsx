'use client'
// react
import {useState, useEffect} from "react";
// logic imports
import {Character} from "@/lib/combatTracker";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loadStoredData} from "@/lib/slices/storageManager";

const CharacterList = () => {
	const dispatch = useAppDispatch();
	const storageChars = useAppSelector(state => state.encounterReducer.characters)
	const [characters, setCharacters] = useState<Character[]>([]);

	useEffect(() => {
		dispatch(loadStoredData())
	}, [dispatch]);

	useEffect(() => {
		setCharacters(storageChars);
	}, [storageChars]);

	console.log('characters', characters);

	return (
		<>
			{characters.map((char: Character, index) => (
				<tr key={index}>
					<td>{char.name}</td>
					<td>{char.hp}</td>
					<td>{char.type}</td>
				</tr>
			))}
		</>
	)
}
export default CharacterList;