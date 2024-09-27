import { Pagination } from "antd";
import { fetchArticles } from "../../store/article.slice";
import { useDispatch } from "react-redux";
import { useRef } from "react";

export default function Paginations({ total }) {
  const controllerRef = useRef();
  const dispatch = useDispatch();

  const onChange = (payload) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    dispatch(fetchArticles({ offset: (payload - 1) * 5, signal }));
  };

  return (
    <Pagination
      style={{ marginTop: "2.7rem" }}
      align="center"
      defaultCurrent={1}
      showSizeChanger={false}
      pageSize={5}
      total={total}
      onChange={(e) => onChange(e)}
    />
  );
}
