//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    // Проверяем, что n - число
    if (typeof n !== 'number') {
        return false;
    }

    // Используем побитовый сдвиг вправо для преобразования в целое число
    // и сравниваем результат с оригинальным числом
    return (n | 0) === n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    const result = [];

    for (let i = 2; i <= 20; i += 2) {
        result.push(i);
    }

    return result;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i += 1) {
        sum += i;
    }

    return sum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if (n === 0) {
        return 0;
    }

    return n + recSumTo(n - 1);
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let fact = 1;
    for (let i = 1; i <= n; i += 1) {
        fact *= i;
    }
    return fact;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    if (n > 1) {
        return isBinary(n / 2);
    }
    if (n < 1) {
        return false;
    }
    if (n === 1) {
        return true;
    }
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;

    // Возвращаемая функция
    return function (newValue) {
        //возращает функцию (аналог делегатов в c#)
        if (operatorFn) {
            storedValue = operatorFn(storedValue, newValue);
        }
        return storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let current = start;

    // Возвращаемая функция-генератор
    return function generator() {
        const valueToReturn = current;
        current += step;
        return valueToReturn;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (Object.is(firstObject, secondObject)) {
        return true;
    }

    // Обработка случая, когда одно из значений - объект
    if (
        typeof firstObject === 'object' &&
        firstObject !== null &&
        typeof secondObject === 'object' &&
        secondObject !== null
    ) {
        const keys1 = Object.keys(firstObject);
        const keys2 = Object.keys(secondObject);

        // Сравниваем количество ключей
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Сравниваем значения для каждого ключа рекурсивно
        for (const key of keys1) {
            if (
                !keys2.includes(key) ||
                !deepEqual(firstObject[key], secondObject[key])
            ) {
                return false;
            }
        }

        return true;
    }

    return false; // В случае простых типов данных, которые не равны
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
