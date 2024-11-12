import {Electronics, Clothing, CartItem} from './types';
import { findProduct, filterByPrice } from './productFunctions';
import { addToCart, calculateTotal } from './cartFunctions';

const electronics: Electronics[] = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        category: 'electronics',
        warrantyPeriod: 24
    }
];

const clothing: Clothing[] = [
    {
        id: 2,
        name: "Футболка",
        price: 500,
        category: 'clothing',
        size: 'M',
        material: 'Cotton'
    }
];

const phone = findProduct(electronics, 1);
console.log("Знайдений товар:", phone);

const affordableClothing = filterByPrice(clothing, 600);
console.log("Доступний одяг:", affordableClothing);

let cart: CartItem<Electronics | Clothing>[] = [];
if (phone) {
    cart = addToCart(cart, phone, 1);
}
const total = calculateTotal(cart);
console.log("Загальна вартість:", total);
