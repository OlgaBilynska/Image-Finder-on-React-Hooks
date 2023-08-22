import css from './ImageErrorView.module.css';
import PropTypes from 'prop-types';

export default function ImageErrorView({ query }) {
  return (
    <div role="alert" className={css.errorBlock}>
      <span className={css.error}>
        There is no category with this name: {query}
      </span>
    </div>
  );
}

ImageErrorView.propTypes = {
  query: PropTypes.string,
};
