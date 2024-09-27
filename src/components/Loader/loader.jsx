import { PropagateLoader } from "react-spinners";

export default function Loader() {
  return (
    <PropagateLoader
      color="#1890ff"
      cssOverride={{
        left: "50%",
        top: "50%",
      }}
    />
  );
}
