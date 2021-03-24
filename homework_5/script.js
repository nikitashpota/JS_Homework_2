const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cart: [],
        searchLine: '',
        isVisibleCart: false,

    },
    methods:{
      changeisVisibleCart(){
        this.isVisibleCart = !this.isVisibleCart;
        console.log(this.isVisibleCart);
      },

      searchHandler(){
        if(this.searchLine == ''){
          this.filteredGoods == this.goods;
        }
        const regexp = new RegExp(this.searchLine, 'gi');
        this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
        console.log("Включен searchHandler");
      },

      addToCart(index){
          this.cart.push(this.filteredGoods[index]);
          console.log(this.cart);
      },

      removeToCart(index){
        this.cart.splice(index, 1);
      },

      makeGETRequest(url, callback){
        var xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            callback(xhr.responseText);
          }
        }
        xhr.open('GET', url, true);
        xhr.send();
      }
    },
    mounted(){
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
          console.log(this.filteredGoods);
        });
      }    
});

// class GoodsItem {
//     constructor(product_name, price) {
//         this.product_name = product_name;
//         this.price = price;
//     }
//     render() {
//         return `<div class="goods-item"><img src="img/1.jpg" alt="1"><h3>${this.product_name}</h3><p>${this.price}</p><button class = "search-button" type="button">Купить</button></div>`;
//     }
// }

// class Cart { // Класс корзины
//     constructor() {
//         this.goods = [];
//     }
//     add(good) {
//         this.goods.push(good);
//     }
// }

// class GoodsList {
//     constructor() {
//         this.goods = [];
//         this.filteredGoods = [];
//         this.cart = new Cart();
//     }
//     addGoodToCart(index) { // Метод для добавления элемента в коризну по указанному индексу
//         this.cart.add(this.filteredGoods[index]);
//     }



//     fetchGoods(url, cb = () => { }) {
//         url = `${url}/catalogData.json`
//         let promise = new Promise((resolve, reject) => {
//             let xhr;

//             if (window.XMLHttpRequest) {
//                 xhr = new XMLHttpRequest();
//             } else if (window.ActiveXObject) {
//                 xhr = new ActiveXObject("Microsoft.XMLHTTP");
//             }
//             xhr.open('GET', url, true);
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {
//                     resolve(xhr.responseText);
//                 }
//             }
//             xhr.send();
//         })
//         promise.then((goods) => {
//             this.goods = JSON.parse(goods);
//             this.filteredGoods = JSON.parse(goods);
//             cb();
//         })


//     }

//     filterGoods(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
//         this.render();

//         console.log(value);
//     }


//     render() {
//         let listHtml = '';
//         this.filteredGoods.forEach(good => {
//             const goodItem = new GoodsItem(good.product_name, good.price);
//             listHtml += goodItem.render();
//         });
//         document.querySelector('.goods-list').innerHTML = listHtml;
//     }
//     count() {
//         console.log(this.goods.reduce((acc, good) => acc + good.price, 0)); //метод reduce возращает сумму элементов списка
//     }

// }

// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// const list = new GoodsList();
// list.fetchGoods(API_URL, () => { list.render(); });
// //list.filterGoods('Мышка');

// let searchButton = document.querySelector('.search-button');
// let searchInput = document.querySelector('.search-string');

// searchButton.addEventListener('click', (e) => {
//     const value = searchInput.value;
//     list.filterGoods(value);

// });