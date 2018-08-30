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
	},
	male: {
		background: 'blue',
		width: '60px',
		height: '19px',
		color: 'white',
		padding: '5px 10px',
		textAlign: 'center'
	},
	female: {
		background: 'red',
		width: '60px',
		height: '19px',
		color: 'white',
		padding: '5px 10px'
	}
});

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {data: null};
	}

	processData(data, grouper, firstX) {
		let labels = data
			.reduce((result, item) => {
				return result.add(item.get(grouper));
			}, Set());
		const labelMap = labels.reduce((result, label) => {
			return result.setIn([label], 0);
		}, Map({}));
		let maleSeries = data
			.filter(item => item.get('Gender') === 'Male')
			.reduce((result, item) => {
				return result.setIn([item.get(grouper)], result.getIn([item.get(grouper)]) + 1);
			}, labelMap)
			.toList();
		let femaleSeries = data
			.filter(item => item.get('Gender') === 'Female')
			.reduce((result, item) => {
				return result.setIn([item.get(grouper)], result.getIn([item.get(grouper)]) + 1);
			}, labelMap)
			.toList();

		const sortedData = labels
			.toList()
			.zip(maleSeries, femaleSeries)
			.sortBy(x => {
				return -(x[1] + x[2]);
			})
			.slice(0, firstX - 1)
			.toJS();

		return sortedData;
	}

	render() {
		const {classes} = this.props;
		console.log('xxx', this.props.dataFromStore.toJS());
		const sortedData = this.processData(this.props.dataFromStore, 'Car Make', 20);

		const labels = sortedData.map(x => x[0]);
		const maleSeries = sortedData.map(x => x[1]);
		const femaleSeries = sortedData.map(x => x[2]);

		const data = {
			labels: labels,
			series: [
				maleSeries,
				femaleSeries
			]
		};
		const options = {
			seriesBarDistance: 11,
			axisY: {
				labelInterpolationFnc: (value) => {
					return value < 0 ? -value : value
				}
			}
		};
		const responsiveOptions = [
			[]
		];

		return (
			<div className={classes.wrapper}>
				<Paper className={classes.root}>
					<h3>Number of car owners, grouped by car make and split by gender</h3>
					<div>
						Legend:
						<div className={classes.female}>Females</div>
						<div className={classes.male}>Males</div>
					</div>
					<ChartistGraph data={data}
												 responsiveOptions={responsiveOptions}
												 options={options}
												 type='Bar' />
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
)(BarChart);
