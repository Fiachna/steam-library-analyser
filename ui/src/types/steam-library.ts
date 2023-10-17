export interface SteamGame {
	name: string,
	playTimeHours: number,
	dateLastPlayed: number
}

export interface SteamLibrary {
	games: SteamGame[],
	mostPlayedGame?: SteamGame,
	totalGames: number,
	totalPlayTimeHours: number,
	totalPlayTimeYears: number
}