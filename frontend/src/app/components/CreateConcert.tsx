"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import { FiUser, FiSave } from "react-icons/fi";
import BaseCard from "./BaseCard";

export default function CreateConcert() {
  const [formData, setFormData] = useState({
    name: "",
    total: 0,
    description: "",
  });

  return (
    <div className="pt-6">
      <BaseCard title="Create">
        <Box sx={{ p: 1 }}>
          <Box className="flex flex-col gap-4">
            <Box className="flex flex-row gap-4">
              <Box className="flex-1 flex flex-col gap-2">
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "normal", color: "black" }}
                >
                  Concert Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please input concert name"
                  variant="outlined"
                  size="small"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Box>

              <Box className="w-1/3 flex flex-col gap-2">
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "normal", color: "black" }}
                >
                  Total of seat
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  size="small"
                  value={formData.total}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      total: parseInt(e.target.value),
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FiUser size={16} color="black" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box className="flex flex-col gap-2">
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "normal", color: "black" }}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Please input description"
                variant="outlined"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Box>

            <Box className="flex justify-end mt-2">
              <Button
                variant="contained"
                startIcon={<FiSave />}
                onClick={() => true}
                sx={{
                  textTransform: "capitalize",
                  px: 4,
                  py: 1,
                  fontSize: "0.8rem",
                  borderRadius: "6px",
                  backgroundColor: "#42a5f5",
                  "&:hover": { backgroundColor: "#1e88e5" },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </BaseCard>
    </div>
  );
}
