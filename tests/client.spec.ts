import {test , expect} from '@playwright/test'
import urls from '../config/urlconfig.json'

enum dropdownOptions {
  seller = 'Become a Seller',
  settings = 'Notification Settings',
  care = '24x7 Customer Care',
}

test('login', async ({page})=>{
    await page.goto(urls.clientappurl);
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

test.only("flipkart dropdown", async ({page}) => {
    await page.goto(urls.flipkarturl,{waitUntil: 'domcontentloaded'});
    await page.getByText('Products', { exact: true }).first().hover();
    await page.getByText(dropdownOptions.care).nth(1).click();
    // await page.locator('[ul.children]').getByRole('link', {name : 'Smartphone'}).click();
    const title =  page.title();
    console.log('Page Title : ' + title);
    await expect(title).resolves.toContain('Smartphones');   
    console.log('Page Loaded');

})