import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'

function BoarContent({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#33495e' : '#1976d2', //
        p: '10px 0'
      }}
    >
      <ListColumns columns={board?.columns} />
    </Box>
  )
}

export default BoarContent
