import React from "react";
import style from "./index.module.css";

interface state {
  title: string;
  content: Array<string>;
}

class NewsDashboard extends React.Component<{}, state> {
  constructor(props: {}) {
    super(props);
    this.state = {
      title: "Hahah",
      content: [
        "This is a joke",
        "在正常的css中，比如background-color，box-sizing等属性，在style对象div1中的属性中，必须转换成驼峰法，backgroundColor，boxSizing。而没有连字符的属性，如margin，width等，则在style对象中不变。",
        "作者：grain先森"
      ]
    };
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.title}>{this.state.title}</div>
        <div className={style.content}>
          {this.state.content.map((s, index) => (
            <p key={index}>{s}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default NewsDashboard;
