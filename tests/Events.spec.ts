import{test,expect, Page} from '@playwright/test';

const url : string = 'https://eventhub.rahulshettyacademy.com/register';

test('Register User', async ({page}) => {
    await page.goto(url);
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');
    await createUser('john.doe@example.com', 'Password@123', page);
    // await page.getByPlaceholder('you@email.com').fill();
    // await page.getByTestId('register-password').fill();
    // await page.getByPlaceholder('Repeat your password').fill();
    // await page.getByTestId('register-btn').click();
//     await createUser('Hari@events.com','Hari@123',page);
    await page.screenshot({path : 'screenshots/homepage.png', fullPage : true})
   console.log('User Registered Successfully');
})

async function createUser(email: string, password : string, page : Page) {
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.getByPlaceholder('Repeat your password').fill(password);
    await page.getByTestId('register-btn').click();
}



test ('Login as User',async ({page}) => {

    await page.goto(url+ '/login');
    await page.locator('#email').fill('john.doe@example.com');
    await page.locator('#password').fill('Password@123');
    await page.getByText('Sign In').click();
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');
})

