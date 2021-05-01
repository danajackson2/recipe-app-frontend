import { Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faTimes,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

const FeedBar = ({
  formOpen,
  setFormOpen,
  filters,
  setFilters,
  sort,
  setSort,
  sortDirection,
  setSortDirection,
}) => {
  const sortOptions = () => {
    const options = ["Date", "Likes"];

    return options.map((option) => <option>{option}</option>);
  };

  return (
    <div className="feedbar d-flex justify-content-between">
      <Form style={{ width: "80%" }} className="ml-3">
        <Form.Row>
          <Col xs={"auto"}>
            <p>Sort by:</p>
          </Col>
          <Col xs={"auto"}>
            <Form.Control
              as="select"
              size="sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions()}
            </Form.Control>
          </Col>
          <Col xs={"auto"}>
            <FontAwesomeIcon
              className="feedbar-icon"
              icon={sortDirection === "desc" ? faArrowDown : faArrowUp}
              onClick={() => {
                sortDirection === "desc"
                  ? setSortDirection("asc")
                  : setSortDirection("desc");
              }}
            />
          </Col>
          <Col xs={"auto"}>
            <p className="ml-2">Filters:</p>
          </Col>
          <Col xs={"auto"}>
            <p>Liked</p>
          </Col>
          <Col xs={"auto"}>
            {filters.some((filter) => filter === "liked") ? (
              <FontAwesomeIcon
                className="feedbar-icon"
                icon={faCheckSquare}
                onClick={() =>
                  setFilters(filters.filter((filter) => filter !== "liked"))
                }
              />
            ) : (
              <FontAwesomeIcon
                className="feedbar-icon"
                icon={faSquare}
                onClick={() => setFilters([...filters, "liked"])}
              />
            )}
          </Col>
          <Col xs={"auto"}>
            <p className="ml-1">Your Recipes</p>
          </Col>
          <Col xs={"auto"}>
            {filters.some((filter) => filter === "yours") ? (
              <FontAwesomeIcon
                className="feedbar-icon"
                icon={faCheckSquare}
                onClick={() =>
                  setFilters(filters.filter((filter) => filter !== "yours"))
                }
              />
            ) : (
              <FontAwesomeIcon
                className="feedbar-icon"
                icon={faSquare}
                onClick={() => setFilters([...filters, "yours"])}
              />
            )}
          </Col>
        </Form.Row>
      </Form>
      <div className="feedbar-icon mr-3" onClick={() => setFormOpen(!formOpen)}>
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
