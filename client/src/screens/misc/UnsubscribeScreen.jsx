import { useDispatch, useSelector } from "react-redux";
import { unsubscribe } from "redux/actions/newsletter";

const UnsubscribeScreen = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newsletter);

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    dispatch(unsubscribe("itsbaldeep@gmail.com"));
  };

  return (
    <div>
      <div>Would you like to unsubscribe to the newsletter?</div>
      {error && <div>{error}</div>}
      <button onClick={handleUnsubscribe} disabled={loading}>
        Unsubscribe
      </button>
    </div>
  );
};

export default UnsubscribeScreen;
