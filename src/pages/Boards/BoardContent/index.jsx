import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const COLUM_HEADR_HEIGHT = '40px'
const COLUM_FOOTER_HEIGHT = '56px'

function BoarContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        backgroundColor: 'primary.main',
        display: 'flex'
        // alignItems: 'center'
      }}
    >
      <Box
        sx={{
          minWidth: '300px',
          minHeight: '300px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333' : '#ebecf0',
          ml: 2,
          borderRadius: '6px'
        }}
      >
        <Box
          sx={{
            height: COLUM_HEADR_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" sx={{}}>
            Colunm title
          </Typography>
          <Box>
            <Tooltip title="Show Menu">
              {' '}
              <ExpandMoreIcon
                sx={{ color: 'text.prmary', cursor: 'pointer' }}
                id="basic-button-dropdown"
                aria-controls={open ? 'basic-menu-workspaces' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddBoxIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add New</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon>
                    <Cloud fontSize="small" />
                  </DeleteForeverIcon>
                </ListItemIcon>
                <ListItemText>Remove column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Web Clipboard</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 2
          }}
        >
          <Card
            sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)' }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent sx={{ p: 1.5 }}>
              <Typography>Lizard</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card
            sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)' }}
          >
            <CardContent sx={{ p: 1.5 }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
        <Box
          sx={{
            height: COLUM_FOOTER_HEIGHT,
            p: 2, // 16px
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button startIcon={<AddBoxIcon />}>Add card</Button>
          <Tooltip title="Drap to move">
            <DragHandleIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default BoarContent
