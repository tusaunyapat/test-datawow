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
  Typography,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { RESERVATION_ACTION } from "../common_variable";

export default function History() {
  // 1. Destructure with default values to prevent "undefined" crashes
  const { reservations = [], concerts = [] } = useAppContext();

  const columnStyle = {
    width: "25%",
    fontWeight: "bold",
    fontSize: "0.8rem",
    borderRight: "1px solid #e0e0e0",
    padding: "8px 12px",
  };

  const cellStyle = {
    borderRight: "1px solid #e0e0e0",
    fontSize: "0.8rem",
    padding: "8px 12px",
  };

  return (
    <div className="w-full bg-transparent rounded-md px-8 py-8">
      <Box className="flex flex-col h-full">
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            borderRadius: "4px",
            overflow: "hidden",
            backgroundColor: "white", // Changed to white for readability, use transparent if layout requires
            boxShadow: "none",
          }}
        >
          <Table
            aria-label="history table"
            sx={{ tableLayout: "fixed" }}
            size="small"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={columnStyle}>Date time</TableCell>
                <TableCell sx={columnStyle}>Username</TableCell>
                <TableCell sx={columnStyle}>Concert name</TableCell>
                <TableCell sx={{ ...columnStyle, borderRight: 0 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 2. Check if reservations exist and map */}
              {reservations && reservations.length > 0 ? (
                reservations.map((row) => {
                  // 3. Logic to find concert name if only concertId is stored in reservation
                  const concert = concerts?.find((c) => c.id === row.cid);
                  const displayConcertName = concert?.name || "Unknown Concert";

                  return (
                    <TableRow key={row.id} hover>
                      <TableCell sx={cellStyle}>
                        {new Date(row.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell sx={cellStyle}>
                        {row.name || row.name || "N/A"}
                      </TableCell>
                      <TableCell sx={cellStyle}>{displayConcertName}</TableCell>
                      <TableCell sx={{ ...cellStyle, borderRight: 0 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "black",
                            fontWeight: "normal",
                          }}
                        >
                          {row.action || "RESERVED"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ py: 3, fontSize: "0.8rem", color: "gray" }}
                  >
                    No reservation history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
