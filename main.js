'use strict'
const price = {
    beer: 35,
    wine: 120,
    pepsi: 20
}
let sum;
let balance = 1000;
let storage = {
    beer: 100,
    wine: 50,
    pepsi: 150
}
let basket = [];

function alkoShop() {

    function getBalance() {
        return balance
    }

    function getBeerCount() {
        return storage.beer
    }

    function getWineCount() {
        return storage.wine
    }

    function getPepsiCount() {
        return storage.pepsi
    }

    function toBasket(count, drink) {
        let order = {};
        order.count = count;
        order.drink = drink;
        let check;
        if (storage[drink] >= order.count) {
            if (basket.length == 0 && count != '') {
                basket.push(order);
            } else if (basket.length != 0 && count != '') {
                if (basket.some(function (elem) {
                        return elem.drink == order.drink;
                    })) {
                    basket.map(function (elem) {
                        if (elem.drink == order.drink) {
                            if ((Number(elem.count) + Number(order.count)) <= storage[drink]) {
                                let counter = Number(elem.count);
                                counter += +order.count
                                elem.count = counter;
                            } else if ((elem.count + order.count) > storage[drink]) {
                                check = true;
                            }
                        }
                    })
                } else {
                    basket.push(order);
                }
            }
        } else {
            check = true
        }
        return check
    }

    function addToBasketList() {
        let result = '';
        basket.map(function (elem, i) {
            result += `${elem.drink} : ${elem.count} pieces` + '\n'
        })
        return result
    }

    function buy() {
        sum = 0;
        basket.forEach(function (elem) {
            storage[elem.drink] -= elem.count;
            sum += (elem.count) * price[elem.drink];
        })
        balance += sum;
    }

    function addToReceiptList() {
        let result = '';
        basket.map(function (elem) {
            result += `${elem.drink} : ${elem.count} pieces` + '<br>'
        })
        result += `sum : ${sum}`;
        basket = []
        return result
    }
    return {
        beerCount: getBeerCount,
        wineCount: getWineCount,
        pepsiCount: getPepsiCount,
        balance: getBalance,
        toBasket: toBasket,
        addToBasketList: addToBasketList,
        buy: buy,
        addToReceiptList: addToReceiptList
    }
}

let shop = alkoShop();
render();

document.getElementById('add').addEventListener('click', () => {
    if (shop.toBasket(document.getElementById('count').value, drink()) == true) {
        document.querySelector('.messageBlock').style.display = 'block'
        document.querySelector('.message').textContent = (`left ${storage[drink()]} ${drink()} write another count`);
    } else if (document.getElementById('count').value == '') {
        document.querySelector('.messageBlock').style.display = 'block';
        document.querySelector('.message').textContent = 'write count!'
    } else {
        document.getElementById('basket').textContent = shop.addToBasketList();
        document.getElementById('count').value = ''
    }
})

document.getElementById('buy').addEventListener('click', () => {
    if(basket.length == 0){
        document.querySelector('.messageBlock').style.display = 'block';
        document.querySelector('.message').textContent = 'choose any products'
    } else {
         shop.buy();
    document.querySelector('.block3').innerHTML = shop.addToReceiptList()
    render();
    document.getElementById('basket').textContent = ''   
    }

})
document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.messageBlock').style.display = 'none'
})
document.querySelector('.colseSvg').addEventListener('click', () => {
    document.querySelector('.messageBlock').style.display = 'none'
})

function render() {
    document.getElementById('beer').value = shop.beerCount() + ' pieces';
    document.getElementById('wine').value = shop.wineCount() + ' pieces';
    document.getElementById('pepsi').value = shop.pepsiCount() + ' pieces';
    document.getElementById('balance').value = shop.balance() + ' UAN';
}
let drink = function () {
    return document.querySelector('input[name="products"]:checked').value;
}