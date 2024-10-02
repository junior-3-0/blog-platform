import { Pagination } from "antd";
import { fetchArticles } from "../../store/article.slice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export default function Paginations({ total }) {
  const controllerRef = useRef();
  const dispatch = useDispatch();
  let curr = JSON.parse(localStorage.getItem("curr"));
  if (!curr) {
    curr = 1;
  }

  const onChange = (payload) => {
    curr = payload;
    localStorage.setItem("curr", JSON.stringify(curr));

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    dispatch(fetchArticles({ offset: (payload - 1) * 5, signal }));
  };

  useEffect(() => {
    return localStorage.removeItem("curr");
  }, []);

  return (
    <Pagination
      style={{ marginTop: "2.7rem" }}
      align="center"
      defaultCurrent={curr}
      showSizeChanger={false}
      pageSize={5}
      total={total}
      onChange={(e) => onChange(e)}
    />
  );
}
