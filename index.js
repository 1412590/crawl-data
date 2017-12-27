require 'json'
const puppeteer = require('puppeteer');

(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('http://www.kqxs.vn/');

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const articles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('tbody > tr > td');

        titleLinks = [...titleLinks];
        let articles = titleLinks.map(link => link.textContent);
        return articles;
    });
    File.open("./temp.json", "w") { 
        | f | f << articles.to_json
    }
    
    // In ra kết quả và đóng trình duyệt
    console.log(articles);
    await browser.close();
})();