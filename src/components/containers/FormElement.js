import React from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/personalInformationActions";

import {
  Input,
  Checkbox,
  Select,
  Radio
} from "../HTMLElementComponents/allHtmlElements";

class FormElement extends React.Component {
  constructor(props) {
    super(props);
    var width;
    if (this.props.steps.length === 1) {
      width = "100%";
    } else {
      if (window.innerWidth < 600) {
        /* if (this.props.steps.length !== 3) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      } else {
        if (this.props.steps.length === 2) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        } */
        width = 100 / this.props.steps.length + "%";
      }
    }
    this.state = {
      currentStep: 0,
      newUser: {},
      steps: props.steps,
      stepCount: 0,
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      },
      loadSubmitedPage: false
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener("resize", this.updateWidth);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  updateWidth() {
    //console.log("updateWidth", this.state.currentStep);
    this.refreshAnimation(this.state.currentStep);
  }

  refreshAnimation(index) {
    var total = this.props.steps.length;
    var li_width = 100 / total;
    var total_steps = this.props.steps.length;
    var move_distance = this.refs.wizard.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.refs.wizard.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: li_width + "%" });

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    //console.log(move_distance, vertical_level);

    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
    };
    this.setState({ movingTabStyle: movingTabStyle });
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
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } })
      //,() => console.log(this.state.newUser)
    );
  };
  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    e.persist();
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } })
      //,() => console.log(this.state.newUser)
    );
  }
  handleSubmit = e => {
    //console.log("Final Values", this.state);
    e.preventDefault();
    let finalData = {
      finalData: this.state.newUser
    };
    if (
      Object.entries(finalData.finalData).length === 0 &&
      finalData.finalData.constructor === Object
    ) {
      this.setState({ loadSubmitedPage: false });
    } else {
      this.setState(prevState => ({
        loadSubmitedPage: !prevState.loadSubmitedPage
      }));
      this.props.actions.savePersonalInformation(finalData);
    }
  };
  handleFormPage = () => {
    const props = this.props;
    let completeData = props.htmlElements;

    if (completeData.length > 0) {
      this.setState(
        prevState => ({ stepCount: prevState.stepCount + 1 }),
        () => this.refreshAnimation(this.state.stepCount)
      );
    }
    this.myFormRef.reset();
    //e.target.value = "";
  };
  handlePrevFormPage = () => {
    //let currentStepCount = this.state.stepCount
    this.setState(
      prevState => ({ stepCount: prevState.stepCount - 1 }),
      () => this.refreshAnimation(this.state.stepCount)
    );
    this.myFormRef.reset();
  };

  getNavStyles = (indx, length) => {
    let styles = [];
    for (let i = 0; i < length; i++) {
      if (i < indx) {
        styles.push("done");
      } else if (i === indx) {
        styles.push("doing");
      } else {
        styles.push("todo");
      }
    }
    return styles;
  };
  sendState() {
    return this.state;
  }
  navigationStepChange = key => {
    if (this.props.steps) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          this.setState({
            stepCount: key,
            currentStep: key
          });
        }
      }
    }
  };

  render() {
    const props = this.props;

    let completeData = props.htmlElements,
      htmlNodes = "",
      singleItem = "";
    singleItem = completeData[this.state.stepCount];

    /* let stepsDisplay = (
      <ol className="progtrckr">
        {this.state.steps.map((s, i) => (
          <li
            key={i}
            className={
              "progtrckr-" +
              this.getNavStyles(this.state.stepCount, this.state.steps.length)[
                i
              ]
            }
            style={{ listStyleType: "none" }}
          >
            {this.state.steps[i] + 1}
          </li>
        ))}
      </ol>
    ); */
    let stepsDisplay = (
      <div className="jss1421">
        <ul className="jss1422">
          {this.state.steps.map((s, i) => {
            return (
              <li
                key={i}
                className="jss1423"
                style={{ width: this.state.width }}
              >
                <a
                  className="jss1424"
                  onClick={e => {
                    e.preventDefault();
                    this.navigationStepChange(i);
                  }}
                >
                  {/*{this.state.steps[i] + 1} */}
                  Step {this.state.steps[i] + 1}
                </a>
              </li>
            );
          })}
        </ul>{" "}
        {/* jss1428 movingTab jss1434*/}
        <div className="jss1428 jss1434" style={this.state.movingTabStyle}>
          Step {this.state.stepCount + 1}
        </div>
      </div>
    );
    /* console.log(
      this.getNavStyles(this.state.stepCount, this.state.steps.length)
    ); */

    if (this.state.stepCount < this.state.steps.length) {
      htmlNodes = (
        <div className="jss447 jss1780">
          <form onSubmit={this.handleSubmit} ref={el => (this.myFormRef = el)}>
            {/* <h3>{item.name}</h3> */}
            {/* <h1>{item.title}</h1> */}
            {singleItem.sections.map((it, index) => {
              return (
                <div key={index} className="form-row">
                  <h3 style={{ fontWeight: "400", margin: "20px 0px" }}>
                    <strong>Step {this.state.stepCount + 1}</strong> -{" "}
                    {it.caption}
                  </h3>
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
                            value={this.state.newUser[fe.name]}
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
                            {this.state.newUser.gender === "FEMALE" ? (
                              <div>Hello Female welcom </div>
                            ) : (
                              ""
                            )}
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
              }
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
              <button
                type="submit"
                className="btn btn-primary btn-lg float-right"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      );
    } else {
      htmlNodes = <div>No Page Found</div>;
    }
    //console.log(this.state.loadSubmitedPage, this.props.piApiResponse);

    return (
      <div ref="wizard">
        {/* {Object.entries(this.props.personalInfo).length === 0 &&
        this.props.personalInfo.constructor === Object ? (
          <div>
            {stepsDisplay}
            {htmlNodes}
          </div>
        ) : (
          <div>Information Submitted Thanks</div>
        )} */}

        {this.state.loadSubmitedPage === false ? (
          <div>
            {stepsDisplay}
            {htmlNodes}
          </div>
        ) : (
          <div className="jss447 jss1780">
            <h1>Information Submitted Thanks</h1>
            <pre>{JSON.stringify(this.state.newUser, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    piApiResponse:
      state.piApiResponse.piApiResponse != undefined
        ? state.piApiResponse.piApiResponse
        : ""
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormElement);
