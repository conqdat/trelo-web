import { Card as MuiCard } from '@mui/material' // Card is a component from Material UI
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import * as React from 'react'

import { mapOrder } from '../../../../../../../utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const orderedCards = mapOrder(card?.cards, card?.cardOrderIds, '_id')

  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })

  const dndKitCardStyles = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    borders: isDragging ? '1px solid #3ecc71' : 1
  }

  const isShowCartActions = () => {
    return (
      !!card.memberIds?.length ||
      !!card.comments?.length ||
      !!card.attachments?.length
    )
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}
      <CardContent sx={{ p: 1.5 }}>
        <Typography>{card.title}</Typography>
      </CardContent>
      {isShowCartActions() && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card.memberIds?.length}
            </Button>
          )}
          {!!card.comments?.length && (
            <Button size="small" startIcon={<ChatBubbleIcon />}>
              {card.comments?.length}
            </Button>
          )}
          {!!card.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
