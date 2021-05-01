import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const FeedBar = ({ formOpen, setFormOpen }) => {
  return (
    <div className="feedbar d-flex justify-content-between">
      <div></div>
      <div
        className="feedbar-newrecipe mr-2"
        onClick={() => setFormOpen(!formOpen)}
      >
        {formOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <>
            <FontAwesomeIcon icon={faPen} />
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </>
        )}
      </div>
    </div>
  );
};

export default FeedBar;
