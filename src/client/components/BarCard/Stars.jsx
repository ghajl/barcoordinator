import React from 'react';
import uuidv1 from 'uuid/v1';
import Star from '../Star';

function Stars({ rating }) {
  const stars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    const key = uuidv1();
    stars.push(<Star key={key} width="20" color="#ffd10e" percent="1" />);
  }
  const percent = rating % 1;
  if (percent > 0) {
    const key = uuidv1();
    stars.push(<Star key={key} width="20" color="#ffd10e" percent={percent} />);
  }
  return stars;
}

export default Stars;
