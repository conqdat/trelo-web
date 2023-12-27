import { Box } from '@mui/material'

function BoarContent() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <h1>Content</h1>
    </Box>
  )
}

export default BoarContent
