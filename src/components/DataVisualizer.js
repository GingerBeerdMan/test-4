import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import Button from '@material-ui/core/Button';
import { getData } from "../selectors/data";

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	wrapper: {
		maxWidth: '1400px',
		margin: '100px auto 0'
	},
	groupByLabel: {
		marginRight: '10px'
	},
	grouperButton: {
		marginRight: '5px'
	}
});

class DataVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grouper: 'Car Make',
			title: 'Number of people, grouped by Car Make and split by gender',
			firstX: 20
		};

		this.changeGrouper = this.changeGrouper.bind(this);
	}

	changeGrouper(grouper) {
		this.setState({
			grouper: grouper,
			title: `Number of people, grouped by ${grouper} and split by gender`
		});
	}

	render() {
		const {classes} = this.props;
		// TODO: add more types of charts
		return (
			<div className={classes.wrapper}>
				<Paper className={classes.root}>
					<h3>{this.state.title}</h3>
					<div>
						<span className={classes.groupByLabel}>Group by:</span>
						<Button color="primary"
										variant="contained"
										className={classes.grouperButton}
										onClick={() => this.changeGrouper('Car Make')}
						>
							Car Make
						</Button>
						<Button color="primary"
										variant="contained"
										className={classes.grouperButton}
										onClick={() => this.changeGrouper('Car Model')}
						>
							Car Model
						</Button>
						<Button color="primary"
										variant="contained"
										className={classes.grouperButton}
										onClick={() => this.changeGrouper('Company Domain')}
						>
							Company Domain
						</Button>
					</div>
					{this.props.dataFromStore &&
						<BarChart
							data={this.props.dataFromStore}
							grouper={this.state.grouper}
							firstX={this.state.firstX}
							title={this.state.title}
						/>
					}
				</Paper>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataFromStore: getData(state),
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(DataVisualizer);
