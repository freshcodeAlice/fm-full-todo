/*
Генератори - це функції, які здатні призупинити свою роботу.

yield - ключево слово для зупинки функції-генератора
*/


function* generate() {
    console.log(1);
    console.log(2);
    const newArg = yield 11111; ////на цьому місці функція зупинилась, повернула об'єкт 
                                //// {value: те, шо було поряд з yield, done: чи дійшли до кінця}
    console.log(newArg);
     console.log(3);
     console.log(4);
     return 'Final value'
}

const iter = generate();
const res1 = iter.next();
console.log(res1);
const res2 = iter.next(5);
console.log(res2);

/*
Завдання: написати функцію-генератор, яка генерує числа від 0 до 100.
З кожним викликом число інкрементується на одиницю

За допомогою написаного генератора - скласти числа від 0 до 100.
*/


//for кожне наступне значення of перебираєма колекція
