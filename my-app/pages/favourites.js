import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { Row, Col, Container } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom)

  let content = <p>You have not mark any artwork as favourite yet.</p>

  if (favouritesList.length > 0) {
    content = favouritesList.map((objectID) => (
      <Col lg={3} key={objectID}>
        <ArtworkCard objectID={objectID} />
      </Col>
    ))
  }

  return (
    <Container>
      <h1>Favourite Arwork</h1>
      <Row>{content}</Row>
    </Container>
  )
}
