import { Box } from '@mui/material'
import Card from '../ListCards/Card/Card'
const COLUM_FOOTER_HEIGHT = '56px'

function ListCards() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
            5
          )} - ${
            theme.trelloCustom.columnHeaderHeight
          } - ${COLUM_FOOTER_HEIGHT})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#ced0da',
          borderRadius: '8px'
        }
      }}
    >
      <Card />
      <Card isHideMedia />
    </Box>
  )
}

export default ListCards
