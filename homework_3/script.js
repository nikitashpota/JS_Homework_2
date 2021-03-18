class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class Cart { // Класс корзины
    constructor() {
        this.goods = [];
    }
    add(good) {
        this.goods.push(good);
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
        this.cart = new Cart();
    }
    addGoodToCart(index) { // Метод для добавления элемента в коризну по указанному индексу
        this.cart.add(this.filteredGoods[index]);
    }
    async fetchGoods(url, cb = () => { }) {
        url = `${url}/catalogData.json`
        let promise = new Promise((resolve, reject) => {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    resolve(xhr.responseText);
                }
            }
            xhr.send();
        })
        promise.then((goods) => {
            this.goods = JSON.parse(goods);
            console.log(this.goods);
            cb();
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    count() {
        console.log(this.goods.reduce((acc, good) => acc + good.price, 0)); //метод reduce возращает сумму элементов списка
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const list = new GoodsList();
list.fetchGoods(API_URL, () => { list.render(); });






