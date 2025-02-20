import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/system/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ShortInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  width: "6ch", // Doble del ancho original
  height: "40px", // Alto consistente con el SearchBar
  marginLeft: theme.spacing(2),
  "& .MuiInputBase-input": {
    textAlign: "center",
    height: "40px", // Ajustar el contenido al alto del input
  },
}));

export default function BarraNavegador({
  titulo,
  setInputBarraNavegador,
  setRack,
  setFila,
  setPasillo,
}) {
  const posiciones = useSelector((state) => state.posiciones);

  const handleSearchChange = (event) => {
    setInputBarraNavegador(event.target.value);
  };

  const handleRackChange = (event) => {
    setRack(event.target.value);
  };

  const handleFilaChange = (event) => {
    setFila(event.target.value);
  };

  const handlePasilloChange = (event) => {
    setPasillo(event.target.value);
  };

  const exportToExcel = () => {
    const flatData = posiciones.flatMap((pos) =>
      pos.items.map((item) => ({
        Proveedor: item.proveedor.nombre,
        Categoría: item.categoria,
        Descripción: item.descripcion,
        Partida: item.partida,
        EstadoPartida: item.partidaEstado,
        Kilos: item.kilos,
        Unidades: item.unidades,
        Rack: pos.rack || "-",
        Fila: pos.fila || "-",
        Pasillo: pos.pasillo || "-",
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "items_posiciones.xlsx");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="export excel"
            sx={{ mr: 2 }}
            onClick={exportToExcel}
          >
            <AssignmentIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {titulo}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
          </Search>
          {/* Inputs para Rack, Fila y Pasillo */}
          <ShortInput
            placeholder=""
            type="text"
            inputProps={{ "aria-label": "rack" }}
            onChange={handleRackChange}
          />
          <ShortInput
            placeholder=""
            type="text"
            inputProps={{ "aria-label": "fila" }}
            onChange={handleFilaChange}
          />
          <ShortInput
            placeholder=""
            type="text"
            inputProps={{ "aria-label": "pasillo" }}
            onChange={handlePasilloChange}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
