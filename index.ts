import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { analyseGameLibrary, fetchGetGameLibrary } from './src/services/steam/steam-service';

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT;

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
	console.info(`[server]: Server is running`);
});
