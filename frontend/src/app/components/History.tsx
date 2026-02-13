"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const MOCK_HISTORY = [
  {
    id: 1,
    dateTime: "12/09/2024 15:00:00",
    username: "Sara John",
    concertName: "The festival Int 2024",
    action: "Cancel",
  },
  {
    id: 2,
    dateTime: "12/09/2024 10:39:20",
    username: "Sara John",
    concertName: "The festival Int 2024",
    action: "Reserve",
  },
];

export default function History() {
  const columnStyle = {
    width: "25%",
    fontWeight: "bold",
    fontSize: "0.8rem",
    borderRight: "1px solid #e0e0e0",
    padding: "8px 12px",
    backgroundColor: "transparent", // Ensures header cells are transparent
  };

  const cellStyle = {
    borderRight: "1px solid #e0e0e0",
    fontSize: "0.8rem",
    padding: "8px 12px",
    backgroundColor: "transparent", // Ensures body cells are transparent
  };

  return (
    <div className="w-full bg-transparent rounded-md px-8 py-8">
      <Box className="flex flex-col h-full bg-transparent">
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            borderRadius: "4px",
            overflow: "hidden",
            backgroundColor: "transparent", // Removes Paper's white background
            boxShadow: "none",
          }}
        >
          <Table
            aria-label="history table"
            sx={{ tableLayout: "fixed", backgroundColor: "transparent" }}
            size="small"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "transparent" }}>
                <TableCell sx={columnStyle}>Date time</TableCell>
                <TableCell sx={columnStyle}>Username</TableCell>
                <TableCell sx={columnStyle}>Concert name</TableCell>
                <TableCell sx={{ ...columnStyle, borderRight: 0 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_HISTORY.map((row) => (
                <TableRow key={row.id} sx={{ backgroundColor: "transparent" }}>
                  <TableCell sx={cellStyle}>{row.dateTime}</TableCell>
                  <TableCell sx={cellStyle}>{row.username}</TableCell>
                  <TableCell sx={cellStyle}>{row.concertName}</TableCell>
                  <TableCell sx={{ ...cellStyle, borderRight: 0 }}>
                    {row.action}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
