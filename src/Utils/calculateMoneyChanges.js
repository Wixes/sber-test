/**
 * Функция расчета количества монет, необходимых для набора нужной суммы
 * @param {object} coins - монеты, в которых необходимо высчитать количество
 * @param {*} sum - сумма, которую необходимо набрать монетами
 * @returns
 */
export default function calculateMoneyChanges(
    coins = { 1: 0, 2: 0, 5: 0, 10: 0 },
    sum,
) {
    // Количество монет суммарно
    const newCoins = {};
    let newSum = sum;
    Object.keys(coins)
        .sort((a, b) => b - a)
        .forEach((key) => {
            // количество монет одного формата, полученных при делении
            const coinsCount = Math.floor(newSum / key);
            newCoins[key] = coinsCount;
            newSum -= coinsCount * key;
        });
    return { ...newCoins };
}
