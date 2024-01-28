import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);
  console.log("message:", error);
  function handleClick(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error}</p>
      <button onClick={(e) => handleClick(e)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
