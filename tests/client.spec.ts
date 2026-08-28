import {test , expect} from '@playwright/test'
import url from '../config/urlconfig.json'

test.skip('login', async ({page})=>{
    await page.goto(url.clientappurl);
    await page.getByRole('link' ,{name : 'Register'}).click();
    await page.getByLabel('First Name').fill('Julius');
    await page.getByLabel('Last Name').fill('Ceasar');
    await page.getByPlaceholder('email@example.com').fill('ceasars@salad.com');
    await page.locator('#userMobile').fill('8383939392');
    await page.locator('[formcontrolname="occupation"]').selectOption('Doctor');
    await page.locator('input[value="Male"]').click();
    await page.locator('#userPassword').fill('Julio@123');
    await page.locator('#confirmPassword').fill('Julio@123');
    await page.getByRole('checkbox').click();
    await page.locator('#login').click();
    await expect( page.getByRole('heading', { name: 'Account Created Successfully' })).toBeVisible();

})