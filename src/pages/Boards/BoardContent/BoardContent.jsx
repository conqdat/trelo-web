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
  DragOverlay,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

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
  const [oldColumn, setOldColumn] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const moveCardBetweenTwoColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeDraggingColumn,
    activeDraggingCardID,
    activeDraggingCardData
  ) => {
    setOrderedColumns((preColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      )

      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(preColumns) // cloneDeep để tạo ra một bản copy của mảng preColumns
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeDraggingColumn._id
      )
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      )

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardID
        )
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        )
      }

      if (nextOverColumn) {
        nextOverColumn.card = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardID
        )
        const rebuildActiveDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuildActiveDraggingCardData
        )
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        )
      }

      return nextColumns
    })
  }

  const handlOnDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || !active) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardID,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over // overCardId là id của column chứa card đang drag

      const activeDraggingColumn = findColumnByCardId(activeDraggingCardID)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeDraggingColumn || !overColumn) return

      if (oldColumn._id !== overColumn._id) {
        moveCardBetweenTwoColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeDraggingColumn,
          activeDraggingCardID,
          activeDraggingCardData
        )
      } else {
        const oldCardIndex = oldColumn?.cards?.findIndex(
          (column) => column._id === activeDragItemId
        )
        const newCardIndex = overColumn?.cards?.findIndex(
          (column) => column._id === overCardId
        )
        const dndOrderedCards = arrayMove(
          oldColumn?.cards,
          oldCardIndex,
          newCardIndex
        )
        setOrderedColumns((preColumns) => {
          const nextColumns = cloneDeep(preColumns)
          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)

          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (column) => column._id === active.id
        )
        const newColumnIndex = orderedColumns.findIndex(
          (column) => column._id === over.id
        )
        // Dùng arrayMove để di chuyển column trong mảng
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        )
        // const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    )
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!over || !active) return
    const {
      id: activeDraggingCardID,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over // overCardId là id của column chứa card đang drag

    const activeDraggingColumn = findColumnByCardId(activeDraggingCardID)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeDraggingColumn || !overColumn) return

    if (activeDraggingColumn._id !== overColumn._id) {
      moveCardBetweenTwoColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeDraggingColumn,
        activeDraggingCardID,
        activeDraggingCardData
      )
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
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
