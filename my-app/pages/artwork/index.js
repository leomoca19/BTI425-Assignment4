import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Error from 'next/error'
import { Col } from 'react-bootstrap'

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

  function previousPage() {
    if (page > 1) setPage(page - 1)
  }
  function nextPage() {
    if (page < artworkList.length) setPage(page + 1)
  }

  useEffect(() => {
    if (data) {
      let results = []

      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE)
        results.push(chunk)
      }

      setArtworkList(results)
      setPage(1)
    }
  }, [data])

  if (error) return <Error statusCode={404} />

  if (artworkList) {
    const nothing_here = (
      <Col>
        <Card>
          <h4>Nothing Here</h4>Try searching for something else.
        </Card>
      </Col>
    )

    const option1 = artworkList[page - 1].forEach(
      (element) => 'Under construction'
    )
    const option2 = 0

    return <>{artworkList.length > 0 ? <>{option1}</> : nothing_here}</>
  }

  return null
}
