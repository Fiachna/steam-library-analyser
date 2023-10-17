import { buildSteamGameInfoResponse, buildSteamOwnedGameResponse } from "../../factories/steam-game-response-factory";
import { SteamGameResponse, SteamOwnedGamesResponse } from "../../types/steam-response";
import { analyseGame, analyseGameLibrary } from "./steam-service";


describe('steam service methods', () => {
	describe('#analyzeGame', () => {
		let gameResponse: SteamGameResponse;

		beforeEach(() => {
			gameResponse = buildSteamGameInfoResponse({
				appId: 1,
				name: 'Game 1',
				playtimeMinutes: 600,
				timeLastPlayed: new Date('2023-03-01').getTime()
			})
		})

		it ('extracts the game name', () => {
			const result = analyseGame(gameResponse)

			expect(result.name).toEqual('Game 1')
		})

		it ('extracts the game playtime in hours', () => {
			const result = analyseGame(gameResponse)

			expect(result.playTimeHours).toEqual(10)
		})

		it ('extracts the date the game was last played as a UTC timestamp', () => {
			const result = analyseGame(gameResponse)

			expect(result.dateLastPlayed).toEqual(new Date('2023-03-01').getTime())
		})
	})

	describe('#analyzeGameLibrary', () => {
		let ownedGamesResponse: SteamOwnedGamesResponse;

		beforeEach(() => {
			ownedGamesResponse = buildSteamOwnedGameResponse([{
				appId: 1,
				name: 'Game 1',
				playtimeMinutes: 600,
				timeLastPlayed: new Date('2023-03-01').getTime()
			}, {
				appId: 2,
				name: 'Game 2',
				playtimeMinutes: 2400,
				timeLastPlayed: new Date('2023-10-03').getTime()
			}, {
				appId: 3,
				name: 'Game 3',
				playtimeMinutes: 30,
				timeLastPlayed: new Date('2021-01-12').getTime()
			}])
		})

		it('extracts the total game count', () => {
			const result = analyseGameLibrary(ownedGamesResponse)

			expect(result.totalGames).toEqual(3)
		})

		it('calculates total play time of all games in hours', () => {
			const result = analyseGameLibrary(ownedGamesResponse)

			expect(result.totalPlayTimeHours).toEqual(50.5)
		})

		it('calculates the total play time of all games in years', () => {
			const result = analyseGameLibrary(ownedGamesResponse)

			expect(result.totalPlayTimeYears).toBeCloseTo(0.0057)
		})

		it('determines the most played game', () => {
			const result = analyseGameLibrary(ownedGamesResponse)

			expect(result.mostPlayedGame).toEqual({
				name: 'Game 2',
				playTimeHours: 40,
				dateLastPlayed: new Date('2023-10-03').getTime()
			})
		})
	})
})