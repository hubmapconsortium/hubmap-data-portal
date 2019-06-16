import React from 'react';
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import { connect } from 'react-redux';
import { fetch_studies, in_progress, fetchNextPageFromStudies } from '../controllers/actions';
import * as Constants from '../commons/constants';
import { hubmapStore } from '../index';

const mapStateToProps = state => {
    console.log(state);
    return {
        status: state.status,
        response: state.response,
		error: state.error,
		count: 0,
		page:0,
		next: "",
		previous: "",
    }
};
class MaterialTableDemo extends React.Component {
	tableRef = React.createRef();
	currentState = {};
	previousState ={};
	page =0;
	count =0;
	
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{label: 'Id', name: 'id', filtering: false},
				{label: 'Study type', name: 'study_type'},
				{label: 'Institution', name: 'institution'},
				{label: 'Data type', name: 'data_type'},
				{label: 'Tissue', name: 'tissue'},
				{label: 'Uploaded on', name: 'creation_time'},
				{label: '# Cells', name: 'cell_count'},
				{label: '# Unique barcode', name: 'unique_barcode_count'},
				{label: '# Reads', name: 'read_count'},
				{label: '# Reads aligned', name: 'read_count_aligned'},
				{label: '# Images', name: 'image_count'},
			],
			data: [],
		};

	}

	getFromData() {
		console.log('Logging studies');
		for (let study of this.props.studies) {
			console.log(study);
		}
		console.log('Done logging studies');
		var data = this.props.studies.map(study =>
			(
				{
					'id': study.id,
					'study_type': study.subclass.model,
					'institution': study.institution.name,
					'data_type': study.data_type.name,
					'tissue': study.tissue.name,
					'cell_count': study.cell_count ? study.cell_count : '' + '',
					/*'unique_barcode_count': study.unique_barcode_count ? study.unique_barcode_count : '' + '',
					'read_count': study.read_count_total ? study.read_count_total : '' + '',
					'read_count_aligned': study.read_count_aligned ? study.read_count_aligned : '' + '',*/
					'image_count': study.image_count ? study.image_count : '' + '',
				}
			)
		)

		return data.sort((a,b) => Number(a.id) - Number(b.id))
	};

	componentWillMount() {
		console.log('componentDidMount');
        hubmapStore.subscribe(() => this.currentState = hubmapStore.getState());
        if (this.currentState != "" && this.currentState.status != Constants.IN_PROGRESS
        && this.currentState.studies != {} && this.currentState.type == Constants.GLOBAL_FETCH_ACTION) {
            this.props.dispatch(fetch_studies());
        }
        else if(this.currentState.type == Constants.GLOBAL_FETCH_ACTION && this.currentState.status == Constants.IN_PROGRESS)
        {
            this.props.dispatch(in_progress());
        }
		var studydata = this.getFromData();
		console.log('In table componentWillMount');
		console.log(studydata);
		this.setState({
			columns: [
				{label: 'Id', name: 'id', filtering: false, type: 'numeric', removable: false, sort:true,  display: 'excluded',},
				{label: 'Study type', name: 'study_type', removable: false,},
				{label: 'Institution', name: 'institution', removable: false,},
				{label: 'Data type', name: 'data_type',removable: false, cellStyle: {width:150}},
				{label: 'Tissue', name: 'tissue', removable: false,},
				{label: '# Cells', name: 'cell_count', removable: false,},
				/*{label: '# Unique barcode', name: 'unique_barcode_count', removable: false,headerStyle: { }},
				{label: '# Reads', name: 'read_count', removable: false,},
				{label: '# Reads aligned', name: 'read_count_aligned', removable: false,},*/
				{label: '# Images', name: 'image_count', removable: false,},
			],
			data: studydata
		});
		console.log(this.state);
	}

    componentDidMount() {
       
    }

	changePage = (page) => {
		this.setState({
			status: Constants.IN_PROGRESS,
		});
		this.props.dispatch(fetchNextPageFromStudies(this.state.next));
	}
	render() {
		console.log('In table render()');
		console.log(this.state.columns);
		console.log(this.state.data);
		const { response, error, status, type } = this.currentState;
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (status == Constants.IN_PROGRESS) {
            return <div> Loading...</div>
        }
        if (response != "" && response !== undefined && type== Constants.GLOBAL_FETCH_ACTION) {
            this.previousState.response = this.currentState ;
            this.previousState.type = type;
			
			return (
				
				< MUIDataTable size='medium' style={{ maxWidth: '100%'}}
					title="Studies From HuBMAP Consortium"
					columns={this.state.columns}
					data={this.state.data}
					options={
						{
						filter: true, sorting: true, fixedHeader: true,
						//count: count,
						//page: page,
						MUIDataTableBodyCell: {
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
							filterType: 'multiselect',
							responsive: 'stacked',
							rowsPerPage: 10,
							downloadOptions: {
								filename: 'excel-format.csv',
								separator: ';',
							},
							rowHover: true,
							
							onTableChange: (action, tableState) => {

								console.log(action, tableState);
								switch (action) {
									case 'changePage':
									this.changePage(tableState.page);
									break;
								}
							},

					}
				}
				/>
			);
		}
	}
}

MaterialTableDemo.propTypes = {
	studies: PropTypes.array,
};
export default connect(mapStateToProps)(MaterialTableDemo);
