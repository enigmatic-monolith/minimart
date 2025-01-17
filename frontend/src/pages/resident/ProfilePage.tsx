import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Avatar, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetUserByIdQuery } from '../../redux/api/userApi';

type UserProfile = {
  id: string;
  username: string;
  email: string;
  voucher_points: number;
  created_at: string;
};

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
    const { data: userData } = useGetUserByIdQuery(user?.id!, {
      skip: !user?.id,
    });
  const [profile, setProfile] = useState<UserProfile | null>(null);



  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
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
              <Typography variant="body1">{userData?.user_id || "Loading..."}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong>
              </Typography>
              <Typography variant="body1">{userData?.role || "Loading..."}</Typography>
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
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "Loading..."}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
