const timeout = 15000;

// test pour acceder au feedback
describe("feedback", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('feedback', async () => {
        await page.goto('http://polr.campus-grenoble.fr');
        await page.waitForSelector('.long-link-input');
        await page.screenshot({path: './tests/img/feedback1.png'});
        await page.waitForSelector('#doorbell-button');
        await page.$eval( '#doorbell-button', el => el.click() );
        await page.screenshot({path: './tests/img/feedback2.png'});

        await page.waitForSelector('#doorbell-feedback');
        await page.type('#doorbell-feedback', 'Hello There');

        await page.waitForSelector('#doorbell-email');
        await page.type('#doorbell-email', 'General.Kenobi@gmail.com');

        await page.screenshot({path: './tests/img/feedback3.png'});

        await page.$eval( '#doorbell-submit-button', el => el.click() );

        await page.waitForSelector('#doorbell-success', {
            visible: true,
          });
        await page.screenshot({path: './tests/img/feedback4.png'});
        

    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
