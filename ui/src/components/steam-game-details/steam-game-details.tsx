import { FC } from "react";
import { Card, Typography } from "antd";
import { SteamGame } from "../../types/steam-library";

interface Props {
	game: SteamGame
}

const { Paragraph, Title } = Typography

export const SteamGameDetails: FC<Props> = ({ game }) => {
	const dateFormatter = (timestamp: number) => {
		if (timestamp) {
			// convert UTC timestamp to milliseconds
			const date = new Date(timestamp * 1000)
	
			return `${date.toLocaleDateString('en', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})}`
		} else {
			return 'never'
		}
	}

	return (
		<Card style={{ height: '100%' }}>
			<Title level={4}>{game.name}</Title>
			<Paragraph>Play time: {game.playTimeHours.toLocaleString()} hours</Paragraph>
			<Paragraph>Last played: {dateFormatter(game.dateLastPlayed)}</Paragraph>
		</Card>
	)
}