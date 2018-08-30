import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from 'react-chartist';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import { Map } from 'immutable';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	wrapper: {
		maxWidth: '1400px',
		margin: '100px auto 0'
	}
});

class DataVisualizer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {classes} = this.props;

		return (
			<div className={classes.wrapper}>
				<Paper className={classes.root}>

				</Paper>
			</div>
		)
	}
};

const mapStateToProps = state => ({
	dataFromStore: state.getIn(['data']),
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(DataVisualizer);
