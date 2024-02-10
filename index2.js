const puppeteer = require('puppeteer');

async function scrapeRedditTopPosts(subreddit) {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`https://www.reddit.com/r/${subreddit}/`, {
        // await setTimout(() => {},5000)
        waitUntil: 'networkidle2' // Waits for the network to be idle (no more than 2 connections for at least 500 ms).
    });

    // Extract titles of top posts
    const titles = await page.evaluate(() => {
        const elements = document.querySelectorAll('a');
        const titles = Array.from(elements).map(element => element.innerText);
        return titles;
    });

    console.log(titles);

    await browser.close();
}

scrapeRedditTopPosts('node').catch(console.error);
