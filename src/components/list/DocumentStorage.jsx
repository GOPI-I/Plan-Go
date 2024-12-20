import React ,{useState}from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import ListHeader from './ListHeader';

const categories = [
    { id: 1, name: 'Passport' },
    { id: 2, name: 'Tickets' },
    { id: 3, name: 'Visa' },
    { id: 4, name: 'Travel Insurance' },
    { id: 5, name: 'Hotel Reservation' },
    { id: 6, name: 'Flight Itinerary' },
  ];
const DocumentStorage = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [documentDescription, setDocumentDescription] = useState('');
    const [documentFile, setDocumentFile] = useState(null);
    const [documents, setDocuments] = useState([]);
  
    const handleAddDocument = () => {
      const newDocument = {
        category: selectedCategory,
        name: documentName,
        description: documentDescription,
        file: documentFile,
      };
      setDocuments([...documents, newDocument]);
      setSelectedCategory('');
      setDocumentName('');
      setDocumentDescription('');
      setDocumentFile(null);
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setDocumentFile(file);
      } else {
        alert('Only PDF and image files are allowed');
      }
    };
  return (
    <>
    <ListHeader/>
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <Card.Header>
          <Card.Title>Document Storage</Card.Title>
          <Card.Subtitle>Store your important travel documents here.</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Category</Form.Label>
                <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Document Name</Form.Label>
                <Form.Control type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Label>Document Description</Form.Label>
                <Form.Control type="text" value={documentDescription} onChange={(e) => setDocumentDescription(e.target.value)} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Label>Document File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
                {documentFile && (
                  <p>
                    Selected file: {documentFile.name} ({documentFile.type})
                  </p>
                )}
              </Col>
            </Row>
            <Button onClick={handleAddDocument}>Add Document</Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          <p>Documents:</p>
          <ul className="list-disc space-y-2">
            {documents.map((document, index) => (
              <li key={index}>
                <span className="font-bold">{document.name}</span> ({document.category}) - {document.description}
              </li>
            ))}
          </ul>
        </Card.Footer>
      </Card>
    </div>
    </>
  )
}

export default DocumentStorage