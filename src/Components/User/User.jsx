import PropTypes from 'prop-types';

import translator from '../../constants/translator';

import Button from '../Atomar/Button/Button';
import './User.scss';
/**
 * Компонент пользователя. Выводит монеты пользователя,
 * позволяет вносить депозит в кофемашину
 */
export default function User({ coins, onClick }) {
    return (
        <div className="user">
            <h3 className="user__heading">Депозит пользователя</h3>
            <div className="user__money">
                {Object.entries(coins).map(([key, value]) => (
                    <div className="user__coin" key={key}>
                        <Button
                            classnames="user__button"
                            onClick={() => onClick(key)}
                            disabled={value === 0}
                        >
                            {key}
                        </Button>
                        <span>
                            Монет номиналом {translator[key]}: {value} шт.
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const coinsProps = {
    /**
     * Монеты
     * @example {1: 10, 2: 10, 5: 10, 10: 10}
     */
    coins: PropTypes.shape({
        1: PropTypes.number,
        2: PropTypes.number,
        5: PropTypes.number,
        10: PropTypes.number,
    }),
};

User.propTypes = {
    ...coinsProps,
    /**
     * Обработчик внесения депозита
     */
    onClick: PropTypes.func,
};

User.defaultProps = {
    coins: {},
    onClick: () => {},
};
