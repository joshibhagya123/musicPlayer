import React, { PropTypes } from 'react';
import './Title.scss';

const Title = (props) => {
  const { data } = props;
  return (
    <div className={'title'}>
      <h3>{data.title}</h3>
    </div>
  );
};
Title.propTypes = {
  data: PropTypes.object,
};

export default Title;
