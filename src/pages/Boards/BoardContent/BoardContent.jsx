import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '../../../utils/sorts'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoarContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 } // Khoảng cách di chuyển chuột để bắt đầu drag
  })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { delay: 100 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(
        (column) => column._id === active.id
      )
      const newIndex = orderedColumns.findIndex(
        (column) => column._id === over.id
      )
      // Dùng arrayMove để di chuyển column trong mảng
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  const handlOnDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id).includes(cardId)
    )
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) return
    const { active, over } = event
    if (!over || !active) return
    const {
      id: activeDraggingCardID,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeDraggingColumn = findColumnByCardId(activeDraggingCardID)
    const overColumn = findColumnByCardId(overCardId)
    console.log(activeDraggingColumn, overColumn)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handlOnDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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
        <DragOverlay>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoarContent
