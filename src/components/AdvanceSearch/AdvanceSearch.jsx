import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdvanceSearch/search.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { DateRange } from "react-date-range";
import CustDrop from "../CustDrop/CustDrop";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
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
    children: 0,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]:
        operation === "i"
          ? prev[name] + 1
          : Math.max(name === "adult" ? 1 : 0, prev[name] - 1),
    }));
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    const isLoggedIn = !!localStorage.getItem("authToken");

    if (!isLoggedIn) {
      alert("You must be logged in to continue.");
      navigate("/login");
      return;
    }

    if (destination) {
      if (diffInDays < 3) {
        alert("Date range should be at least 3 days.");
      } else {
        localStorage.setItem("to", destination);
        localStorage.setItem(
          "dates",
          JSON.stringify([{ startDate: startDate, endDate: endDate }])
        );
        localStorage.setItem("guests", JSON.stringify(options));

        navigate("/itinerary", {
          state: {
            destination,
            date: [{ startDate: date[0].startDate, endDate: date[0].endDate }],
            options,
          },
        });
      }
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
                  onSelect={(selectedOption) => setDestination(selectedOption)}
                  options={[
                    "USA, Turkish",
                    "Tokyo, Japan",
                    "Sydney, Australia",
                    "Melbourne, Australia",
                    "Paris, France",
                    "Rome, Italy",
                    "Bangkok, Thailand",
                    "Dubai, UAE",
                    "London, UK",
                    "Cape Town, South Africa",
                    "Rio de Janeiro, Brazil",
                    "New Delhi, India",
                    "Athens, Greece",
                    "Beijing, China",
                    "Kyoto, Japan",
                    "San Francisco, USA",
                    "Singapore",
                    "Istanbul, Turkey",
                    "Cairo, Egypt",
                    "Santorini, Greece",
                    "Maldives, Indian Ocean",
                    "Bora Bora, French Polynesia",
                    "Machu Picchu, Peru",
                    "Grand Canyon, USA",
                    "Great Barrier Reef, Australia",
                    "Swiss Alps, Switzerland",
                  ]}
                />
              </div>
              <div className="item-search item-search-2">
                <label className="left-date">Start Date to End Date</label>
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="item-search-label left-date"
                >
                  {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <div className="calendar-container">
                    <DateRange
                      editableDateInputs
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                    />
                  </div>
                )}
              </div>
              <div className="item-search bd-none">
                <label>Guest</label>
                <br />
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
                            disabled={
                              (option === "adult" && options[option] <= 1) ||
                              (option === "children" && options[option] <= 0)
                            }
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
