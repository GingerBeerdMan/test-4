import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from 'react-chartist';
import { compose } from 'redux';
import { Set } from 'immutable';
import { Map } from 'immutable';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	male: {
		background: 'blue',
	},
	female: {
		background: 'red',
	},
	legendBlock: {
		width: '60px',
		height: '19px',
		color: 'white',
		padding: '5px 10px',
		textAlign: 'center',
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

		return labels
			.toList()
			.zip(maleSeries, femaleSeries)
			.sortBy(x => {
				return -(x[1] + x[2]);
			})
			.slice(0, firstX - 1)
			.toJS();
	}

	render() {
		const {classes} = this.props;
		const sortedData = this.processData(this.props.data, this.props.grouper, this.props.firstX);

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

		return (
			<div>
					<div>
						<span className={classes.legendLabel}>Legend:</span>
						<div className={[classes.female, classes.legendBlock].join(' ')}>Females</div>
						<div className={[classes.male, classes.legendBlock].join(' ')}>Males</div>
					</div>
					<ChartistGraph data={data}
												 options={options}
												 type='Bar' />
			</div>
		)
	}
}

export default compose(
	withStyles(styles),
)(BarChart);
