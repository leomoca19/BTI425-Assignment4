import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function MainNav() {
  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary">
        <Container>
          <Navbar.Brand>Leonardo de la Mora Caceres</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}
