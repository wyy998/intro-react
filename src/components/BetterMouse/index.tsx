import React from "react";
import iconImg from "./579714.png";
import styles from "./index.module.css";

// const container: React.CSSProperties = {
//   position: "fixed",
//   width: "100%",
//   height: "100%"
// };

// const icon: React.CSSProperties = {
//   position: "fixed"
// };

type BetterMouseState = {
  readonly x: number;
  readonly y: number;
  isMove: boolean;
  readonly mouseX: number;
  readonly mouseY: number;
};

type BetterMouseProps = {};

class BetterMouse extends React.Component<BetterMouseProps, BetterMouseState> {
  readonly state: BetterMouseState = {
    x: 0,
    y: 0,
    isMove: false,
    mouseX: 0,
    mouseY: 0
  };
  constructor(props: BetterMouseProps) {
    super(props);
    this.setState({
      x: 0,
      y: 0
    });
  }

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.isMove) {
      const { mouseX, mouseY } = this.state;

      this.setState({
        x: event.clientX - mouseX,
        // x: event.clientX,
        y: event.clientY - mouseY
        // y: event.clientY
      });
    }
  };

  handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      isMove: false
    });
    event.preventDefault();
  };

  handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const { x, y } = this.state;
    this.setState({
      isMove: true,
      mouseX: event.clientX - x,
      mouseY: event.clientY - y
    });
    event.preventDefault();
    console.log(event.clientX + ":" + event.clientY);
  };

  render() {
    return (
      <div className={styles.container} onMouseMove={this.handleMouseMove}>
        <img
          className={styles.icon}
          style={{ left: this.state.x, top: this.state.y }}
          src={iconImg}
          alt=""
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </div>
    );
  }
}

export default BetterMouse;
