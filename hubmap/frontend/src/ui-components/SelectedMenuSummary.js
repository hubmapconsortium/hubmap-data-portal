import React from 'react';
import * as Commons from '../commons';
import { PubSubApi } from '../middleware';
import { ControlledChipInput } from  './';

export default class SelectedMenuSummary extends React.Component {
  summary = '';

  token = '';

  pubsubObj = null;

  constructor(props) {
    super(props);
    this.pubsubObj = new PubSubApi();
    this.state = {
      selectedMenuSummary: null,
      menuSelected: false,
    };
    console.log(this.state.selectedMenuSummary);
  }

  selectedMenuSummaryAdded(msg, summary) {
    console.log(msg, summary);
    if (msg === Commons.SELECTED_MENU_OPTIONS) {
      this.setState({
        selectedMenuSummary: summary,
        menuSelected: true,
      });
    }
  }

  componentWillMount() {
    this.token = this.pubsubObj.subscribe(Commons.SELECTED_MENU_OPTIONS, this.selectedMenuSummaryAdded.bind(this));
  }

  componentWillUnmount() {
    this.pubsubObj.unsubscribe(this.token);
    console.log('unsubscribe');
  }

  render() {
      console.log(this.state.selectedMenuSummary);
    const { selectedMenuSummary, menuSelected } = this.state;
    let chipElements = [];
    if (menuSelected){
        (selectedMenuSummary).map((chip) => {
            chipElements.push(<ControlledChipInput chip={chip} />);
            });
            return {chipElements};
        }
    else{
            return (
                <div></div>
            );
        }
    }
}
