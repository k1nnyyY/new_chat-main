import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  const lastItems = totalItems - itemsPerPage * (totalPages - 1);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const smallRenderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <span
            key={i}
            className={i==currentPage?styles.pag_active:styles.pag_disabled}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
    }

    return (
        <div className={styles.pag}>
            <button onClick={handlePrev} disabled={currentPage === 1}>←</button>
            {pages}
            <button onClick={handleNext} disabled={currentPage === totalPages}>→</button>
        </div>
        );

  }

  const renderPages = () => {
    const pages = [];

    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(
          <span
            key={i}
            className={i==currentPage?styles.pag_active:styles.pag_disabled}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
      pages.push(<span className={styles.pag_dot} key="ellipsis1">...</span>);
      pages.push(
        <span
          key={totalPages}
          className={totalPages==currentPage?styles.pag_active:styles.pag_disabled}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </span>
      );
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        <span
          key={1}
          className={1==currentPage?styles.pag_active:styles.pag_disabled}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </span>
      );
      pages.push(<span className={styles.pag_dot} key="ellipsis2">...</span>);
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(
          <span
            key={i}
            className={i==currentPage?styles.pag_active:styles.pag_disabled}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
    } else {
      pages.push(
        <span
          key={1}
          className={1==currentPage?styles.pag_active:styles.pag_disabled}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </span>
      );
      pages.push(<spa className={styles.pag_dot} key="ellipsis3">...</spa>);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(
          <span
            key={i}
            className={i==currentPage?styles.pag_active:styles.pag_disabled}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
      pages.push(<span className={styles.pag_dot} key="ellipsis4">...</span>);
      pages.push(
        <span
          key={totalPages}
          className={totalPages==currentPage?styles.pag_active:styles.pag_disabled}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </span>
      );
    }

    return (
        <div className={styles.pag}>
            <button onClick={handlePrev} disabled={currentPage === 1}>←</button>
            {pages}
            <button onClick={handleNext} disabled={currentPage === totalPages}>→</button>
        </div>
        );
  };

  return (
  <div>
    {
        totalPages>5?
        renderPages()
        :
        smallRenderPages()
    }
    <div>
        <h5 className={styles.h6}>Показано {currentPage===totalPages?lastItems:itemsPerPage} из {totalItems}</h5>
    </div>
  </div>);
};

export default Pagination;
