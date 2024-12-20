import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const BudgetTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ name: '', amount: 0, category: '' });
    const [totalCost, setTotalCost] = useState(0);
  
    const categories = ['Food', 'Transportation', 'Accommodation', 'Other'];
  
    const handleAddExpense = () => {
      setExpenses([...expenses, newExpense]);
      setTotalCost(totalCost + newExpense.amount);
      setNewExpense({ name: '', amount: 0, category: '' });
    };
  
    const handleRemoveExpense = (index) => {
      const newExpenses = expenses.filter((expense, i) => i !== index);
      setExpenses(newExpenses);
      setTotalCost(newExpenses.reduce((acc, expense) => acc + expense.amount, 0));
    };
  return (
    <Container className="mt-5">
    <Row>
      <Col md={12}>
        <Card>
          <Card.Header>
            <h2>Budget Tracker</h2>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Expense Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newExpense.name}
                      onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: parseInt(e.target.value) })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" onClick={handleAddExpense}>
                Add Expense
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col md={12}>
        <Card>
          <Card.Header>
            <h2>Expenses</h2>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {expenses.map((expense, index) => (
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={6}>
                      {expense.name}
                    </Col>
                    <Col md={3}>
                      ${expense.amount}
                    </Col>
                    <Col md={3}>
                      <Button variant="danger" onClick={() => handleRemoveExpense(index)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <h2>Total Cost: ₹{totalCost}</h2>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default BudgetTracker