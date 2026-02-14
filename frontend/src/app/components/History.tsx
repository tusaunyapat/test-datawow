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
import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { RESERVATION_ACTION, ROLE } from "../common_variable";

export default function History() {
  const {
    reservations = [],
    concerts = [],
    myReservations,
    role,
  } = useAppContext();
  const reservationList = useMemo(() => {
    return role === ROLE.ADMIN ? reservations : myReservations;
  }, [role, reservations, myReservations]);
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
            backgroundColor: "white",
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
                {role == ROLE.ADMIN && (
                  <TableCell sx={columnStyle}>Username</TableCell>
                )}
                <TableCell sx={columnStyle}>Concert name</TableCell>
                <TableCell sx={{ ...columnStyle, borderRight: 0 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(() => {
                const baseList =
                  role === ROLE.ADMIN ? reservations : myReservations;

                if (baseList && baseList.length > 0) {
                  return baseList.map((row) => {
                    const concert = concerts?.find((c) => c.id == row.cid);
                    const displayConcertName =
                      concert?.name || "Unknown Concert";

                    return (
                      <TableRow key={row.id} hover>
                        <TableCell sx={cellStyle}>
                          {new Date(row.createdAt).toLocaleString()}
                        </TableCell>
                        {role == ROLE.ADMIN && (
                          <TableCell sx={cellStyle}>
                            {row.name || "N/A"}
                          </TableCell>
                        )}
                        <TableCell sx={cellStyle}>
                          {displayConcertName}
                        </TableCell>
                        <TableCell sx={{ ...cellStyle, borderRight: 0 }}>
                          <Typography variant="caption" sx={{ color: "black" }}>
                            {row.action || "RESERVED"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  });
                }

                return (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      align="center"
                      sx={{ py: 3, fontSize: "0.8rem", color: "gray" }}
                    >
                      No reservation history found.
                    </TableCell>
                  </TableRow>
                );
              })()}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
