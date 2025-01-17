import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Avatar, Divider, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetUserByIdQuery } from '../../redux/api/userApi';
import NavBar from "../../components/NavBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const maskString = (str: string, visibleCount: number = 12): string => {
  if (str.length <= visibleCount) return str;
  const maskedPart = '*'.repeat(str.length - visibleCount);
  const visiblePart = str.slice(-visibleCount);
  return maskedPart + visiblePart;
};

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userData } = useGetUserByIdQuery(user?.id!, {
    skip: !user?.id,
  });
  const [isMasked, setIsMasked] = useState(true);

  const toggleMask = () => {
    setIsMasked((prev) => !prev);
  };

  return (
    <>
    <NavBar position="top" active='cart'/>
    <Box
      display="flex"
      justifyContent="center"
      minHeight="50vh"
      bgcolor="background.default"
      p={3}
    >
      <Card sx={{ width: 500, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar
              sx={{ bgcolor: "primary.main", width: 80, height: 80, mb: 2 }}
            >
            </Avatar>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {userData?.username || "Loading..."}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <strong>User ID:</strong>
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center"
                sx={{
                  flexWrap: "wrap",
                  maxWidth: "100%", 
                  wordBreak: "break-word", 
                  overflow: "hidden", 
                }}>
                <Typography variant="body1">
                  {isMasked ? maskString(userData?.user_id || "Loading...") : (userData?.user_id || "Loading...")}
                </Typography>
                <IconButton size="small" onClick={toggleMask}>
                  {isMasked ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong>
              </Typography>
              <Typography variant="body1">{user?.email || "Loading..."}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <strong>Voucher Points:</strong>
              </Typography>
              <Typography variant="body1">{userData?.points ?? "0"}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <strong>Account Creation Date:</strong>
              </Typography>
              <Typography variant="body1">
                {user?.created_at
                  ? new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                    timeZone: 'Singapore',
                  }).format(new Date(user?.created_at)).concat(" (GMT+8)")
                  : "Loading..."}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
    </>
  );
};

export default ProfilePage;
