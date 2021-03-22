let result;
const option1 = new RegExp('pattern');

// /abc/            Идущие подряд символы abc
// /[abc]/          Один из символов a, b или c
// /[^abc]/         Ни один из символов, т. е. не а, не b и не c
// /[a-z]/          Диапазон символов, идущих подряд в таблице Unicode
// /\b/             Граница слова
// /\B/             Не граница слова
// /\d/             Цифра
// /\D/             Не цифра
// /\w/             Латинская буква, цифра или _
// /\W/             Не латинская буква, не цифра и не _
// /\s/             Пробельный символ
// /\S/             Непробельный символ
// /a{3}/           Строго 3 символа а подряд
// /a{2,4}/         От 2 до 4 символов а подряд
// /a+/             1 и более символов а подряд
// /a*/             0 и более символов а подряд
// /a?/             0 или 1 символ а
// /./              Один любой символ, кроме переноса строки



let str = "asdfasdsdfklj 'asdfasd asdfasdf' i've asdfasdfasdfsdaf 'asd' i've it's asdfasdf vczxcv'f?aren't";
const exceptionWords = [
    "aren't",
    "i've",
    "it's",
    "i'm",
];
let newsrt = str;


for(exception of exceptionWords){
    let re = new RegExp(exception, "gi");
    if (re.test(str)){
        let result = exception.replace("'", '0_0');
        newsrt = newsrt.replace(re, result);
        console.log(newsrt);
    }
}

var regexp = /'/g;
result = newsrt.replace(regexp, '"');
regexp = /0_0/g
result = result.replace(regexp, "'");

console.log(result);