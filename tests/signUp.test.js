const timeout = 15000;
const name = "Kratos";
const password = "123456";
const email = "kratos@gmail.com";

// série de tests pour l'inscription
describe("Tests signUp", () => {
    let page;

    // charger la page signup
    test('sign up', async () => {
        await page.goto('http://polr.campus-grenoble.fr');
        await page.waitForSelector('nav[role="navigation"]');
        await page.screenshot({path : './tests/img/débug1.png'});

        // click sur le lien "signUp" de la navigation
        await page.evaluate(() => {
            Array.from(document.querySelectorAll('nav[role="navigation"] a')).filter(el => el.textContent === 'Sign Up')[0].click();
        });
        await page.screenshot({path : './tests/img/signUp.png'});
        // on attend que l'élément "from" soit chargé
        await page.waitForSelector('form[action="/signup]');
        // on récupère le code HTML
        const html = await page.$eval('.title', e => e.innerHTML);
        expect(html).toContain("Register")
    }, timeout);

    test('register', async () => {
        await page.goto('http://polr.campus-grenoble.fr/signup');
        await page.waitForSelector('form[action="/signup]');
        const html = await page.$eval('.title', e => e.innerHTML);
        expect(html).toContain("Register");

        await page.waitForSelector(".content-div input[name='username']");
        await page.type(".content-div input[name='username']", name, {delay : 100});
        await page.screenshot({path : './tests/img/username.png'});

        await page.waitForSelector(".content-div input[name='password']");
        await page.type(".content-div input[name='password']", password, {delay : 100});
        await page.screenshot({path : './tests/img/password.png'});

        await page.waitForSelector(".content-div input[name='email']");
        await page.type(".content-div input[name='email']", email, {delay : 100});
        await page.screenshot({path : './tests/img/email.png'});

        await page.$eval('input[value="Register"]', el => el.click());

        await page.waitForSelector('input[value="Login"]');
        const html2 = await page.$eval('.title', e => e.innerHTML);
        expect(html2).toContain("Login");

        const url = await page.url();
        expect(url).toContain("/login");

    }, timeout);

        // cette fonction est lancée avant chaque test de cette
        // série de tests
        beforeAll(async () => {
            // ouvrir un onglet dans le navigateur
            page = await global.__BROWSER__.newPage()
        }, timeout)
});
