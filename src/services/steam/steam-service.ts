import { env } from "process"
import { SteamGameResponse, SteamOwnedGamesResponse } from "../../types/steam-response"

export interface AnalysedResults {
	totalGames: number
	totalPlayTimeHours: number
	totalPlayTimeYears: number
	mostPlayedGame?: AnalysedGame
	games: AnalysedGame[]
}

export interface AnalysedGame {
	name: string
	playTimeHours: number
	dateLastPlayed: number
}

export const fetchGetGameLibrary = async (steamId: string): Promise<SteamOwnedGamesResponse> => {
	const results = await fetch(`${env['STEAM_API_OWNED_GAMES_URL']}?key=${env['STEAM_API_KEY']}&steamId=${steamId}&include_appinfo=true&include_played_free_games=true`)
	return await results.json()
}

export const analyseGameLibrary = ({ response }: SteamOwnedGamesResponse): AnalysedResults => {
	const baseResults: AnalysedResults = { totalGames: response.game_count, totalPlayTimeHours: 0, totalPlayTimeYears: 0, games: [] }
	const analysedResults = response.games.reduce((accumulator, game) => {
		const analysedGame = analyseGame(game)
		accumulator.totalPlayTimeHours += analysedGame.playTimeHours
		accumulator.mostPlayedGame = comparePlayTimes(accumulator.mostPlayedGame, analysedGame)
		accumulator.games.push(analysedGame)

		return accumulator
	}, baseResults)

	analysedResults.totalPlayTimeYears = analysedResults.totalPlayTimeHours / 8760
	return analysedResults
}

export const analyseGame = (gameResponse: SteamGameResponse): AnalysedGame => {
	return {
		name: gameResponse.name,
		playTimeHours: gameResponse.playtime_forever / 60,
		dateLastPlayed: gameResponse.rtime_last_played
	}
}

const comparePlayTimes = (gameA?: AnalysedGame, gameB?: AnalysedGame): AnalysedGame | undefined => {
	if (gameA && gameB && gameA.playTimeHours < gameB.playTimeHours) {
		return gameB
	} else {
		return gameA || gameB
	}
}