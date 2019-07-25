import React from "react";
import flatpickr from "flatpickr";
import { getData, attData } from "./attendance";

class Attendance extends React.Component {
  constructor(props) {
    super(props);
    this.dp = React.createRef();
    this.state = {
      inputDate: null,
      name: [],
      time: [],
      data: []
    };
    this.fp = null;
  }
  componentDidMount = () => {
    this.fp = flatpickr(this.dp.current, {
      dateFormat: "j F, Y",
      defaultDate: new Date(),
      onChange: this.onChange
    });
    this.onChange();
  };
  onChange = () => {
    const DateStr = this.fp.latestSelectedDateObj.toDateString();
    const date = DateStr.slice(3, DateStr.length).trim();
    this.setState({ inputDate: date });
    const docName = date.replace(/\s/g, "").toLowerCase();
    getData(docName).then(() => this.setState({ data: attData.attendance }));
  };
  render() {
    const { data } = this.state;
    return (
      <div className="ui container">
        <div className="attendanceForm">
          <div className="ui four column centered grid">
            <div className="column">
              <div className="ui input fluid">
                <input type="date" ref={this.dp} />
              </div>
            </div>
          </div>
        </div>
        <h2>{this.state.inputDate}</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data !== undefined &&
              data.map(item => (
                <tr>
                  <td data-label="Name">{item.name}</td>
                  <td data-label="Time">{item.time}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Attendance;
