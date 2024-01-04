import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '../../../utils/sorts'
import { DndContext } from '@dnd-kit/core'

function BoarContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const handleDragEnd = (event) => {
    console.log(event)
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trelloCustom.boardContentHeight,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#33495e' : '#1976d2', //
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoarContent
