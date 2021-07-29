import { connect } from 'react-redux';
import CoffeeMaker from '../Components/CoffeeMaker';
import {
    addSelectedItemAction,
    changeMessageAction,
    reduceStockAction,
    returnDepositAction,
} from '../Store/coffee';

function mapStateToProps(state) {
    return state;
}

function mergeProps(stateProps, dispatchProps) {
    const state = stateProps;
    const { dispatch } = dispatchProps;
    const { coffee } = state;
    const selectedItem = coffee.goods.find(
        (item) => item.id === coffee.selectedItemId,
    );
    const disabled =
        !selectedItem ||
        selectedItem?.stock === 0 ||
        selectedItem?.price > coffee.total;
    return {
        deposit: coffee.total,
        goods: coffee.goods,
        selectedId: coffee.selectedItemId,
        disabled,
        message: coffee.message,
        onSubmit: (evt) => {
            evt.preventDefault();
            if (disabled) return;
            else {
                dispatch(
                    changeMessageAction({
                        err: false,
                        text: `Спасибо! Вами приобретен ${selectedItem.name}`,
                    }),
                );
                dispatch(reduceStockAction(coffee.selectedItemId));
            }
        },
        onChange: (evt) => dispatch(addSelectedItemAction(evt.target.id)),
        onCancel: (evt) => {
            dispatch(returnDepositAction(coffee.total));
        },
    };
}

export default connect(mapStateToProps, null, mergeProps)(CoffeeMaker);
