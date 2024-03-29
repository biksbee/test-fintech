export type InputType = 'price' | 'contribution' | 'time' | 'payment'

export const InputState = {
    price: /^[0-9]{4,8}$/,
    contribution: /^[0-9]{2,8}$/,
    time: /^[0-9]{1,2}$/,
    payment: /^[0-9]{4,8}$/
}

export const InputRangeMax = {
    price: 10000000,
    contribution: 1,
    time: 30,
    payment: 51130
}
export const InputRangeMin = {
    price: 0,
    contribution: 0.25,
    time: 4,
    payment: 2654
}

export const InputError = {
    price: "Стоимость недвижимости не может превышать 10,000,000",
    contribution: "Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости",
    time: "Cрок ипотеки не может превышать 30 лет",
    payment: "Размер ежемесячного платежа не может быть меньше 2,654 иначе срок будет больше 30 лет"
}

export const InputWarning = {
    price: "",
    contribution: "",
    time: "",
    payment: "Увеличьте ежемесячный платеж и переплачивайте меньше"
}