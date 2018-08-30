import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router/immutable';
import routes from './routes';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		flexGrow: 1,
	}
});

const App = ({ history }) => {
	return (
    <ConnectedRouter history={history}>
			{ routes }
    </ConnectedRouter>
	)
};

App.propTypes = {
	history: PropTypes.object,
};

export default withStyles(styles)(App);