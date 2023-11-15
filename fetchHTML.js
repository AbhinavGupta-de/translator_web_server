import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Fetches the body element content from the given URL.
 * @param {string} url - The URL of the web page.
 * @returns {Promise<string>} - A promise that resolves to the body element content.
 */
async function fetchBodyFromUrl(url) {
	try {
		// Fetch the HTML content from the URL using axios.
		const response = await axios.get(url);

		if (!response.data) {
			throw new Error(`Failed to fetch the webpage. No data received.`);
		}

		// Load the HTML content into Cheerio.
		const $ = cheerio.load(response.data);

		// Extract the body element content.
		const bodyContent = $('body').html();

		return bodyContent;
	} catch (error) {
		console.error(`An error occurred: ${error.message}`);
		throw error; // Rethrow the error for the calling code to handle.
	}
}

export { fetchBodyFromUrl };
