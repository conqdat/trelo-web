import DeleteIcon from '@mui/icons-material/Delete'
import AndroidIcon from '@mui/icons-material/Android'

import Button from '@mui/material/Button'

function App() {
  return (
    <>
      <h1>React App</h1>
      <Button variant="contained">Hello world</Button>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <svg data-testid="DeleteIcon"></svg>
      <DeleteIcon />
      <AndroidIcon />
    </>
  )
}

export default App
