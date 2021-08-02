import React, { useState } from "react";
import styles from "./PagesPagination.module.css";
import Page from "./Page";
import Pagination from "./Pagination";
import api from "./api";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setPage } from "../../reducers/pagination";
import { usersSelector } from "../../reducers/pagination";
import store from "../../store";

const PagesPagination = ({ match, history }) => {
  const { users, page, isLoading } = useSelector(usersSelector);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUsers(page));
  }, [page]);

  React.useEffect(() => {
    dispatch(setPage(match.params.page || 1));
    console.log(match);
  }, [match.params.page]);
  const onPageChange = (page) => {
    history.push(`/pagination/${page}`);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Pages pagination</h1>
      <Page number={page} usersList={users} isLoading={isLoading} />

      <Pagination pages={20} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};

export default PagesPagination;
