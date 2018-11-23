const timeout = 40000;

const name = 'Zarrane';
const password = '123';
const newPassword ='456';
// test pour acceder au feedback
describe("feedback", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('psw', async () => {
        // await page.goto('http://polr.campus-grenoble.fr')
        // await page.waitForSelector('.long-link-input')

        await page.goto('http://polr.campus-grenoble.fr/');
        await page.waitForSelector('.form-control');
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.screenshot({ path: './tests/img/passWord1.png' });
        await page.waitForSelector('input[name=username]');

        await page.type('input[name=username]', name);
        await page.type('input[name=password]', password);
        await page.screenshot({ path: './tests/img/passWord2.png' });

        await page.$eval('input[name=login]', el => el.click());

        await page.screenshot({ path: './tests/img/passWord3.png' });
        await page.goto('http://polr.campus-grenoble.fr/admin#settings');
        await page.screenshot({ path: './tests/img/passWord4.png' });
        
        await page.waitForSelector('input[name=current_password]');

        await page.type('input[name=current_password]', password);
        await page.type('input[name=new_password]', newPassword);
        await page.screenshot({ path: './tests/img/passWord5.png' });

        await page.$eval('.change-password-btn', el => el.click());

        await page.screenshot({ path: './tests/img/passWord6.png' });


    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
