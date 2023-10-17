import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useMemo, useState } from "react"
import { SteamLibrary } from "../../../types/steam-library"

interface Props {
	children?: ReactNode
}

const emptyLibrary: SteamLibrary = {
	games: [],
	totalPlayTimeHours: 0,
	totalPlayTimeYears: 0,
	totalGames: 0
}

export const SteamLibraryContext = createContext<SteamLibrary>(emptyLibrary)
export const SteamIdSetterContext = createContext<Dispatch<SetStateAction<string>>>(() => '')

const useSteamLibrary = (steamId: string) => {
	const [steamLibrary, setSteamLibrary] = useState<SteamLibrary>(emptyLibrary)

	const fetchGetSteamLibrary = useMemo(async () => {
		if (steamId) {
			const libraryResponse = await fetch(`http://localhost:3000/steam/${steamId}`)
			return await libraryResponse.json()
		}

		return await emptyLibrary
	}, [steamId])

	useEffect(() => {
		const doRequestSteamLibrary = async () => {
			setSteamLibrary(await fetchGetSteamLibrary)
		}

		doRequestSteamLibrary()
	}, [steamId])

	return steamLibrary
}

export const SteamGamesContextContainer: FC<Props> = ({ children }) => {
	const [steamId, setSteamId] = useState('')
	const steamLibrary = useSteamLibrary(steamId)
	
	return (
		<SteamLibraryContext.Provider value={steamLibrary}>
			<SteamIdSetterContext.Provider value={setSteamId}>
				{children}
			</SteamIdSetterContext.Provider>
		</SteamLibraryContext.Provider>
	)
}