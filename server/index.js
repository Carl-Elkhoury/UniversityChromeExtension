const puppeteer = require('puppeteer');
const email = '';
const password = '';

var page;
let initPageAndExtract = (async () => {
    const browser = await puppeteer.launch({headless: true});
    try{
        page = await browser.newPage();
        await page.goto('https://mycourses2.mcgill.ca/d2l/loginh/', {waitUntil: 'networkidle2'});
        
        let button = await page.$('a#link1');
        button.click();
        
        await page.waitForNavigation({ waitUntil: 'networkidle0' })
    
        await page.type('#userNameInput', email);
        await page.type('#passwordInput', password)
    
        let signIn = await page.$('#submitButton');
        await signIn.click()
    
        await page.waitForNavigation({ waitUntil: 'networkidle0' })
        let bellButton = await page.$('div.d2l-navigation-s-notification[data-category="grades"]');
        await bellButton.click();
        await page.waitForSelector('#AB_DL_PH_Grades');
        // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        // console.log(bodyHTML);
        const notifications = await page.evaluate(() => {
            let lol = document.getElementById('AB_DL_PH_Grades').getElementsByTagName("li");
            return Array.from(lol).map((a) => {
                let spans = Array.from(a.getElementsByTagName('span')).map(p => p.textContent);
                spans.push((Array.from(a.getElementsByTagName('a')).map(a => a.href))[0]);
                return spans;
            })
        });
        return notifications
    }finally {
        browser.close();
    }
});


module.exports = {initPageAndExtract};