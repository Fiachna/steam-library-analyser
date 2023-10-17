import { FC, useContext } from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import { SteamLibraryContext } from "../context/steam-games/steam-game-context";
import { SteamGameDetails } from "../steam-game-details/steam-game-details";

const { Paragraph } = Typography

export const SteamLibraryDetails: FC = () => {
	const library = useContext(SteamLibraryContext)

	return (
		<Card>
			<Row gutter={16}>
				<Col span={12}>
					<Paragraph>Games in Library: {library.totalGames}</Paragraph>
					<Paragraph>Total Hours Played: {library.totalPlayTimeHours.toLocaleString()}</Paragraph>
					<Paragraph>Total Years Spent Playing Games: {library.totalPlayTimeYears.toLocaleString()}</Paragraph>
				</Col>
				<Col span={12}>{library.mostPlayedGame && <SteamGameDetails game={library.mostPlayedGame} />}</Col>
			</Row>
			<Divider />
			<Row gutter={[16, 16]} align='stretch'>
				{library.games.map((game) => (
					<Col span={6}>
						<SteamGameDetails game={game} />
					</Col>
				))}
			</Row>
		</Card>
	)
}