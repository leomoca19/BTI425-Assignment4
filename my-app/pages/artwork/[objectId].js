import { useRouter } from 'next/router'
import { Row, Col, Card } from 'react-bootstrap'
import ArtworkCardDetail from '@/components/ArtworkCardDetail'

export default function ArtworkById() {
  const router = useRouter()
  const { objectId } = router.query

  if (!objectId) return <Card>Loading...</Card>

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectId} />
        </Col>
      </Row>
    </>
  )
}
