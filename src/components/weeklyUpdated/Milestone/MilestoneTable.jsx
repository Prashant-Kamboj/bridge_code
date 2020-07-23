import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

class MilestoneTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f3f7fa",
            margin: "0rem",
          }}
          className="visible-xs"
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Milestone Name</th>
                <th scope="col">Milestone Summary</th>
                <th scope="col">Milestone Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.milestoneData.map((data) => (
                <tr>
                  <td>
                    <div className="input-outer">
                      {" "}
                      <input
                        type="text"
                        name="Planned_Effort"
                        value=""
                        disabled={false}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="input-outer">
                      <input
                        type="text"
                        name="Planned_Effort"
                        value=""
                        disabled={false}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="input-outer">
                      <input
                        type="text"
                        name="Planned_Effort"
                        value=""
                        disabled={false}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Milestone Planned Start Date</th>
                <th scope="col">Milestone Planned End Date</th>
                <th scope="col">Status Date/Period</th>
              </tr>
            </thead>
            <tbody>
              {this.props.milestoneData.map((data) => (
                <tr>
                  <td>
                    <div className="input-outer">
                      <DatePicker
                        className="input-date"
                        selected={new Date()}
                        onChange={(date) => console.log(date)}
                        name="Milestone_Planned_Start_Date"
                        disabled={false}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="input-outer">
                      <DatePicker
                        className="input-date"
                        selected={new Date()}
                        onChange={(date) => console.log(date)}
                        name="Milestone_Planned_End_Date"
                        disabled={false}
                        popperClassName="some-custom-class"
                        popperPlacement="top-end"
                        popperModifiers={{
                          offset: {
                            enabled: true,
                            offset: "5px, 10px",
                          },
                          preventOverflow: {
                            enabled: true,
                            escapeWithReference: false,
                            boundariesElement: "viewport",
                          },
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="input-outer">
                      <input
                        type="text"
                        name="Planned_Effort"
                        value=""
                        disabled={false}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={this.props.addMore}>Add More</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    milestoneData: state.milestoneReducer,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMore: () => dispatch({ type: "ADDMORE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneTable);
