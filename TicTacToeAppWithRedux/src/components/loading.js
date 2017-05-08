import React, { Component } from 'react';

class LoadingIcon extends Component {

  componentDidMount() {
    let svg = new Snap('.svg-main');
    function animateMe() {
      svg.clear();
      let rect1 = svg.rect(20, 20, 25, 25);
      let rect2 = svg.rect(45, 20, 25, 25);
      let rect3 = svg.rect(20, 45, 25, 25);
      let rect4 = svg.rect(45, 45, 25, 25);

      rect1.attr({
        fill: "#42f4bf",
        stroke: "#000",
        strokeWidth: 1
      });

      rect2.attr({
        fill: "#42f4bf",
        stroke: "#000",
        strokeWidth: 1
      });

      rect3.attr({
        fill: "#42f4bf",
        stroke: "#000",
        strokeWidth: 1
      });

      rect4.attr({
        fill: "#42f4bf",
        stroke: "#000",
        strokeWidth: 1
      });

      rect1.animate({
        x: 10,
        y: 10,
        fill: "#41ebf4",
        stroke: "#42f4bf"
      }, 500, () => {
          rect1.animate({
            x: 55,
            y: 10
          }, 500, () => {
            rect1.animate({
              x: 45,
              y: 20,
              fill: "#42f4bf",
              stroke: "#000"
            }, 500);
          })
        });

      rect2.animate({
        x: 55,
        y: 10,
        fill: "#41ebf4",
        stroke: "#42f4bf"
      }, 500, () => {
          rect2.animate({
            x: 55,
            y: 55
          }, 500, () => {
            rect2.animate({
              x: 45,
              y: 45,
              fill: "#42f4bf",
              stroke: "#000"
            }, 500);
          })
        });

      rect3.animate({
        x: 10,
        y: 55,
        fill: "#41ebf4",
        stroke: "#42f4bf"
      }, 500, () => {
          rect3.animate({
            x: 10,
            y: 10
          }, 500, () => {
            rect3.animate({
              x: 20,
              y: 20,
              fill: "#42f4bf",
              stroke: "#000"
            }, 500);
          })
        });

      rect4.animate({
        x: 55,
        y: 55,
        fill: "#41ebf4",
        stroke: "#42f4bf"
      }, 500, () => {
          rect4.animate({
            x: 10,
            y: 55
          }, 500, () => {
            rect4.animate({
              x: 20,
              y: 45,
              fill: "#42f4bf",
              stroke: "#000"
            }, 500);
          })
        });
    };

    setInterval(animateMe, 1500);
  }
  render() {
    return (
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <svg className='svg-main' width='90px' height='90px'></svg>
      </div>
    )
  }
}

export default LoadingIcon;
