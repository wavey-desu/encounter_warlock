'use client'
// dep.imports
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setAddCharOpen} from "@/lib/slices/appDefaults";

import {useEffect} from "react";

const AddCharBtn = () => {
	const dispatch = useAppDispatch();
	const addCharOpen = useAppSelector(state => state.appDefaults.addCharOpen)

	const handleCharOpen = () => {
		dispatch(setAddCharOpen(!addCharOpen));
	}

	useEffect(() => {
		console.log('addCharOpen', addCharOpen);
	}, [addCharOpen]);

	return (
		<button onClick={() => handleCharOpen()} className='btn bg-secondary'>Add New</button>
	)
}
export default AddCharBtn