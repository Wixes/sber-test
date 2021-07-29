import PropTypes from 'prop-types';
import cn from 'classnames';
import './Button.scss';

/**
 *  Атомарный компонент кнопки
 */
export default function Button({
    caption,
    type = 'button',
    disabled = false,
    classnames = '',
    children,
    onClick = () => {},
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(['button', classnames])}
            onClick={onClick}
        >
            {caption || children}
        </button>
    );
}

Button.propTypes = {
    /**
     * Содержание
     */
    caption: PropTypes.string,
    /**
     * Тип
     */
    type: PropTypes.string,
    /**
     * Индикатор отключения
     */
    disabled: PropTypes.bool,
    /**
     * Дополнительный класс
     */
    classnames: PropTypes.string,
    /**
     * Функция клика
     */
    onClick: PropTypes.func,
    /**
     * Передаваемый компонент
     */
    children: PropTypes.node,
};

Button.defaultProps = {
    caption: '',
    type: 'button',
    disabled: false,
    classnames: '',
    onClick: () => {},
    children: null,
};
