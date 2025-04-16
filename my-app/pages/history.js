import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { useRouter } from 'next/router'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'
import styles from '@/styles/History.module.css'
import { removeFromHistory } from '@/lib/userData'

export default function History() {
  const router = useRouter()
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  if (!searchHistory) return null

  function historyClicked(event, index) {
    router.push(`/artwork?${searchHistory[index]}`)
  }

  async function removeHistoryClicked(event, index) {
    event.stopPropagation()
    setSearchHistory(await removeFromHistory(searchHistory[index]))
  }

  const emptyContent = (
    <Card>
      <h4>Nothing Here</h4>
      Try searching from some artwork
    </Card>
  )

  return (
    <>
      <Container>
        {searchHistory.length > 0 ? (
          <ListGroup>
            {searchHistory.map((query, index) => {
              let params = new URLSearchParams(query)
              let parsedQuery = Object.fromEntries(params.entries())

              return (
                <ListGroup.Item
                  key={index}
                  onClick={(e) => historyClicked(e, index)}
                  className={styles.historyListItem}
                >
                  {Object.keys(parsedQuery).map((key) => (
                    <span key={key}>
                      {key}: <strong>{parsedQuery[key]}</strong>&nbsp;
                    </span>
                  ))}
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={(e) => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        ) : (
          emptyContent
        )}
      </Container>
    </>
  )
}
