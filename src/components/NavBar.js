import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
	root: {
		flexGrow: 1,
	},
};

const NavBar = (props) => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static" color="primary">
				<Toolbar>
					<Link to="/">
						<Button color="inherit">Home</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withStyles(styles)(NavBar);