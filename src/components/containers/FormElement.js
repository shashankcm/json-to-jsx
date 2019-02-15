import React from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";

import {
  Input,
  Checkbox,
  Select,
  Radio
} from "../HTMLElementComponents/allHtmlElements";

class FormElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {},
      steps: props.steps,
      stepCount: 0
    };
  }
  handleCheckBox = e => {
    const newSelection = e.target.value;
    let name = e.target.name;
    let newSelectionArray;

    if (this.state.newUser.name.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.name.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newUser.name, newSelection];
    }
    this.setState(prevState => ({
      newUser: { ...prevState.newUser, name: newSelectionArray }
    }));
  };
  handleRadioButton = value => {
    let lableName = "",
      completeData = this.props.htmlElements;
    completeData.map(oneItem => {
      oneItem.sections.map(fe => {
        let fields = fe.fields;
        fields.map(keyname => {
          if (keyname.component === "radio") {
            return keyname.options.map(te => {
              if (te.value === value) {
                lableName = keyname.name;
                return lableName;
              }
            });
          }
        });
      });
    });
    let name = lableName;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  };
  handleChange(e) {
    //console.log("HandleChange Called");
    let value = e.target.value;
    let name = e.target.name;
    //console.log("value", value, "name", name);
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log("Final Values", this.state);
  };

  componentDidMount() {
    /* const props = this.props;
    let completeData = props.htmlElements;

    if (completeData.length > 0) {
      if (
        this.state.steps.length > 0 &&
        this.state.stepCount < this.state.steps.length
      ) {
        this.setState(prevState => ({ stepCount: prevState.stepCount + 1 }));
      }
    } */
  }
  handleFormPage = () => {
    const props = this.props;
    let completeData = props.htmlElements;

    if (completeData.length > 0) {
      /* if (
        this.state.steps.length > 0 &&
        this.state.steps.length > this.state.stepCount
      ) {
        console.log(
          this.state.steps.length,
          this.state.stepCount,
          this.state.steps.length,
          "State in handle Form"
        );
        this.setState(prevState => ({ stepCount: prevState.stepCount + 1 }));
      } */
      this.setState(prevState => ({ stepCount: prevState.stepCount + 1 }));
    }
  };
  handlePrevFormPage = () => {
    //let currentStepCount = this.state.stepCount
    this.setState(prevState => ({ stepCount: prevState.stepCount - 1 }));
  };
  render() {
    const props = this.props;

    let completeData = props.htmlElements,
      htmlNodes = "",
      singleItem = "";

    /* completeData.map(oneItem => {
      return (singleItem = oneItem);
    }); */

    singleItem = completeData[this.state.stepCount];
    console.log(this.state, "State in render");

    if (this.state.stepCount < this.state.steps.length) {
      htmlNodes = (
        <div>
          <form onSubmit={this.handleSubmit}>
            {/* <h3>{item.name}</h3> */}
            {/* <h1>{item.title}</h1> */}
            {singleItem.sections.map((it, index) => {
              return (
                <div key={index} className="form-row">
                  <h2>{it.caption}</h2>
                </div>
              );
            })}
            {singleItem.sections.map((it, index) => {
              return (
                <div key={index} className="form-group row">
                  {it.fields.map((fe, index) => {
                    return (
                      <div key={index} className="col-md-6">
                        {fe.component === "input" ? (
                          <Input
                            name={fe.name}
                            id={fe.name}
                            type={fe.type}
                            placeholder={fe.placeholder}
                            value={this.state.newUser[fe.name]}
                            handleChange={this.handleChange.bind(this)}
                            caption={fe.caption}
                          />
                        ) : fe.component === "select" ? (
                          <Select
                            name={fe.name}
                            id={fe.name}
                            handleChange={this.handleChange.bind(this)}
                            placeholder={fe.placeholder}
                            options={fe.options}
                            caption={fe.caption}
                          />
                        ) : fe.component === "checkbox" ? (
                          <Checkbox
                            name={fe.name}
                            handleChange={this.handleCheckBox}
                            value={this.state.newUser[fe.name]}
                            selectedOptions={this.state.newUser[fe.name]}
                            options={fe.options}
                          />
                        ) : fe.component === "radio" ? (
                          <React.Fragment>
                            <label>{fe.caption}</label>
                            <RadioGroup onChange={this.handleRadioButton}>
                              {fe.options.map((op, index) => {
                                return (
                                  <RadioButton key={index} value={op.value}>
                                    {op.title}
                                  </RadioButton>
                                );
                              })}
                            </RadioGroup>
                          </React.Fragment>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <button
              className={
                this.state.stepCount <= 0
                  ? "btn btn-secondary btn-lg float-left"
                  : "btn btn-primary btn-lg float-left"
              } //this.state.steps.length < 0 ? true : false
              disabled={this.state.stepCount <= 0}
              onClick={this.handlePrevFormPage}
            >
              previous
            </button>
            {this.state.stepCount < this.state.steps.length - 1 ? (
              <input
                type="button"
                value="next"
                className="btn btn-primary btn-lg float-right"
                onClick={this.handleFormPage}
              />
            ) : (
              <input
                type="button"
                value="submit"
                className="btn btn-primary btn-lg float-right"
              />
            )}
          </form>
        </div>
      );
    } else {
      htmlNodes = <div>No Page Found</div>;
    }
    //console.log(htmlNodes);
    return (
      <div>
        {/* {stepsDisplay} */}
        {htmlNodes}
      </div>
    );
  }
}
export default FormElement;
