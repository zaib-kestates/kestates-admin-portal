import PropTypes from 'prop-types';

function DialogHeader({ text }) {
  return <label className="page-header">{text}</label>;
}

DialogHeader.propTypes = {
  text: PropTypes.string,
};

export default DialogHeader;
