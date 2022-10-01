const axios = require("axios");
const cheerio = require("cheerio");
const { exit } = require("process");
const readline = require("readline");

const std = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const getHTML = async() => {
    try {
        return await axios.get("https://www.okmall.com/products/list?cate=20009021&item_type=&page=1&sort=POINT&gi_num=2983");
    } catch (err) {
        console.log(err);
    }
}

const parsing = async () => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $bootsList = $(".item_box");
    
    let boots = [];
    let i = 0;

    $bootsList.each((idx, node) => {
        if (i< 10) {
            boots.push({
                rank: '[ ' + (idx + 1) + ' 위 ]' ,
                brand: $(node).find(".prName_Brand").text(),
                name: $(node).find(".prName_PrName").text(),
                size: $(node).find(".t_size").text(),
                
                img: $(node).find(".pImg").attr("data-original"),
                img2: $(node).find(".pImg2").attr("img2")
            })
            i++;
        }
    });

    console.log(boots);
    console.log('크롤링 완료');
    exit();
}

parsing();