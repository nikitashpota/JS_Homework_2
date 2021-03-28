const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('err', {
  template:
    `<p>Корзина пуста</p>`
});

Vue.component('header-line', {
  props: ['length'],
  computed: {
    inputVal: {
      get() {
        return this.search;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    searchComponent() {
      this.$emit('search-component')
    },
    isVisibleCartComponent() {
      this.$emit('visible-booline')
    }
  },
  template:
    `
  <div class="header-box">
    <input class="search-string" 
    v-model="inputVal"
    placeholder="Поиск..." type="text"/>
    <button class="search-button" @click = "searchComponent" type="button">Искать</button>
    <button class="cart-button" @click= "isVisibleCartComponent"  type="button">Корзина [{{length}}]</button>
  </div>
  `
});

//Список товаров корзине
Vue.component('cart', {
  props: ['visible'],
  methods: {

  },
  template:
    `<div 
   class="cart-block" v-if="visible">
    <slot></slot>
  </div>`
});

//Карточка товара в корзине
Vue.component('cart-item',
  {
    props: ['title', 'price', 'id'],
    methods: {
      removeToCart() {
        this.$emit('remove-to-cart', this.id)
      }
    },
    template:
      `
    <div :data-id="id" class="cart-item">
      <h4>{{ title }}</h4>
      <p>{{ price }}</p>
      <button class="cart-remove" @click="removeToCart">-</button>
    </div>
  `});

//Карточка товара в карзине
Vue.component('goods-item', {
  props: ['title', 'price', 'id'],
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.id);
    }
  },
  template:
    `
    <div :data-id="id" class="goods-item">
      <img src="img/1.jpg" alt="1">
      <h3>{{ title }}</h3>
      <p>{{ price }}</p>
      <button class = "search-button" v-on:click="addToCart" type="button">Купить</button>
    </div>
    `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    searchLine: '',
    isVisibleCart: true,

  },
  methods: {
    changeisVisibleCart() {
      this.isVisibleCart = !this.isVisibleCart;
      console.log(this.isVisibleCart);
    },

    searchHandler() {
      if (this.searchLine == '') {
        this.filteredGoods == this.goods;
      }
      const regexp = new RegExp(this.searchLine, 'gi');
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
      console.log("Включен searchHandler  " + this.searchLine);
    },

    addToCartHandler(id) {
      //const id = e.target.closest('.goods-item').dataset.id;
      const good = this.goods.find((item) => item.id_product == id);
      this.cart.push(good);
      console.log('addToCart запущен');
    },

    removeToCartHandler(id) {
      const index = this.goods.findIndex((item) => item.id_product == id);
      this.cart.splice(index - 1, 1);
      //const id = e.target.closest('.cart-item').dataset.id;
      console.log('removeToCartHandler запущен');

    },

    makeGETRequest(url, callback) {
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
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
      console.log(this.filteredGoods);
    });
  }
});
