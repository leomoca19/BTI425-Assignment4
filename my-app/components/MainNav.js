import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'

export default function MainNav() {
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  function handleSubmit(event) {
    event.preventDefault()
    const art = '/artwork?'
    const title = 'title=true'
    const q = `&q=${query}`
    const final_query = art + title + q

    router.push(final_query)
    setSearchHistory((current) => [...current, title + q])
    setIsExpanded(false)
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Leonardo de la Mora Caceres</Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === '/'}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === '/search'}
                  onClick={() => setIsExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                required
                vlaue={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="user-dropdown">
                {/* I think that buttons look a bit better */}
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === '/favourites'}
                    onClick={() => setIsExpanded(false)}
                  >
                    <Button>Favourites</Button>
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === '/'}
                    onClick={() => setIsExpanded(false)}
                  >
                    <Button>Search History</Button>
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}
