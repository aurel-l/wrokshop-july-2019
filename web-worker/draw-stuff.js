const random = ({ min = 0, max = 1, integer = true } = {}) => {
  const value = Math.random() * (max - min) + min;
  if (integer) return Math.round(value);
  return value;
};

const width = 300;
const height = 300;

export default () => {
  const canvas = document.querySelector("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  const context = canvas.getContext("2d");

  const tick = () => {
    context.fillStyle = "rgba(255, 255, 255, 0.1)";
    context.fillRect(0, 0, width, height);

    context.fillStyle = `hsl(${random({ max: 360 })}, 70%, ${random({
      min: 35,
      max: 65,
      integer: false
    })}%)`;
    context.fillRect(
      random({ max: width }), // x
      random({ max: height }), // y
      random({ max: 50 }), // width
      random({ max: 50 }) // height
    );
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};
