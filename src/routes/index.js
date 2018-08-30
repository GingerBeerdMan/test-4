import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';
import DataVisualizer from '../components/DataVisualizer';
import Geolocator from '../components/Geolocator';
import NoMatch from '../components/NoMatch';
import NavBar from '../components/NavBar';

const routes = (
	<div>
		<NavBar />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/bar-chart" component={DataVisualizer} />
			<Route exact path="/geolocator" component={Geolocator} />
			<Route component={NoMatch} />
		</Switch>
	</div>
);

export default routes;