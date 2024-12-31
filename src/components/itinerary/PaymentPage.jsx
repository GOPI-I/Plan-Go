import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Alert } from 'react-bootstrap';
import './payment.css'; // Custom styles for payment page

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleCardExpiryChange = (e) => setCardExpiry(e.target.value);
  const handleCardCvvChange = (e) => setCardCvv(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handlePayment = (e) => {
    e.preventDefault();
    if (cardNumber && cardExpiry && cardCvv && amount) {
      setShowModal(true);
      setModalMessage('Payment successful!');
    } else {
      setShowModal(true);
      setModalMessage('Please fill in all fields!');
    }
  };

  return (
    <Container className="payment-container">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="payment-card">
            <Card.Body>
              <Card.Title className="text-center">Payment Details</Card.Title>
              <Form onSubmit={handlePayment}>
                <Form.Group className="mb-3" controlId="card-number">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="card-expiry">
                  <Form.Label>Card Expiry</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardExpiry}
                    onChange={handleCardExpiryChange}
                    placeholder="MM/YY"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="card-cvv">
                  <Form.Label>Card CVV</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardCvv}
                    onChange={handleCardCvvChange}
                    placeholder="123"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </Form.Group>

                <div className="payment-methods">
                  <h5>Choose Payment Method</h5>
                  <div className="payment-logos">
                    <img src="/assets/visa-logo.png" alt="Visa" className="payment-logo" />
                    <img src="/assets/mastercard-logo.png" alt="MasterCard" className="payment-logo" />
                    <img src="/assets/paypal-logo.png" alt="PayPal" className="payment-logo" />
                  </div>
                </div>

                <Button variant="primary" type="submit" className="w-100 payment-button">
                  Pay Now
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={modalMessage.includes('successful') ? 'success' : 'danger'}>
            {modalMessage}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentPage;
