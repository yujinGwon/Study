const axios = require("axios");
const cheerio = require("cheerio");
const { exit } = require("process");
const readline = require("readline");

const std = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 최대 79개? 
std.setPrompt("아이템의 개수를 입력하세요.(숫자 입력후 엔터): ");

const getHTML = async() => {
    try {
        return await axios.get("https://www.okmall.com/products/list?cate=20009021&item_type=&page=1&sort=POINT&gi_num=2983");
    } catch (err) {
        console.log(err);
    }
}

const parsing = async (cnt) => {
    console.log('==== 크롤링 시작 ======');
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $bootsList = $(".item_box");
    
    let boots = [];
    let i = 0;

    
    $bootsList.each((idx, node) => {
        if (i< cnt) {
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

    if (cnt > i) {
        console.log('최대 ' + boots.length + ' 위 까지 크롤링 합니다.');
    }
    console.log('==== 크롤링 완료 ======');

    let j = 0;
    const callback = () => {
        if (j >= boots.length) {
            clearInterval(interval);
            exit();
        }
        console.log(boots[j++]);
    }; 

    //console.log('==== 출력 시작 ======');

    let interval = setInterval(callback, 100);
}

std.prompt();
std.on("line", (cnt) => {
    parsing(cnt);  
});