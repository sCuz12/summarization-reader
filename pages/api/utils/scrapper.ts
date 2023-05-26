import ogs from 'open-graph-scraper';
import { gotScraping } from "got-scraping";

export const scrapeUrl = async (urlLink: string): Promise<any> => {
    try {

        const { body: html } = await gotScraping({
            responseType: 'json',
            url: urlLink,
            timeout: {
                request: 10000
            },
            followRedirect: true,
            maxRedirects: 20,
            headers: {
                "user-agent":
                    "curl/7.64.1",
            }
        }).then(({ body }) => {return body})



        // console.log('here');

        // const parser = new DOMParser();
        // var doc      = parser.parseFromString(html, "text/html");
        // const test   = doc.getElementsByClassName('price');

        // console.log('hererere',doc);

        // console.log('test', test);


        const options = {
            url: '',
            html: html,
             allMedia: true,

        };
        const { result } = await ogs(options);

        if (!result.success && !result.hasOwnProperty('ogImage') && !result.hasOwnProperty('ogTitle')) {
            throw new Error('No image found');
        }

        return result;


    } catch (error) {
        // console.log('error',error);

    }

    try {
        const { body: html } = await gotScraping({
            url: urlLink,
            timeout: {
                request: 10000
            },
            followRedirect: true,
            maxRedirects: 20,
        })


        const options = {
            url: '',
            html: html,
            // allMedia: true
        };
        const { result } = await ogs(options);

        if (!result.success && !result.hasOwnProperty('ogImage') && !result.hasOwnProperty('ogTitle')) {
            throw new Error('No image found');
        }

        return result;

    } catch (error) { }


    try {

        const { body: html } = await gotScraping({
            url: urlLink,
            timeout: {
                request: 10000
            },
            followRedirect: true,
            maxRedirects: 20,
            headers: {
                "user-agent":
                    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            }
        });


        const options = {
            url: '',
            html: html,
            // allMedia: true
        };
        const { result } = await ogs(options);

        if (!result.success && !result.hasOwnProperty('ogImage') && !result.hasOwnProperty('ogTitle')) {
            throw new Error('No image found');
        }

        return result;

    } catch (error) { }

    return undefined;

};
