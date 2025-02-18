import useSWR from 'swr'
import Error from 'next/error'
import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  )

  if (error) {
    return <Error statusCode={404} />
  } else if (!data) {
    return null
  }

  const na = 'N/A',
    imgUrl =
      data.primaryImageSmall ||
      'https://placehold.co/375x375?text=Not+Available',
    title = data.title || na,
    date = data.objectDate || na,
    calssification = data.classification || na,
    medium = data.medium || na

  return (
    <>
      <Card>
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {date}
            {calssification}
            {medium}
          </Card.Text>
          <Link href={`/artwork/${objectID}`} legacyBehavior passHref>
            <Button variant="primary">ID: {objectID}</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}
