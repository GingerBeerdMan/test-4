import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getData } from "../selectors/data";
import { fetchLocation } from '../actions/geolocation';
import TextField from '@material-ui/core/TextField';


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
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	countryFlag: {
		height: '30px',
		marginRight: '10px',
		border: '1px solid lightgray'
	}
});

class DataVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Geolocator',
			id: undefined
		};

		this.geolocateUser = this.geolocateUser.bind(this);
	}

	geolocateUser() {
		return (event) => {
			const user = this.findUser(event.target.value);
			if (user && !user.get('metadata')) {
				this.props.geolocatePerson(user);
			}
			this.setState({
				user: this.findUser(event.target.value)
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.dataFromStore);
	}

	findUser(id) {
		return this.props.dataFromStore.find(x => x.get('Id') === id);
	}

	render() {
		const {classes} = this.props;
		return (
			<div className={classes.wrapper}>
				<Paper className={classes.root}>
					<h3>{this.state.title}</h3>
					<TextField
						id="number"
						label="ID of user you want to find"
						value={this.state.id}
						onChange={this.geolocateUser()}
						type="number"
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
					/>
				</Paper>
				<br/>
				{this.state.user &&
					<Paper className={classes.root}>
						<h3>Results</h3>
						<div>
							Name: {this.state.user.get('First_name')} {this.state.user.get('Last_name')}
						</div>
						<div>
							Country: {this.state.user.get('Country')}
						</div>
						<br/>
						<div>
							Real Location: {this.state.user.getIn(['metadata', 'city'])}
							<img className={classes.countryFlag}
								src={this.state.user.getIn(['metadata', 'location', 'country_flag'])} alt=""/>
						</div>
					</Paper>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataFromStore: getData(state),
});

const mapDispatchToProps = dispatch => ({
	geolocatePerson: (person) => dispatch(fetchLocation(person)),
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(DataVisualizer);
