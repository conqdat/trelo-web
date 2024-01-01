import { Box, SvgIcon, Typography } from '@mui/material'
import ModeSelect from '../../components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloLogo } from '../../assets/trello.svg'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

function AppBar() {
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleClose = () => {
    setSearch('')
  }

  return (
    <Box
      sx={{
        height: (theme) => theme.trelloCustom.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap2: 2,
        overflow: 'auto',
        paddingX: 2,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={trelloLogo}
            fontSize="small"
            inheritViewBox
            sx={{ color: 'white' }}
          />
          <Typography
            variant="inline"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{ color: 'white', border: 'none' }}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          value={search}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          sx={{
            minWidth: '120',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            },
            '& .MuiFormLabel-root': {
              color: 'white'
            },
            '.MuiSvgIcon-root': { color: 'white' },
            '.MuiInputBase-input': { color: 'white' }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ '& .MuiBackdrop-root': { color: 'white' } }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize="small"
                sx={{
                  cursor: search ? 'pointer' : 'default',
                  visibility: search ? 'visible' : 'hidden'
                }}
                onClick={handleClose}
              />
            )
          }}
        />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge badgeContent={4} color="warning">
            <NotificationsNoneIcon sx={{ color: 'white' }} color="action" />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'white' }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
