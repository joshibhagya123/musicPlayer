import React, { PropTypes } from 'react';
import './image.scss';

const Image = (props) => {
  const { image } = props;
  return (
    <div className={'albamart'}>
      <img src={image.image} alt="background" />
    </div>
  );
};

Image.propTypes = {
  image: PropTypes.object,
};

export default Image;
