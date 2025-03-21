import useSWR from 'swr'
import Error from 'next/error'
import { Card, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'

const url_base = `https://collectionapi.metmuseum.org/public/collection/v1/objects/`

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? url_base + objectID : null)

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [showAdded, setShowAdded] = useState(false)
  useEffect(() => {
    setShowAdded(favouritesList.includes(objectID))
  }, [favouritesList, objectID])

  if (error) {
    return <Error statusCode={404} />
  } else if (!data) {
    return null
  }

  function favouritesClicked() {
    if (showAdded) {
      setFavouritesList((current) => current.filter((fav) => fav != objectID))
      setShowAdded(false)
    } else {
      setFavouritesList((current) => [...current, objectID])
      setShowAdded(true)
    }
  }

  const na = 'N/A',
    imgUrl = data?.primaryImage || '',
    title = data?.title || na,
    date = data?.objectDate || na,
    calssification = data?.classification || na,
    medium = data?.medium || na,
    artistName = data?.artistDisplayName || na,
    artistUrl = data?.artistWikidata_URL,
    creditLine = data?.creditLine || na,
    dimensions = data?.dimensions || na

  return (
    <>
      <Card>
        {imgUrl && <Card.Img variant="top" src={imgUrl} />}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {date}
            <br />
            <strong>Classification: </strong>
            {calssification}
            <br />
            <strong>Medium: </strong>
            {medium}
            <br />
            <br />
            <strong>Artist: </strong>
            {artistName}

            {artistName !== na && (
              <>
                (&nbsp;
                <a href={artistUrl} target="_blank" rel="noreferrer">
                  wiki
                </a>
                &nbsp;)
              </>
            )}

            <br />

            <strong>Credit Line: </strong>
            {creditLine}
            <br />
            <strong>Dimensions: </strong>
            {dimensions}
          </Card.Text>
          <Button
            variant={showAdded ? 'primary' : 'outline-primary'}
            onClick={favouritesClicked}
          >
            + Favourite{showAdded && ' (added)'}
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}
