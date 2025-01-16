import React from 'react';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';

interface CustomNotificationModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CustomNotificationModal: React.FC<CustomNotificationModalProps> = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-notification-modal-title"
      aria-describedby="custom-notification-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography id="custom-notification-modal-title" variant="h6" mb={2}>
          {title}
        </Typography>
        <Typography id="custom-notification-modal-description" mb={3}>
          {description}
        </Typography>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          {onConfirm && (
            <Button variant="contained" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomNotificationModal;
