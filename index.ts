import express from 'express'
import dotenv from 'dotenv'
import { analyseGameLibrary, fetchGetGameLibrary } from './src/services/steam/steam-service';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (_, res) => {
	res.send('Express + TypeScript Server');
});

app.get('/steam/:steamId', async (req, res) => {
	const { params } = req

	const steamResult = await fetchGetGameLibrary(params.steamId)
	res.send(analyseGameLibrary(steamResult))
})

app.listen(port, () => {
	console.info(`[server]: Server is running at http://localhost:${port}`);
});
