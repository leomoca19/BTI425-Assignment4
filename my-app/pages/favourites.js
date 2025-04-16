import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { Row, Col, Container, Card } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom)

  let content = (
    <Card>
      <h4>Nothing Here</h4>
      Try adding some new artwork to the list
    </Card>
  )

  if (!favouritesList) return null

  if (favouritesList.length > 0) {
    content = favouritesList.map((objectID) => (
      <Col lg={3} key={objectID}>
        <ArtworkCard objectID={objectID} />
      </Col>
    ))
  }

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  )
}
