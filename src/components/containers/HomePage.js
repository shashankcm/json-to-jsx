import React from "react";
import { Link } from "react-router-dom";

import formData from "../../data/mockData";
import FormElement from "../containers/FormElement";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    let indexSize = [];
    formData.map((item, index) => {
      return indexSize.push(index);
    });
    this.state = {
      formData: formData,
      steps: indexSize,
      percentageCompleted: 0
    };
  }
  componentDidMount() {
    //this.processFormData();
  }
  processFormData() {
    let indexValues = [];
    this.state.formData.map((item, index) => {
      indexValues.push(index);
    });
    //console.log(indexValues);
    this.setState(state => {
      return { steps: state.steps + indexValues.length };
    });
  }
  render() {
    /* console.log(
      this.state.formData[this.state.steps[0]],
      this.state.formData,
      this.state.steps
    ); */
    return (
      <div className="container-fluid">
        <FormElement
          htmlElements={this.state.formData}
          steps={this.state.steps}
        />
      </div>
    );
  }
}

export default HomePage;

{
  /* <div className="container-fluid">
        {this.state.steps.length > 0
          ? this.state.steps.map(i => (
              <FormElement
                htmlElements={this.state.formData[this.state.steps[i]]}
              />
            ))
          : null}
      </div> */
}
