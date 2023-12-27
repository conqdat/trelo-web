import { Box } from '@mui/material'

function BoardBar() {
  return (
    <Box
      sx={{
        height: (them) => them.trelloCustom.boardBarHeight,
        width: '100%',
        backgroundColor: 'primary.dark',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board Bar
    </Box>
  )
}

export default BoardBar
