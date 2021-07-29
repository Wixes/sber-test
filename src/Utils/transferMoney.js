/**
 * Функция перевода средств из одного объекта в другой
 * @param {Object} fromObj - объект из которого необходимо провести трансфер
 * @param {Object} toObj - объект в который необходимо провести трансфер
 * @returns {Object}
 */
export default function transferMoney(fromObj, toObj) {
    const tempToObj = { ...toObj };
    const tempFromObj = { ...fromObj };
    Object.entries(fromObj).forEach(([key, value]) => {
        tempToObj[key] += value;
        tempFromObj[key] -= value;
    });
    return { from: tempFromObj, to: tempToObj };
}
