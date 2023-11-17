import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import styles from './LoadingSpinner.module.css';
const LoadingSpinner = () => {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
  
    return (
      <div className={styles.sweet_loading}>
        <ClipLoader
          css={override}
          size={55}
          color={"#36D7B7"}
          loading={true}
        />
      </div>
    );
  };
  
  export default LoadingSpinner;
  