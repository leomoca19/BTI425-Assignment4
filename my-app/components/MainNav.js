import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MainNav() {
  const router = useRouter()

  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    router.push(`/artwork?title=true&q=${query}`)
  }

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
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Search"
                required
                vlaue={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="success">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}
