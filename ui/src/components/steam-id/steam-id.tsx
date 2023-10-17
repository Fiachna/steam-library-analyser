import { FC, useContext } from "react";
import { Button, Card, Form, Input, Typography } from "antd";
import { SteamIdSetterContext } from "../context/steam-games/steam-game-context";

type FieldType = {
	steamId?: string
}

const { Title } = Typography

export const SteamIdCard: FC = () => {
	const setSteamId = useContext(SteamIdSetterContext)

	return (
		<Card>
			<Title level={1}>Steam Library Analyser</Title>
			<Form
				layout="inline"
				onFinish={({steamId}) => setSteamId(steamId)}
				onFinishFailed={() => {}}
			>
				<Form.Item<FieldType>
					label="Steam ID"
					name="steamId"
					rules={[{ required: true, message: 'Please enter your steam ID' }]}	
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}