import React from "react";
import styles from "./PagesPagination.module.css";
import Page from "./Page";
import Pagination from "./Pagination";
import api from "./api";

const PagesPagination = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    api
      .getUsers(currentPage)
      .then((res) => {
        setUsers(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(users);

  return (
    <div className={styles.wrapper}>
      <h1>Pages pagination</h1>
      <Page number={currentPage} usersList={users} isLoading={isLoading} />
      <Pagination
        pages={20}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PagesPagination;
