import React from 'react';
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';


class MaterialTableDemo extends React.Component{
    tableRef = React.createRef();
constructor(props)
{
    super(props);
    this.state = {
        columns: [
            { title: 'Id', field: 'id', filtering: false},
            { title: 'Study type', field: 'study_type' },
            { title: 'Institution', field: 'institution'},
            { title: 'Data type', field: 'data_type' },
            { title: 'Tissue', field: 'tissue' },
            { title: 'Uploaded on', field: 'creation_time' },
            { title: '# Cells', field: 'cell_count' },
            { title: '# Unique barcode', field: 'unique_barcode_count' },
            { title: '# Reads', field: 'read_count' },
            { title: '# Reads aligned', field: 'read_count_aligned' },
            { title: '# Images', field: 'image_count' },
          ],
        data: [],
    };

}
 getFromData()
{
    for (let study of this.props.studies)
    {
        console.log(study);
        console.log(study.genes);
        console.log(study.proteins);
        console.log(study.proteins !== undefined);
    }

    this.props.studies.map(study => {console.log(study)});

    return  this.props.studies.map(study =>
        (
            {
                'id': study.id,
                'study_type': study.subclass.model,
                'institution':'\''+study.institution.name+'\'',
                'data_type':'\''+study.data_type.name+'\'',
                'tissue':'\''+study.tissue.name+'\'',
                'creation_time':'\''+ new Date(study.creation_time) +'\'',
                'cell_count': '\''+study.cell_count?study.cell_count:''+'\'',
                'unique_barcode_count': '\''+study.unique_barcode_count?study.unique_barcode_count:''+'\'',
                'read_count':'\''+study.read_count_total?study.read_count_total:''+'\'',
                'read_count_aligned':'\''+study.read_count_aligned?study.read_count_aligned:''+'\'',
                'image_count':'\''+study.image_count?study.image_count:''+'\''
            }
        )
    )
};

componentWillMount()
{
    var studydata = this.getFromData();
    console.log(studydata);
    this.setState({
        columns: [
            { title: 'Id', field: 'id', filtering: false, type:'numeric', removable: false,},
            { title: 'Study type', field: 'study_type',removable: false, },
            { title: 'Institution', field: 'institution',removable: false,},
            { title: 'Data type', field: 'data_type',removable: false,},
            { title: 'Tissue', field: 'tissue',removable: false, },
            { title: 'Uploaded on', field: 'creation_time', removable: false,},
            { title: '# Cells', field: 'cell_count',removable: false,},
            { title: '# Unique barcode', field: 'unique_barcode_count',removable: false,},
            { title: '# Reads', field: 'read_count',removable: false,},
            { title: '# Reads aligned', field: 'read_count_aligned',removable: false,},
            { title: '# Images', field: 'image_count',removable: false,},
          ],
        data: studydata
    });
    console.log(this.state);
}

    render () {
        console.log(this.state.columns);
        console.log(this.state.data);
        return (
            <MUIDataTable
            title="Studies From HuBMAP Consortium"
            columns={this.state.columns}
            data={this.state.data}
            tableRef={this.tableRef}
            options={{
                filtering: true, sorting: true
              }}
            />
        );
    }
}
MaterialTableDemo.propTypes = {
    studies: PropTypes.array,
};
export default MaterialTableDemo;