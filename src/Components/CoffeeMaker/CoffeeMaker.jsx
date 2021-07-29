import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from '../Atomar/Button/Button';

import './CoffeeMaker.scss';

/**
 * Информационное окно с выбранным товаром и внесенной суммой
 */
const CoffeeMakerDeposit = ({ deposit, item }) => {
    return (
        <div className="coffee__deposit">
            <div>Выбранный товар: {item?.name}</div>
            <div>Внесенная сумма: {deposit}</div>
        </div>
    );
};

/**
 * Товар кофемашины
 */
const CoffeeMakerItem = ({ item, checked, onChange }) => {
    return (
        <label
            className={cn([
                'coffee__goods',
                checked ? 'coffee__goods--checked' : '',
                item.stock === 0 ? 'coffee__goods--disabled' : '',
            ])}
        >
            <input
                type="radio"
                id={item.id}
                value={item.name}
                checked={checked}
                disabled={item.stock === 0}
                onChange={onChange}
            />
            <ul>
                <li>Напиток: {item.name}</li>
                <li>Цена: {item.price}</li>
                <li>Осталось: {item.stock}</li>
            </ul>
        </label>
    );
};

/**
 * Основной компонент кофемашины. Выводит информацию о товарах, сообщение о
 * удачной / неудачной покупке, управляет денежным оборотом
 */
export default function CoffeeMaker({
    deposit,
    goods,
    selectedId,
    disabled,
    message,
    onSubmit,
    onChange,
    onCancel,
}) {
    return (
        <div className="coffee">
            <h3 className="coffee__heading">Кофемашина</h3>
            <form onSubmit={onSubmit} className="coffee__form form">
                <div className="form__goods">
                    {goods.map((item) => (
                        <CoffeeMakerItem
                            item={item}
                            checked={selectedId === item.id}
                            onChange={onChange}
                            key={item.id}
                        />
                    ))}
                </div>
                <CoffeeMakerDeposit
                    deposit={deposit}
                    item={goods.find((elem) => elem.id === selectedId)}
                />
                <div className="form__buttons">
                    <Button type="submit" caption="Купить" disabled={disabled} />
                    <Button
                        type="button"
                        caption="Получить сдачу"
                        onClick={onCancel}
                    />
                </div>
            </form>
            <div
                className={cn([
                    'coffee__message',
                    message.err
                        ? 'coffee__message--error'
                        : 'coffee__message--success',
                ])}
            >
                {message.text}
            </div>
        </div>
    );
}

const itemProps = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        stock: PropTypes.number,
    }),
};

CoffeeMaker.propTypes = {
    /**
     * Сумма монет
     */
    deposit: PropTypes.number,
    /**
     * Товары
     */
    goods: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            stock: PropTypes.number,
        }),
    ),
    /**
     * Id выбранного товара
     */
    selectedId: PropTypes.string,
    /**
     * Индикатор отключения кнопки покупки
     */
    disabled: PropTypes.bool,
    /**
     * Объект сообщения
     * @example {err: true, text: 'Такого товара не существует'}
     */
    message: PropTypes.shape({ err: PropTypes.bool, text: PropTypes.string }),
    /**
     * Обработки формы покупки
     */
    onSubmit: PropTypes.func,
    /**
     * Обработчик изменения товара для покупки
     */
    onChange: PropTypes.func,
    /**
     * Обработчик возврата денежных средств
     */
    onCancel: PropTypes.func,
};

CoffeeMaker.defaultProps = {
    deposit: 0,
    goods: [],
    selectedId: '',
    disabled: false,
    message: { err: false, text: '' },
    onSubmit: () => {},
    onChange: () => {},
    onCancel: () => {},
};

CoffeeMakerItem.propTypes = {
    /**
     * Товар для выбора
     */
    ...itemProps,
    /**
     * Показатель выбран ли товар
     */
    checked: PropTypes.bool,
    /**
     * Обработчик выбора товара
     */
    onChange: PropTypes.func,
};

CoffeeMakerItem.defaultProps = {
    item: {},
    checked: false,
    onChange: () => {},
};

CoffeeMakerDeposit.propTypes = {
    ...itemProps,
    deposit: PropTypes.number,
};

CoffeeMakerDeposit.defaultProps = {
    deposit: 0,
    item: {},
};
