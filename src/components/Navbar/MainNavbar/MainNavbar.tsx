import { useState } from 'react';
import './mainNavbar.scss';
import {
  Avatar,
  Box,
  Dialog,
  DialogContentText,
  Divider,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const MainNavbar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <button className="lnb__button">
          <MenuOutlinedIcon style={{ fontSize: 24 }} />
        </button>
        <p>Together</p>
      </div>
      <div className="navbar__options">
        <div className="navbar__input-box" onClick={handleClickOpenDialog}>
          <p>검색어를 입력하세요</p>

          <SearchOutlinedIcon style={{ fontSize: 16 }} />
        </div>

        <div className="navbar__user">
          <div className="navbar__alert">
            <div className="message">
              <div className="message_icon">
                <EmailOutlinedIcon />
              </div>
            </div>
            <div className="alarm">
              <div className="alarm_icon">
                <NotificationsOutlinedIcon />
              </div>
            </div>
          </div>
          <div
            className="navbar__user-image"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Menu
            id="account-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              sx: { py: 0 },
              'aria-labelledby': 'account-button',
            }}>
            <Box sx={{ width: 360, maxWidth: '100%' }}>
              <MenuItem divider={true} sx={{ padding: 2 }}>
                <Stack gap={3}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                    내 정보
                  </Typography>
                  <Avatar sx={{ width: 80, height: 80 }}>SB</Avatar>
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                    bymine
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem
                divider={true}
                sx={{ padding: 2, fontSize: '14px' }}
                onClick={() => {
                  navigate('/user/profile');
                }}>
                프로필 수정
              </MenuItem>
              <MenuItem divider={true} sx={{ padding: 2, fontSize: '14px' }}>
                마이페이지
              </MenuItem>
              <MenuItem sx={{ padding: 2, fontSize: '14px' }}>
                로그아웃
              </MenuItem>
            </Box>
          </Menu>
        </div>
      </div>
      <Dialog
        className="search__dialog"
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={handleCloseDialog}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 'fit-content',
          }}>
          <TextField fullWidth type="text" placeholder="검색어를 입력하세요" />
          <Divider />
          <DialogContentText>sadas</DialogContentText>
        </Box>
      </Dialog>
    </div>
  );
};

export default MainNavbar;
