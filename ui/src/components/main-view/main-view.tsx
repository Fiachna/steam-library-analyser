import { Layout, Space } from "antd";
import { FC } from "react";
import { SteamGamesContextContainer } from "../context/steam-games/steam-game-context";
import { SteamIdCard } from "../steam-id/steam-id";
import { SteamLibraryDetails } from "../steam-library-details/steam-library-details";

const { Header, Footer, Content } = Layout

const contentStyles: React.CSSProperties = {
	minHeight: '90vh',
	padding: '24px'
}

export const MainView: FC = () => {
	return (
		<Layout>
			<Header />
			<Content style={contentStyles}>
				<SteamGamesContextContainer>
					<Space
						direction="vertical"
						size={16}
					>
						<SteamIdCard />
						<SteamLibraryDetails />
					</Space>
				</SteamGamesContextContainer>
			</Content>
			<Footer />
		</Layout>
	)
}