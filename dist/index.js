"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productFunctions_1 = require("./productFunctions");
const cartFunctions_1 = require("./cartFunctions");
const electronics = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        category: 'electronics',
        warrantyPeriod: 24
    }
];
const clothing = [
    {
        id: 2,
        name: "Футболка",
        price: 500,
        category: 'clothing',
        size: 'M',
        material: 'Cotton'
    }
];
const phone = (0, productFunctions_1.findProduct)(electronics, 1);
console.log("Знайдений товар:", phone);
const affordableClothing = (0, productFunctions_1.filterByPrice)(clothing, 600);
console.log("Доступний одяг:", affordableClothing);
let cart = [];
if (phone) {
    cart = (0, cartFunctions_1.addToCart)(cart, phone, 1);
}
const total = (0, cartFunctions_1.calculateTotal)(cart);
console.log("Загальна вартість:", total);
