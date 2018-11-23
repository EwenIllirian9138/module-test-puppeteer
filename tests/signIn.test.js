const timeout = 40000;
const name = "Kratos";
const password ="123456";
//test pour sign In
describe("signIn", () => {
    let page;
    let page2;

    // vérification du chargement de la page d'accueil
    test('signIn', async () => {

        await page.goto('http://localhost:8000/');
        await page.waitForSelector('.form-control');
        await page.screenshot({ path: './tests/img/Accueil.png' });
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.screenshot({path: './tests/img/dropDownSignIn.png'});
        await page.waitForSelector('input[name=username]');
        await page.type('input[name=username]', name);
        await page.type('input[name=password]', password);
        await page.screenshot({ path: './tests/img/passWord2.png' });
        await page.$eval('input[name=login]', el => el.click());

        await page.waitForSelector('.login-name');
        const html = await page.$eval('body', e => e.innerHTML);
        expect(html).toContain("Kratos");
        await page.screenshot({ path: './tests/img/logginSucces.png' });
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.screenshot({ path: './tests/img/dropDown.png' });
        await page.evaluate( () => {
            Array.from( document.querySelectorAll( '.dropdown-menu.pull-right a' ) ).filter( el => el.textContent === 'Dashboard' )[0].click();
        });
        await page.screenshot({ path: './tests/img/menu.png' });
        await page.$eval('a[href="#links"]', el => el.click());
        // faire un await for selector
        await page.waitForSelector('#user_links_table td');
        await page.screenshot({ path: './tests/img/links.png' });

        const resultStart = parseInt( await page.$eval('#user_links_table td:nth-child(3)', e => e.innerHTML));
        console.log(typeof resultStart);
        console.log(resultStart);

        page2 = await global.__BROWSER__.newPage();
        await page2.goto('http://localhost:8000/0');

        // refresh la page des links
        await page.reload();
        await page.waitForSelector('#user_links_table td:nth-child(3)');
        await page.screenshot({ path: './tests/img/links2.png' });
        const resultEnd = parseInt( await page.$eval('#user_links_table td:nth-child(3)', e => e.innerHTML));
        console.log(typeof resultEnd);
        console.log(resultEnd);
        expect(resultEnd - resultStart).toEqual(1);


    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout);
});
