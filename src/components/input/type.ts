export type InputType = 'price' | 'contribution' | 'time' | 'payment'

export const InputState = {
    price: /^[0-9]{2,8}$/,
    contribution: /^[0-9]{2,7}$/,
    time: /^[0-9]{1,2}$/,
    payment: /^[0-9]{4,7}$/
}

export const InputRange = {
    price: "10000000",
    contribution: "25",
    time: "30",
    payment: "2654"
}

export const InputError = {
    price: "Стоимость недвижимости не может превышать 10,000,000",
    contribution: "Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости",
    time: "Cрок ипотеки не может превышать 30 лет",
    payment: "Размер ежемесячного платежа не может быть меньше 2,654 иначе срок будет больше 30 лет"
}

export const InputWarning = {
    price: "",
    contribution: "Cумма финансирования:100,000 ₪ Процент финансирования:10%",
    time: "",
    payment: "Увеличьте ежемесячный платеж и переплачивайте меньше"
}