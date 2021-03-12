//////////////////////////////////////////////ЗАДАНИЕ №3///////////////////////////////////////////////////
const toppingList = [
    { name: 'Сыр', price: 10, calorie: 20 },
    { name: 'Салат', price: 20, calorie: 5 },
    { name: 'Картофель', price: 15, calorie: 10 },
];

const hamburgerSize = [
    { name: 'Маленький', price: 50, calorie: 10 },
    { name: 'Большой', price: 100, calorie: 20 },
];

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = [];
    }
    addTopping(topping) {
        this.stuffing.push(topping);
    }
    removeTopping(topping) {
        this.stuffing.pop();
     }
    getToppings(topping) { }
    getSize() {
        let render = `<div class = '.card'><h3>${this.size.name}</h3></div>`;
        document.querySelector('.basketPrice').innerHTML += render;
    }
    getStuffing() {
        let stuffList = '';
        this.stuffing.forEach(stuff => {
            let render = `<div class = '.card'><h3>${stuff.name}</h3></div>`;
            stuffList += render;
        })
        document.querySelector('.basketPrice').innerHTML += stuffList;
    }
    calculatePrice() { 
        let stuffPrice = 0;
        stuffPrice += this.size.price;
        this.stuffing.forEach(stuff => {
            stuffPrice += stuff.price;
        })
        let render = `<div class = '.card'><h3>Стоимость вашего заказа: ${stuffPrice}</h3></div>`;
        document.querySelector('.basketPrice').innerHTML += render;
    }
    calculateCalories() { 
        let stuffCalorie = 0;
        stuffCalorie += this.size.calorie;
        this.stuffing.forEach(stuff => {
            stuffCalorie += stuff.calorie;
        })
        let render = `<div class = '.card'><h3>Калорийность вашего заказа: ${stuffCalorie}</h3></div>`;
        document.querySelector('.basketPrice').innerHTML += render;
    }
}

class Toppings {
    constructor(topping) {
        this.toppings = [];
    }
    addTopping(topping) {
        this.toppings.push(topping);
    }

}

let hamburger;
//let endPrice;

{//Управление кнопками и функциями
    let check1 = document.getElementById('check1'),
        check2 = document.getElementById('check2'),
        check3 = document.getElementById('check3'),
        check4 = document.getElementById('check4'),
        check5 = document.getElementById('check5');


    check1.onclick = function () {
        hamburger = new Hamburger(hamburgerSize[0], '');
        addResultBur(hamburgerSize[0].name);
        return hamburger;
    }
    check2.onclick = function () {
        hamburger = new Hamburger(hamburgerSize[1], '');
        addResultBur(hamburgerSize[1].name);
        return hamburger;
    }
    check3.onclick = function () {
        hamburger.addTopping(toppingList[0]);
        addResultStuff(toppingList[0].name);
    }
    check4.onclick = function () {
        hamburger.addTopping(toppingList[1]);
        addResultStuff(toppingList[1].name);
    }
    check5.onclick = function () {
        hamburger.addTopping(toppingList[2]);
        addResultStuff(toppingList[2].name);
    }
}

//Функция отображения конструктора бургера для булочек
function addResultBur(text){
    let basketDiv = document.querySelector('.basketDiv');
    let div = document.createElement('div');
    div.className = 'basketProduct';
    // div.onclick = function () { div.remove(); };
    div.innerHTML += text;
    basketDiv.prepend(div);
}
//Функция отображения конструктора бургера для начинки
function addResultStuff(text){
    let basketDiv = document.querySelector('.basketDiv');
    let div = document.createElement('div');
    div.className = 'basketProduct';
    div.onclick = function () { div.remove(); hamburger.removeTopping()};
    div.innerHTML += text;
    basketDiv.prepend(div);
}

run.onclick = function () {
    hamburger.getSize();
    hamburger.getStuffing();
    hamburger.calculatePrice();
    hamburger.calculateCalories();
}


//console.log(hamburger);