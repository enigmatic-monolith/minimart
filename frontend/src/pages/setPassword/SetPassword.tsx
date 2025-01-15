import { FormEvent, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [queryParams, _] = useSearchParams();
  const token = queryParams.get('token');
  const id = queryParams.get('id');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setError('');
      fetch(`${import.meta.env.VITE_API_BASE_URL}/users/set-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, token, newPassword: password }),
      })
        .then((res) => {
          if (res.status === 200) {
            alert('Password reset successfully! You can now log in with the new password.');
            navigate('/login');
          } else {
            setError('Failed to reset password');
          }
        })
        .catch(() => {
          setError('Failed to reset password');
        });
    } else {
      setError('Passwords do not match');
    }
  };

  if (!token || !id) {
    return <Typography color="error">Invalid link</Typography>;
  }

  return (
    <div>
      <h2>Reset your password</h2>
      <form style={{ width: 500 }} onSubmit={handleSubmit}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="new-password"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="new-password"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};
