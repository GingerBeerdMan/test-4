import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CSVReader from 'react-csv-reader';

const styles = theme => ({
	root: {

	}
});

class DataLoader extends Component {
	render() {
		return (
			<div>
				<CSVReader
					cssClass="csv-input"
					label="Upload your data: "
					onFileLoaded={this.props.onFileLoaded}
					onError={this.props.onError}
				/>
			</div>
		)
	}
};

export default withStyles(styles)(DataLoader);