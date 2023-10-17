interface GameInfoOverride {
	appId?: number,
	name?: string,
	playtimeMinutes?: number
	timeLastPlayed?: number
}

export const buildSteamOwnedGameResponse = (overrides: GameInfoOverride[]) => {
	return {
		response: {
			game_count: overrides.length,
			games: overrides.map(buildSteamGameInfoResponse)
		}
	}
}

export const buildSteamGameInfoResponse = ({ appId, name, playtimeMinutes, timeLastPlayed }: GameInfoOverride) => {
	return {
		appId: appId || 0,
		name: name || 'no name',
		playtime_forever: playtimeMinutes || 0,
		img_icon_url: 'icon',
		has_community_visible_stats: true,
		playtime_windows_forever: 0,
		playtime_mac_forever: 0,
		playtime_linux_forever: 0,
		rtime_last_played: timeLastPlayed || 0,
		playtime_disconnected: 0
	}
}