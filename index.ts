import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { analyseGameLibrary, fetchGetGameLibrary } from './src/services/steam/steam-service';

dotenv.config();

const app = express();
app.use(cors())

const port = process.env.PORT;

app.get('/', (_, res) => {
	res.send('Express + TypeScript Server');
});

app.get('/steam/:steamId', async (req, res) => {
	const { params } = req

	try {
		const steamResult = await fetchGetGameLibrary(params.steamId)
		res.send(analyseGameLibrary(steamResult))
	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

app.listen(port, () => {
	console.info(`[server]: Server is running at http://localhost:${port}`);
});
