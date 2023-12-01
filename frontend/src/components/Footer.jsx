import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {

    // get year
    const currentYear = new Date().getFullYear();

  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <p>EncantoCasa &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer