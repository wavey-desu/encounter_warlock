export type CharacterType = 'PC' | 'NPC';

export interface Character {
	id: string;
	name: string;
	type: CharacterType;
	hp: number;
}

export interface Participant extends Character {
	maxHp: number;
	currentHp: number;
	initiative: number;
	damageDealt: number;
	damageTaken: number;
	healingDone: number;
	conditions: string[]
}

export interface Encounter {
	id: string;
	participants: Participant[];
	round: number;
	activeParticipantIndex: number;
	name: string
}

export class CombatTracker {
	private encounters: Encounter[] = [];
	private characters: Character[] = [];
	private currentEncounterId: string | null = null;

	addCharacter(character: Character) {
		this.characters.push(character);
		localStorage.setItem('characters', JSON.stringify(this.characters));
	}

	addParticipant(characterId: string) {
		const character = this.characters.find((c) => c.id === characterId);
		if (!character) {
			throw new Error('Character not found');
		}

		const participant: Participant = {
			...character,
			maxHp: character.hp,
			currentHp: character.hp,
			initiative: 0,
			damageDealt: 0,
			damageTaken: 0,
			healingDone: 0,
			conditions: []
		};

		const currentEncounter = this.getCurrentEncounter();
		currentEncounter.participants.push(participant);
		this.updateLocalStorage();
	}

	setInitiative(participantId: string, initiative: number) {
		const currentEncounter = this.getCurrentEncounter();
		const participant = currentEncounter.participants.find((p) => p.id === participantId);
		if (participant) {
			participant.initiative = initiative;
			this.updateInitiativeOrder();
			this.updateLocalStorage();
		} else {
			throw new Error('Participant not found');
		}
	}

	dealDamage(attackerId: string, recipientId: string, damage: number) {
		const currentEncounter = this.getCurrentEncounter();
		const attacker = currentEncounter.participants.find((p) => p.id === attackerId);
		const recipient = currentEncounter.participants.find((p) => p.id === recipientId);

		if (attacker && recipient) {
			recipient.currentHp = Math.max(recipient.currentHp - damage, 0);
			attacker.damageDealt += damage;
			recipient.damageTaken += damage;
			this.updateLocalStorage();
		} else {
			throw new Error('Attacker or recipient not found');
		}
	}

	healDamage(healerId: string, recipientId: string, healing: number) {
		const currentEncounter = this.getCurrentEncounter();
		const healer = currentEncounter.participants.find((p) => p.id === healerId);
		const recipient = currentEncounter.participants.find((p) => p.id === recipientId);

		if (healer && recipient) {
			recipient.currentHp = Math.min(recipient.currentHp + healing, recipient.maxHp);
			healer.healingDone += healing;
			this.updateLocalStorage();
		} else {
			throw new Error('Healer or recipient not found');
		}
	}

	public startEncounter(encounterId: string): void {
		this.currentEncounterId = encounterId;
		// Additional logic to start the encounter
	}

	nextTurn() {
		const currentEncounter = this.getCurrentEncounter();
		if (!currentEncounter) return;

		const participants = currentEncounter.participants
			.filter((p) => p.initiative > 0)
			.sort((a, b) => b.initiative - a.initiative);

		let nextIndex = (currentEncounter.activeParticipantIndex + 1) % participants.length;

		if (nextIndex === 0) {
			currentEncounter.round += 1;
		}

		currentEncounter.activeParticipantIndex = nextIndex;

		this.updateLocalStorage();
	}

	getCurrentParticipant(): Participant | null {
		const currentEncounter = this.getCurrentEncounter();
		if (!currentEncounter) return null;

		return currentEncounter.participants[currentEncounter.activeParticipantIndex] || null;
	}


	completeEncounter() {
		const currentEncounter = this.getCurrentEncounter();
		this.encounters.push(currentEncounter);
		this.currentEncounterId = null;
		this.updateLocalStorage();
	}

	public startNewEncounter(name: string) {
		const newEncounter: Encounter = {
			id: this.generateId(),
			participants: [],
			round: 1,
			activeParticipantIndex: 0,
			name
		};
		this.currentEncounterId = newEncounter.id;
		this.encounters.push(newEncounter);
	}

	private updateInitiativeOrder() {
		const currentEncounter = this.getCurrentEncounter();
		currentEncounter.participants.sort((a, b) => b.initiative - a.initiative);
	}

	private getCurrentEncounter(): Encounter {
		if (!this.currentEncounterId) {
			throw new Error('No active encounter');
		}
		const currentEncounter = this.encounters.find((enc) => enc.id === this.currentEncounterId);
		if (!currentEncounter) {
			throw new Error('Encounter not found');
		}
		return currentEncounter;
	}

	public getCurrentEncounterId(): string | null {
		return this.currentEncounterId;
	}

	private updateLocalStorage() {
		localStorage.setItem('encounters', JSON.stringify(this.encounters));
		localStorage.setItem('characters', JSON.stringify(this.characters));
	}

	getStoredCharacters(): Character[] {
		const storedCharacters = localStorage.getItem('characters');
		return storedCharacters ? JSON.parse(storedCharacters) : [];
	}

	getStoredEncounters(): Encounter[] {
		const storedEncounters = localStorage.getItem('encounters');
		return storedEncounters ? JSON.parse(storedEncounters) : [];
	}

	private generateId(): string {
		return Math.random().toString(36).substr(2, 9);
	}
}