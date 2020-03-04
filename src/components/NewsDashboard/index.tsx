import React from "react";
import style from "./index.module.css";
import { Card } from "antd";

const { Meta } = Card;
const url = "news.json";
//   "http://v.juhe.cn/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5";

interface state {
  title: string;
  data: Array<Object>;
}

class NewsDashboard extends React.Component<{}, state> {
  constructor(props: {}) {
    super(props);
    this.state = {
      title: "Hahah",
      data: []
    };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ data: data.result.data });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className={style.container}>
        {this.state.data.map((d: any, index) => (
          <Card
            key={index}
            className={style.card}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={d.date} src={d.thumbnail_pic_s} />}
            onClick={() => window.open(d.url)}
          >
            <Meta title={d.title} description={d.author_name} />
          </Card>
        ))}
      </div>
    );
  }
}

export default NewsDashboard;
