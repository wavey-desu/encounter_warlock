import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CombatTracker, Character, Participant, Encounter } from '../combatTracker';

interface CombatState {
	combatTracker: CombatTracker;
	currentEncounter: Encounter | null;
	encounters: Encounter[];
	characters: Character[];
}

const initialState: CombatState = {
	combatTracker: new CombatTracker(),
	currentEncounter: null,
	encounters: [],
	characters: [],
};

const combatSlice = createSlice({
	name: 'combat',
	initialState,
	reducers: {
		loadStoredData(state) {
			state.combatTracker.loadLocalStorage()
			state.characters = state.combatTracker.getStoredCharacters();
			state.encounters = state.combatTracker.getStoredEncounters();
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			state.currentEncounter = state.combatTracker.getStoredEncounters().find(
				(encounter) => encounter.id === currentEncounterId
			) || null;
		},
		addCharacter(state, action: PayloadAction<Character>) {
			state.combatTracker.addCharacter(action.payload);
			state.characters = state.combatTracker.getStoredCharacters();
		},
		addParticipant(state, action: PayloadAction<{ characterId: string; maxHp?: number }>) {
			state.combatTracker.addParticipant(action.payload.characterId, action.payload.maxHp);
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			state.currentEncounter = state.combatTracker.getStoredEncounters().find(
				(encounter) => encounter.id === currentEncounterId
			) || null;
		},
		setInitiative(state, action: PayloadAction<{ participantId: string; initiative: number }>) {
			state.combatTracker.setInitiative(action.payload.participantId, action.payload.initiative);
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			state.currentEncounter = state.combatTracker.getStoredEncounters().find(
				(encounter) => encounter.id === currentEncounterId
			) || null;
		},
		startNewEncounter(state, action: PayloadAction<{ name: string; participants: { characterId: string; initiative: number }[] }>) {
			// Use the new startNewEncounter method
			state.combatTracker.startNewEncounter(action.payload.name, action.payload.participants);
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			if (currentEncounterId) {
				state.currentEncounter = state.combatTracker.getStoredEncounters().find(
					(encounter) => encounter.id === currentEncounterId
				) || null;
			}
		},
		startEncounter(state, action: PayloadAction<string>) {
			state.combatTracker.startEncounter(action.payload);
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			state.currentEncounter = state.combatTracker.getStoredEncounters().find(
				(encounter) => encounter.id === currentEncounterId
			) || null;
		},
		dealDamage(state, action: PayloadAction<{ attackerId: string; recipientId: string; damage: number }>) {
			state.combatTracker.dealDamage(action.payload.attackerId, action.payload.recipientId, action.payload.damage);
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			state.currentEncounter = state.combatTracker.getStoredEncounters().find(
				(encounter) => encounter.id === currentEncounterId
			) || null;
		},
		healDamage(state, action: PayloadAction<{ healerId: string; recipientId: string; healing: number }>) {
			state.combatTracker.healDamage(action.payload.healerId, action.payload.recipientId, action.payload.healing);
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			state.currentEncounter = state.combatTracker.getStoredEncounters().find(
				(encounter) => encounter.id === currentEncounterId
			) || null;
		},
		nextTurn(state) {
			state.combatTracker.nextTurn();
			const currentEncounterId = state.combatTracker.getCurrentEncounterId();
			state.currentEncounter = state.combatTracker.getStoredEncounters().find(
				(encounter) => encounter.id === currentEncounterId
			) || null;
		},
		completeEncounter(state) {
			state.combatTracker.completeEncounter();
			state.currentEncounter = null;
		},
	},
});

export const {
	loadStoredData,
	addCharacter,
	addParticipant,
	setInitiative,
	dealDamage,
	healDamage,
	completeEncounter,
	startEncounter,
	startNewEncounter,
	nextTurn
} = combatSlice.actions;

export default combatSlice.reducer;