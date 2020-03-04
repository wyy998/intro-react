import React from "react";

interface props {
  rows: Array<string>;
  tableNames: Array<string>;
  data: any;
  addFunction: (name: string, row: string, value: string) => void;
}

class Table extends React.Component<props, {}> {
  getValue(data: any, tableName: string, row: string) {
    if (tableName in data && row in data[tableName]) {
      return data[tableName][row];
    } else {
      return "Add Score";
    }
  }

  createRows(name: string) {
    return (
      <div>
        {this.props.rows.map((row, index) => (
          <div className="Box-row d-flex flex-justify-between">
            {row}
            <input
              className="form-control input-sm"
              type="text"
              placeholder={this.getValue(this.props.data, name, row)}
              onChange={event =>
                this.props.addFunction(name, row, event.target.value)
              }
            />
          </div>
        ))}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.props.tableNames.map((name, index) => (
          <div className="pt-6">
            <div className="Box col-6 mx-auto">
              <div className="Box-header Box-title">{name}</div>
              <div>{this.createRows(name)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Table;
