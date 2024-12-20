import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdvanceSearch/search.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { DateRange } from "react-date-range";
import CustDrop from "../CustDrop/CustDrop";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { format } from "date-fns";

const AdvanceSearch = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" 
        ? prev[name] + 1 
        : Math.max(name === "adult" ? 1 : 0, prev[name] - 1),
    }));
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination) {
      navigate("/itinerary", { state: { destination, date, options } });
    } else {
      alert("Please select a destination.");
    }
  };

  return (
    <section className="box-search-advance">
      <Container>
        <Row>
          <Col md={12}>
            <div className="box-search shadow-sm">
              <div className="item-search">
              <CustDrop
                label="Location"
                onChange={(e) => setDestination(e.target.value)}
                onSelect={(selectedOption) => setDestination(selectedOption)} // Update the destination state
                options={[
                  "USA, Turkish",
                  "Tokyo, Japan",
                  "Sydney, Australia",
                  "Melbourne, Australia",
                  "Paris, France",
                ]}
/>


              </div>
              <div className="item-search item-search-2">
                <label>Start Date to End Date</label>
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="item-search-label"
                >
                  {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                )}
              </div>
              <div className="item-search bd-none">
                <label>Guest</label><br></br>
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children`}</span>
                {openOptions && (
                  <div className="options">
                    {["adult", "children"].map((option) => (
                      <div className="optionItem" key={option}>
                        <span className="optionText">
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </span>
                        <div className="optionCounter">
                          <button
                            disabled={option === "adult" && options[option] <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption(option, "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options[option]}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption(option, "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="item-search bd-none">
                <Button
                  onClick={handleSearch}
                  className="primaryBtn flex-even d-flex justify-content-center"
                >
                  Create Itinerary
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdvanceSearch;
