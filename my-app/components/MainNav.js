import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userData'
import { readToken, removeToken } from '@/lib/authenticate'
import { useState, useEffect } from 'react'

export default function MainNav() {
  const [searchField, setSearchField] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(readToken())
  }, [])

  const handleSearch = async (event) => {
    event.preventDefault()

    if (searchField.trim()) {
      const queryString = `title=true&q=${searchField}`
      setSearchHistory(await addToHistory(queryString))
      router.push(`/artwork?${queryString}`)
      setIsExpanded(false)
    }
  }

  const logout = () => {
    setIsExpanded(false)
    removeToken()
    router.push('/login')
  }

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-dark"
        expanded={isExpanded}
        expand="lg"
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

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/search'}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" variant="outline-success">
                  Search
                </Button>
              </Form>
            )}

            <Nav>
              {token ? (
                <NavDropdown title={token.userName} id="user-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === '/login'}
                      onClick={() => setIsExpanded(false)}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === '/register'}
                      onClick={() => setIsExpanded(false)}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}
