import React from 'react';

import Scroll from '../Components/Scroll';
import SimpleTable from '../Components/Countries';
import SearchBox from '../Components/SearchBox';
import UsefulLinks from '../Components/UsefulLinks';
import GraphLine from '../Components/GraphLine';
import PieWorld from '../Components/PieWorld';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			dataN: [],
			dataW: [],
			searchfield: '',
		};
	}
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	};
	componentDidMount() {

	 Promise.all([
	fetch('https://covid-19-data.p.rapidapi.com/totals?format=json', {
				method: 'GET',
				headers: {
					'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
					'x-rapidapi-key': process.env.REACT_APP_RAPID_KEYA,
				},
			})
				.then((response) => response.json())
				.then((data) => this.setState({ data })),
			fetch('https://covid-19-data.p.rapidapi.com/country?format=json&name=nepal', {
				method: 'GET',
				headers: {
					'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
					'x-rapidapi-key': process.env.REACT_APP_RAPID_KEYA,
				},
			})
				.then((response) => response.json())
				.then((dataN) => this.setState({ dataN })),
			fetch('https://covid-19-data.p.rapidapi.com/country/all?format=json', {
				method: 'GET',
				headers: {
					'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
					'x-rapidapi-key': process.env.REACT_APP_RAPID_KEYA,
				},
			})
				.then((response) => response.json())
				.then((dataW) => this.setState({ dataW })),
		]).catch((err) => console.log(err));
	}
	render() {
		const { data, dataN, searchfield, dataW } = this.state;
		const filteredShows = dataW.filter((show) => {
			return show.country.toLowerCase().includes(searchfield.toLowerCase());
		});

		return (
			<div>
				<h2 className="text-center">Covid-19 Tracker</h2>
				<hr />
				<div >
				<h4 className="text-center">Worldwide:</h4>
				{data.map((data) => {
					return (
						<div style={{marginTop:'20px'}}  key={data.confirmed} className="container grid text-center">
							<div className="card  mt-3 bg-info">
								<p className="card-title fw-4">Total Confirmed:</p>
								<p className="card-body"> {data.confirmed}</p>
							</div>
							<div className="card  mt-3 bg-danger">
								<p className="card-title fw-4">Total Deaths:</p>
								<p className="card-body"> {data.deaths}</p>
							</div>
							<div className="card  mt-3 bg-success">
								<p className="card-title fw-4">Total Recovered:</p>
								<p className="card-body"> {data.recovered}</p>
							</div>
						</div>
					);
				})}
				<PieWorld nepal = {data} />
				<p className="text-muted" style={{ alignContent: 'left', marginTop:'20px' }}>
				Data is updated<span style={{ textDecoration: 'underline' }}> every 15 minutes</span>
				</p>
				<h3 className='text-center' style={{marginTop:'20px'}} >
					Nepal{' '}
					<span role="img" aria-label="nepalflaf">
						🇳🇵 :
					</span>
				</h3>
				<div >
					{dataN.map((data) => {
						return (
							<div style={{marginTop:'20px'}}  key={data.confirmed} className="container grid text-center">
								<div className="card  mt-3 bg-info">
									<p className="card-title fw-4">Total Confirmed:</p>
									<p className="card-body"> {data.confirmed}</p>
								</div>
								<div className="card  mt-3 bg-danger">
									<p className="card-title fw-4">Total Deaths:</p>
									<p className="card-body"> {data.deaths}</p>
								</div>
								<div className="card  mt-3 bg-success">
									<p className="card-title fw-4">Total Recovered:</p>
									<p className="card-body"> {data.recovered}</p>
								</div>
							</div>
						);
					})}
					<GraphLine nepal = {dataN} />

					<p className="text-muted" style={{ alignContent: 'left',marginTop:'20px' }}>
						Data is updated<span style={{ textDecoration: 'underline' }}> every 15 minutes</span>
					</p>



				</div></div>
				<hr/>
				<h3 className="text-center">By country</h3>
				<SearchBox  searchChange={this.onSearchChange} /> 

				<Scroll>
					<SimpleTable  dataW={filteredShows} />
				</Scroll>
				<UsefulLinks />
			</div>
		);
	}
}

export default App;
