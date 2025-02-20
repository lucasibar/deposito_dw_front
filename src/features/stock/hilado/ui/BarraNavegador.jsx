import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/system/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ShortInput,
} from "./BarraNavegador.styles";

export const BarraNavegador = ({
  titulo,
  setInputBarraNavegador,
  setRack,
  setFila,
  setPasillo,
}) => {
  const items = useSelector((state) => state.posiciones.items);

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
    const flatData = items.flatMap((pos) =>
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

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
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
}; 