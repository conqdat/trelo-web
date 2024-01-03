import { Card as MuiCard } from '@mui/material' // Card is a component from Material UI
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Card({ isHideMedia }) {
  if (isHideMedia)
    return (
      <MuiCard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent sx={{ p: 1.5 }}>
          <Typography>Lizard no Media</Typography>
        </CardContent>
      </MuiCard>
    )

  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5 }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<ChatBubbleIcon />}>
          12
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          3
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
