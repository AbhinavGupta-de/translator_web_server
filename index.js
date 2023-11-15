// const express = require('express');
import express from 'express';
import BhashiniTranslator from '@scaler-school-of-technology/bhashini-web-translator';

import dotenv from 'dotenv';
import { fetchBodyFromUrl } from './fetchHTML.js';

dotenv.config();
const translator = new BhashiniTranslator(
	process.env.BHASHINI_API_KEY,
	process.env.BHASHINI_USER_ID
);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello, Welcome to translate app!');
});

app.get('/translate', (req, res) => {
	var { url } = req.body;
	translate(url).then(res.redirect('/translated'));
});

const translate = async (url) => {
	try {
		const bodyContent = await fetchBodyFromUrl(url);
		const translated = await translator.translateDOM(bodyContent);
	} catch (error) {
		console.error(error);
	}
};

app.get('/translated', (req, res) => {
	// * Use pakage function to translate
	// * translate(url) and it will return a DOM element with translated text
	// * set that element to a variable and send it as response
	res.send('Hi');
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
