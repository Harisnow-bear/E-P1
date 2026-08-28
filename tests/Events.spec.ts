import { test, expect, Page } from '@playwright/test';

const url: string = 'https://eventhub.rahulshettyacademy.com';

test.skip('Register User', async ({ page }) => {
    await page.goto(url + '/register');
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');
    await createUser('Hari@example.com', 'Password@123', page);
    // await page.getByPlaceholder('you@email.com').fill();
    // await page.getByTestId('register-password').fill();
    // await page.getByPlaceholder('Repeat your password').fill();
    // await page.getByTestId('register-btn').click();
    //     await createUser('Hari@events.com','Hari@123',page);

    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true })
    console.log('User Registered Successfully');
})

async function createUser(email: string, password: string, page: Page) {
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.getByPlaceholder('Repeat your password').fill(password);
    await page.getByTestId('register-btn').click();

}



test.beforeEach('Login as User', async ({ page }) => {
    //login
    await page.goto(url + '/login');
    await page.locator('#email').fill('one@one8.com');
    await page.locator('#password').fill('TheOne@2026');
    await page.locator('#login-btn').click();
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');
    await page.getByText('one@one8.com').isVisible();
    await page.screenshot({ path: 'screenshots/login.png' })
    const account = page.getByText('one@one8.com', { exact: true });
    console.log('Logged in as : '+await account.textContent());
})

test.skip('Login with wrong parameter', async ({ page }) => {
    await page.goto(url + '/login');
    await page.locator('#email').fill('john.doe@example.com');
    await page.locator('#password').fill('Password@123');
    await page.locator('#login-btn').click();
    const errorMsg = await page.getByText('Invalid email or password');
    await expect(errorMsg).toBeVisible();
    console.log(errorMsg.innerText());

});

test.skip('book an event as user', async ({ page }) => {
    await page.locator(':text-is("Events")').click();
    await page.locator('//div/a/h3[contains(text(),"Los Angeles")]').click();
    await page.getByLabel('Full Name*').fill('Hari');
    await page.getByLabel('Email*').fill('one@one8.com');
    await page.getByLabel('Phone Number*').fill('+918556677665');
    await page.locator('#confirm-booking').click();
    const msg = await page.locator('h3:has-text("Booking Confirmed")');
    console.log(msg.textContent());
})

test('Book an random event', async ({ page }) => {

    await page.locator(':text-is("Events")').click();
    const bookNow = page.getByRole('link', { name: 'Book Now' });
    await expect(bookNow.last()).toBeVisible();
    const count =  await bookNow.count();

    console.log('Total events available for booking: ' + count);

    for (let i = 0; i < count; i++) {
        await bookNow.nth(i).click();
        break;
    }
   
    await page.getByLabel('Full Name*').fill('Hari');
    await page.getByLabel('Email*').fill('one@one8.com');
    await page.getByLabel('Phone Number*').fill('+918556677665');
    const confirm = page.locator('#confirm-booking')
    await confirm.click();
    const bookingStatus =  page.locator('p:has-text("Your tickets are reserved.")')
    await expect(bookingStatus).toBeVisible();
})

test.afterEach('logout' , async ({page}) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('heading', { name: 'Sign in to EventHub' })).toBeVisible();
    console.log('Logged out successfully');
})




