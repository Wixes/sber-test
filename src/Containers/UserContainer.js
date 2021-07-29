import { connect } from 'react-redux';
import User from '../Components/User';
import { spendCoinAction } from '../Store/user';

function mapStateToProps(state) {
    const { user } = state;
    return {
        coins: user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: (coin) => dispatch(spendCoinAction(coin)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
