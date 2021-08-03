import React from "react";
import styles from "./PagesPagination.module.css";
import Page from "./Page";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setPage, setUsers } from "../../reducers/pagination";
import { usersSelector } from "../../reducers/pagination";
import { useHistory, useParams } from "react-router-dom";

const useAsyncRequest = (getFunc, clearFunc) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const arr = history.location.pathname.split("/");
  const page = arr[arr.length - 1];
  React.useEffect(() => {
    dispatch(getFunc(page));
    return () => dispatch(clearFunc([]));
  }, [page, dispatch, getFunc, clearFunc]);
};

const PagesPagination = () => {
  const { users, page, isLoading } = useSelector(usersSelector);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  useAsyncRequest(getUsers, setUsers);

  React.useEffect(() => {
    dispatch(setPage(params.page || 1));
    //console.log(match);
  }, [params.page, dispatch]);
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
