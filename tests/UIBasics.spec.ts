import { test, expect } from '@playwright/test';

const testPage:string = 'https://app.thetestingacademy.com/playwright/ttacart/';
const username:string = 'standard_user';
const password:string = 'tta_secret';

test.skip('My Test starts here', async  ({browser,page})=> {
await page.goto('https://www.google.com/');
await expect(page).toHaveTitle('Google');
console.log('Test is completed successfully');
}) 

test.beforeEach('Login Page', async  ({page})=> {
    await page.goto(testPage);
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button',{name:'Login'}).click();
   
    await expect(page).toHaveTitle('TTACart - Products');
    await console.log('Login successful');
})

test('Add to Cart', async({page})=>{
    const cartbutton = page.locator('button[data-product="tta-bike-light"]');
    await cartbutton.click();
    
    expect(cartbutton).toHaveText('Remove');
    console.log('Item added to cart successfully');

})

test.afterEach('Logout', async({page})=>{
    await page.locator('[data-test="open-menu"]').click();
    await page.getByText('Logout').click();

    await expect(page).toHaveTitle('TTACart - Login');
    console.log('Logout successful');
})