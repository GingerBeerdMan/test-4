import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { storeData } from '../actions';
import DataLoader from './DataLoader';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	wrapper: {
		maxWidth: '1000px',
		margin: '100px auto 0'
	}
});

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {dataFromStore: null};
	}

	onFileLoaded(data, a) {
		// console.log(data, a);
		this.props.storeData(data);
	}

	onError(error) {
		console.log(error);
	}

	render() {
		const {classes} = this.props;
		return (
			<div className={classes.wrapper}>
				<Paper className={classes.root}>
					<h3>Home</h3>
					<DataLoader
						data={this.props.dataFromStore}
						onFileLoaded={this.onFileLoaded.bind(this)}
						onError={this.onError.bind(this)}
					/>
					{
						!!this.props.dataFromStore.count() &&
						(
							<div>
								<h4>Visualise the data:</h4>
								<Link to="/bar-chart">
									<Button color="primary" variant="contained">
										Number of car owners, grouped by car make and split by gender
									</Button>
								</Link>
							</div>
						)
					}
				</Paper>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	dataFromStore: state.getIn(['data']),
});

const mapDispatchToProps = dispatch => ({
	storeData: (data) => dispatch(storeData(data)),
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(Home);
