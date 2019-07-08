import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styles from './StarStyles';

const useStyles = makeStyles(styles);

const drawStar = (canvas, radius, color, fillPercent, ratio) => {
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  const outerRadius = radius;
  const innerRadius = radius / 2.3;
  const cx = radius;
  const cy = radius;
  const spikes = 5;
  let rot = (Math.PI / 2) * 3;
  let x = radius;
  let y = radius;
  const step = Math.PI / 5;
  const lineWidth = radius / 3.5;
  const indent = lineWidth * 1.5;
  const innerArea = radius * 2 - indent * 2;
  const fillRight = indent + innerArea * fillPercent;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, fillRight, 60);

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.fill();
};

function Star({ className, style, color, percent, width, ...props }) {
  const classes = useStyles({ width });
  const starRef = useRef(null);
  useEffect(() => {
    const ratio = window?.devicePixelRatio || 1;
    const radius = width / 2;
    starRef.current.width = width * ratio;
    starRef.current.height = width * ratio;
    drawStar(starRef.current, radius, color, percent, ratio);
  }, []);

  return (
    <canvas
      className={`${classes.star} ${className}`}
      ref={starRef}
      style={{ ...style }}
      {...props}
    >
      Star
    </canvas>
  );
}

export default Star;

Star.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  width: PropTypes.string,
  color: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Star.defaultProps = {
  className: '',
  style: {},
  width: '10',
  color: '#000',
  percent: 1
};
