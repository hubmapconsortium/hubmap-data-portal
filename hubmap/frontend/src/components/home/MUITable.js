import React from 'react';
import MUIDataTable from "mui-datatables";
import grey from '@material-ui/core/colors/grey';
import { connect } from 'react-redux';
import { get_experiments, in_progress, getNextPageFromExperiments } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import { store } from '../../index';
import { CircularProgress, Typography } from '@material-ui/core';

const mapStateToProps = state => {
	return {
		status: state.experimentState.status,
		response: state.experimentState.response,
		error: state.experimentState.error,
		page: state.experimentState.page,
		next: state.experimentState.next,
		previous: state.experimentState.previous,
	}
};
class MaterialTableDemo extends React.Component {
	tableRef = React.createRef();
	currentState = {};
	previousState = {};
	page = 0;

	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ label: 'Id', name: 'id', filtering: false },
				{ label: 'Assay type', name: 'data_type' },
				//{label: 'Experiment type', name: 'study_type'},
				{ label: 'Institution', name: 'institution' },
				{ label: 'Tissue', name: 'tissue' },
			],
			data: [],
		};

	}

	getFromData(response) {
		var data;
		const size = response.length;
		response !== undefined ?
			data = response.slice(0, size - 1).map(study =>
				(
					{
						'id': study.id,
						//'study_type': study.subclass.model,
						'institution': study.institution.name,
						'data_type': study.data_type.name,
						'tissue': study.tissue.name,
					}
				)
			) : (data = {});

		return data !== "" ? data.sort((a, b) => Number(a.id) - Number(b.id)) : {}
	};

	componentWillMount() {
	}

	componentDidMount() {
		store.subscribe(() => this.currentState = store.getState().experimentState);
		if (this.currentState !== "" && this.currentState.status !== Constants.IN_PROGRESS
			&& this.currentState.response !== {} && this.currentState.type === Constants.GET_EXPERIMENTS) {
			this.props.dispatch(get_experiments(this.currentState));
		}
		else if (this.currentState.type === Constants.GET_EXPERIMENTS && this.currentState.status === Constants.IN_PROGRESS) {
			this.props.dispatch(in_progress());
		}

	}

	/***
	 * Change page on Table (previous/next)
	 */
	changePage = (page) => {
		this.previousState.status = Constants.IN_PROGRESS;
		this.props.dispatch(getNextPageFromExperiments(this.previousState.next));
	}
	render() {
		const { response, error, status, type, page, next, previous } = store.getState().experimentState;

		if (error) {
			return <div>Error! {error.message}</div>
		}

		else if (response !== "" && response !== undefined && type === Constants.GET_EXPERIMENTS
			&& status === Constants.SUCCESS) {
			var studydata = this.getFromData(response);
			this.previousState = {
				columns: [
					{ name: 'id', label: 'Id', type: 'numeric', display: 'excluded', filter: true, sortDirection: 'asc' },
					{ name: 'data_type', label: 'Assay type', cellStyle: { width: 150 }, filter: true, },
					//{ name: 'study_type',label: 'Experiment type',  filter: true, },
					{ name: 'institution', label: 'Center', filter: true, },
					{ name: 'tissue', label: 'Tissue', filter: true, },
				],
				data: studydata,
				next: next,
				previous: previous,
				page: page,
				count: studydata.count,
			}
			return (

				< MUIDataTable size='medium' style={{ maxWidth: '100%' }}
					title={<Typography >Experiments From HuBMAP Consortium
					{(status === Constants.IN_PROGRESS) && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}</Typography>}
					columns={this.previousState.columns}
					data={this.previousState.data}
					options={
						{
							filter: true,
							customSort: (data, colIndex, order) => {
								return data.sort((a, b) => {
									return (a.data[colIndex].length < b.data[colIndex].length ? -1 : 1) * (order === 'desc' ? 1 : -1);
								});
							},
							MUIDataTableBodyCell:
							{
								root: {
									border: 'solid 1px #000',
									'&:nth-child(5)': {
										backgroundColor: grey[800],
										textAlign: 'center'
									}
								}
							},
							selectedRows: {
								text: "row(s) selected",
								delete: "Delete",
								deleteAria: "Delete Selected Rows",
							},
							selectableRows: false,
							filterType: 'dropdown',
							responsive: 'scroll',
							//rowsPerPage: 8,
							downloadOptions: {
								filename: 'excel-format.csv',
								separator: ';',
							},
							rowHover: true,

						}
					}
				/>
			);
		}
		else if (status === Constants.IN_PROGRESS && response === undefined && type === Constants.GET_EXPERIMENTS) {
			return < MUIDataTable size='medium' style={{ maxWidth: '100%' }}
				title={<Typography variant='title'>Experiments From HuBMAP Consortium
					{(status === Constants.IN_PROGRESS) && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}</Typography>}
			/>
		}
		else {
			return (<div>No Experiments</div>)
		}
	}
}

export default connect(mapStateToProps)(MaterialTableDemo);
