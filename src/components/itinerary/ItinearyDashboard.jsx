import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ReactSpeedometer from 'react-d3-speedometer';
import './itinearydashboard.css'; // Include styles for spinner and card
import ItinearyHeader from './ItinearyHeader';

const ItinearyDashboard = () => {
  const [showItenary, setShowItenary] = useState(false);
  const [itenaryLimit, setItenaryLimit] = useState(5);
  const [itenaryUsed, setItenaryUsed] = useState(0);
  const [costData, setCostData] = useState([
    { name: 'Day1', cost: 100 },
    { name: 'Day2', cost: 120 },
    { name: 'Day3', cost: 140 },
    { name: 'Day4', cost: 160 },
    { name: 'Day5', cost: 180 },
  ]);
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch itinerary data from backend
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getItinerary');
        setItineraries(response.data.itineraries);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, []);

  // Track active time on the website
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleViewItenary = () => {
    setShowItenary(!showItenary);
  };

  // Convert active time to hours, minutes, and seconds
  const activeHours = Math.floor(activeSeconds / 3600);
  const activeMinutes = Math.floor((activeSeconds % 3600) / 60);
  const activeRemainingSeconds = activeSeconds % 60;

  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner-circle"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <ItinearyHeader />
      <Container className="dashboard-container mt-5">
        <Row className="mb-4">
          <Col md={12}>
            <h1 className="dashboard-title">Dashboard</h1>
          </Col>
        </Row>
        <Row>
          {/* Itenary Card */}
          <Col md={6} className="mb-4">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>Itenary</Card.Title>
                <Card.Text>Manage your itenary history and limits</Card.Text>
                <Button variant="primary" onClick={handleViewItenary}>
                  {showItenary ? 'Hide Itenary' : 'View Itenary'}
                </Button>
                {showItenary && (
                  <div className="itenary-list mt-4">
                    <h5 className="itenary-title">Itenary History</h5>
                    {itineraries.length > 0 ? (
                      <div className="card-container">
                        {itineraries.map((itinerary, index) => (
                          <div className="card" key={index}>
                            <h3>{itinerary.destination}</h3>
                            <p>
                              <strong>Start Date:</strong> {itinerary.date.startDate}
                            </p>
                            <p>
                              <strong>End Date:</strong> {itinerary.date.endDate}
                            </p>
                            <p>
                              <strong>Options:</strong> {itinerary.options.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No itineraries available.</p>
                    )}
                  </div>
                )}
                <div className="mt-4">
                  <p className="itenary-limit">Itenary Limit: {itenaryLimit}</p>
                  <p className="itenary-used">Itenary Used: {itenaryUsed}</p>
                  <ProgressBar
                    now={(itenaryUsed / itenaryLimit) * 100}
                    label={`${((itenaryUsed / itenaryLimit) * 100).toFixed(0)}%`}
                    className="itenary-progress"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Cost History Card */}
          <Col md={6} className="mb-4">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>Cost History</Card.Title>
                <Card.Text>Track your monthly cost trends</Card.Text>
                <LineChart
                  width={500}
                  height={300}
                  data={costData}
                  className="cost-chart"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* Active Time Speedometer */}
          <Col md={12} className="mb-4">
            <Card className="dashboard-card text-center">
              <Card.Body>
                <Card.Title>Active Time</Card.Title>
                <Card.Text>Track how long you've been active on this site</Card.Text>
                <ReactSpeedometer
                  value={activeSeconds % 3600}
                  minValue={0}
                  maxValue={3600}
                  needleColor="red"
                  startColor="green"
                  endColor="blue"
                  segments={6}
                  width={300}
                  height={200}
                  textColor="#000"
                  forceRender
                />
                <div className="active-time">
                  <h3>
                    {activeHours}h : {activeMinutes}m : {activeRemainingSeconds}s
                  </h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItinearyDashboard;
