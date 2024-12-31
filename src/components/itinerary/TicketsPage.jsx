import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, FormControl, FormLabel, FormSelect } from 'react-bootstrap';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ trip: '', status: '', file: null });
  const [filter, setFilter] = useState('all');
  const [trips, setTrips] = useState(['Trip 1', 'Trip 2', 'Trip 3']);
  const [statuses, setStatuses] = useState(['Confirmed', 'Delayed', 'Cancelled']);

  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleNewTicketChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleNewTicketFileChange = (e) => {
    setNewTicket({ ...newTicket, file: e.target.files[0] });
  };

  const handleAddNewTicket = () => {
    const newTicketObject = { ...newTicket, id: Date.now() };
    setTickets([...tickets, newTicketObject]);
    setNewTicket({ trip: '', status: '', file: null });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleStatusUpdate = (id, status) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === 'all') {
      return true;
    }
    return ticket.trip === filter;
  });

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Tickets</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <FormSelect value={filter} onChange={handleFilterChange}>
                    <option value="all">All trips</option>
                    {trips.map((trip) => (
                      <option key={trip} value={trip}>{trip}</option>
                    ))}
                  </FormSelect>
                </Col>
                <Col>
                  <Button onClick={handleAddNewTicket}>Add new ticket</Button>
                </Col>
              </Row>
              <Row className="mt-4">
                {filteredTickets.map((ticket) => (
                  <Col key={ticket.id} md={4}>
                    <Card>
                      <Card.Header>
                        <Card.Title>{ticket.trip}</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <p>Status: {ticket.status}</p>
                        {ticket.file && (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        )}
                      </Card.Body>
                      <Card.Footer>
                        <FormSelect value={ticket.status} onChange={(e) => handleStatusUpdate(ticket.id, e.target.value)}>
                          {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </FormSelect>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Add new ticket</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <FormLabel>Trip</FormLabel>
                  <FormControl type="text" name="trip" value={newTicket.trip} onChange={handleNewTicketChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl type="text" name="status" value={newTicket.status} onChange={handleNewTicketChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <FormLabel>File</FormLabel>
                  <FormControl type="file" name="file" onChange={handleNewTicketFileChange} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TicketsPage;