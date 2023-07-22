import {
  Box,
  useTheme,
  Select,
  InputLabel,
  Input,
  MenuItem,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { tokens } from "../../theme";

export const Searchbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      borderRadius="3px"
      sx={{
        display: "flex",
        mx: "auto",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          marginLeft: 1,
          flex: 1,
          padding: "0 5px",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          display={"flex"}
          sx={{
            outlineColor: colors.green[800],
            outline: `${colors.green[300]} 1px solid`,
            borderRadius: "5px",
          }}
        >
          <SearchOutlinedIcon
            sx={{
              fontSize: "30px",
              color: colors.green[800],
              background: colors.gray[100],
            }}
          />
          <InputLabel></InputLabel>
          <Input
            sx={{
              paddingX: "5px",
              maxWidth: "500px",
              width: "max(300px,70vw)",
              height: "30px",
            }}
            placeholder="Search..."
            name="search"
            id="search"
          />
        </Box>
        <Select
          sx={{
            padding: "0",
            marginLeft: "10px",
            width: "200px",
            height: "35px",
            border: "none",
            outline: "none",
          }}
          size={"small"}
          MenuProps={{ PaperProps: { style: { width: 200 } } }}
        >
          <MenuItem value={"Nysc"}>NYSC</MenuItem>
          <MenuItem value={"Siwes"}>SIWES</MenuItem>
          <MenuItem value={"Intern"}>Intern</MenuItem>
          <MenuItem value={"Staff"}>Staff</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default Searchbar;
