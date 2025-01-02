import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const ShareModal = ({ isOpen, onClose, itineraryId }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShareSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `https://plangobackend.onrender.com/api/itinerary/${itineraryId}/share`,
        { recipientEmail: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Itinerary shared successfully!");
      onClose();
    } catch (error) {
      console.error("Error sharing itinerary:", error);
      toast.error(
        error.response?.data?.msg ||
          "Failed to share itinerary. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Share Itinerary
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleShareSubmit}
            disabled={isLoading || !email}
            startIcon={isLoading && <CircularProgress size={16} />}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModal;
