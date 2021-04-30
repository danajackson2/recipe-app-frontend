import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";

const FeedBar = () => {
  return (
    <div className="feedbar d-flex justify-content-between">
      <div></div>
      <div className="feedbar-newrecipe mr-2">
        <FontAwesomeIcon icon={faPen} />
        <FontAwesomeIcon icon={faPlus} size="sm" />
      </div>
    </div>
  );
};

export default FeedBar;
