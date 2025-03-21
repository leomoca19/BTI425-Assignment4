import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Error from 'next/error'
import { Row, Col, Card, Pagination } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'
import validObjectIDList from '@/public/data/validObjectIDList.json'
const PER_PAGE = 12

export default function Artwork() {
  const router = useRouter()
  let finalQuery = router.asPath.split('?')[1]

  const [artworkList, setArtworkList] = useState(null)
  const [page, setPage] = useState(1)
  if (!page) setPage(1)

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  )

  useEffect(() => {
    if (data) {
      let results = []
      let filteredValidIds = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      )

      for (let i = 0; i < filteredValidIds.length; i += PER_PAGE) {
        const chunk = filteredValidIds.slice(i, i + PER_PAGE)
        results.push(chunk)
      }

      setArtworkList(results)
      setPage(1)
    }
  }, [data])

  if (error) return <Error statusCode={404} />

  function previousPage() {
    if (page > 1) setPage(page - 1)
  }
  function nextPage() {
    if (page < artworkList.length) setPage(page + 1)
  }

  if (artworkList) {
    const nothingHere = (
      <Col>
        <Card>
          <h4>Nothing Here</h4>Try searching for something else
        </Card>
      </Col>
    )

    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0
            ? artworkList[page - 1].map((objectID) => (
                <Col lg={3} key={objectID}>
                  <ArtworkCard objectID={objectID} />
                </Col>
              ))
            : nothingHere}
        </Row>
        {artworkList.length > 0 && (
          <>
            <br />
            <Row>
              <Col>
                <Pagination>
                  <Pagination.Prev onClick={previousPage} />
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </Col>
            </Row>
          </>
        )}
      </>
    )
  }

  return null
}
