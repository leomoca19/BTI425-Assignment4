import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { useRouter } from 'next/router'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'
import styles from '@/styles/History.module.css'

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const router = useRouter()

  let parsedHistory = []

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h)
    let entries = params.entries()
    parsedHistory.push(Object.fromEntries(entries))
  })

  function historyClicked(event, index) {
    router.push(`/artwork?${searchHistory[index]}`)
  }

  function removeHistoryClicked(event, index) {
    event.stopPropagation()
    setSearchHistory((current) => {
      let x = [...current]
      x.splice(index, 1)

      return x
    })
  }

  let content = (
    <Card>
      <h4>Nothing Here</h4>
      Try searching from some artwork
    </Card>
  )

  if (parsedHistory.length > 0) {
    content = (
      <ListGroup>
        {parsedHistory.map((search, index) => (
          <ListGroup.Item
            onClick={(e) => historyClicked(e, index)}
            className={styles.historyListItem}
          >
            {Object.keys(search).map((key) => (
              <>
                {key}: <strong>{search[key]}</strong>&nbsp;
              </>
            ))}
            <Button
              classname="float-end"
              variant="danger"
              size="sm"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              &times;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
    console.log(content)
  }

  return (
    <>
      <Container>{content}</Container>
    </>
  )
}
