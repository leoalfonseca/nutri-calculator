import React, { useState } from "react";
import { useCalculator } from "../context/CalculatorContext";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Typography,
  Box,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material"; // Certifique-se de importar os componentes corretos do Material UI

const formulas = [
  "IMC",
  "TMB Harris Benedict",
  "TMB Mifflin St Jeor",
  "Distribuição Macro Nutrientes",
  // "Peso Ideal",
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Calculator() {
  const {
    calcularIMC,
    calcularTMBHarrisBenedictHomem,
    calcularTMBHarrisBenedictMulher,
    calcularDistribuicaoMacronutrientes,
    // calcularPesoIdealHomem,
    // calcularPesoIdealMulher,
    calcularTMBMifflinStJeorHomem,
    calcularTMBMifflinStJeorMulher,
  } = useCalculator();
  const [peso, setPeso] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);
  const [idade, setIdade] = useState<number>(0);
  const [totalCalorias, setCalorias] = useState<number>(0);
  const [pctCarbo, setPctCarbo] = useState<number>(0);
  const [pctPtn, setPctPtn] = useState<number>(0);
  const [pctLip, setPctLip] = useState<number>(0);

  const [formulaSelecionada, setFormulaSelecionada] = useState<string[]>([]);
  const [genero, setGenero] = useState<string>("Male");
  const [value, setValue] = React.useState(0);

  const [imc, setImc] = useState<number>();
  const [tmbHarris, setTmbHarris] = useState<number>();
  const [tmbMifflin, setTmbMifflin] = useState<number>();
  // const [pesoIdeal, setPesoIdeal] = useState<number>();
  const [macros, setMacros] = useState<number[]>([]);

  const handleCalcular = () => {
    let calculatedIMC = 0;
    let calculatedTMBHarris = 0;
    let calculatedTMBMifflin = 0;
    // let calculatedPesoIdeal = 0;
    let carbo = 0;
    let lip = 0;
    let ptn = 0;

    if (formulaSelecionada.includes("IMC")) {
      calculatedIMC = calcularIMC(peso, altura);
    }

    if (formulaSelecionada.includes("TMB Harris Benedict")) {
      if (genero === "Male") {
        calculatedTMBHarris = calcularTMBHarrisBenedictHomem(
          peso,
          altura,
          idade
        );
      } else {
        calculatedTMBHarris = calcularTMBHarrisBenedictMulher(
          peso,
          altura,
          idade
        );
      }
    }
    if (formulaSelecionada.includes("Distribuição Macro Nutrientes")) {
      const { carboidratos, proteinas, gorduras } =
        calcularDistribuicaoMacronutrientes(
          totalCalorias,
          pctCarbo,
          pctPtn,
          pctLip
        );
      carbo = carboidratos;
      ptn = proteinas;
      lip = gorduras;
    }

    // if (formulaSelecionada.includes("Peso Ideal")) {
    //   if (genero === "Male") {
    //     calculatedPesoIdeal = calcularPesoIdealHomem(altura);
    //   } else {
    //     calculatedPesoIdeal = calcularPesoIdealMulher(altura);
    //   }
    // }
    if (formulaSelecionada.includes("TMB Mifflin St Jeor"))
      if (genero === "Male") {
        calculatedTMBMifflin = calcularTMBMifflinStJeorHomem(
          peso,
          altura,
          idade
        );
      } else {
        calculatedTMBMifflin = calcularTMBMifflinStJeorMulher(
          peso,
          altura,
          idade
        );
      }

    setImc(calculatedIMC);
    setTmbHarris(calculatedTMBHarris);
    setTmbMifflin(calculatedTMBMifflin);
    setMacros([carbo, ptn, lip]);
    // setPesoIdeal(calculatedPesoIdeal);
    setValue(1);
  };

  const [formula] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof formula>) => {
    const {
      target: { value },
    } = event;
    setFormulaSelecionada(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGenero(event.target.value as string);
  };

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="formula">Selecione as Fórmulas</InputLabel>
                <Select
                  labelId="formula"
                  id="formula"
                  multiple
                  value={formulaSelecionada}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {formulas.map((e) => (
                    <MenuItem key={e} value={e}>
                      <Checkbox checked={formulaSelecionada.includes(e)} />{" "}
                      {/* Corrected here */}
                      <ListItemText primary={e} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Peso (kg)"
                type="number"
                value={peso}
                onChange={(e) => setPeso(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Altura (cm)"
                type="number"
                value={altura}
                onChange={(e) => setAltura(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Idade"
                type="number"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="gender">Gênero</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={genero}
                  label="Gênero"
                  onChange={handleChangeGender}
                >
                  <MenuItem value={"Male"}>Masculino</MenuItem>
                  <MenuItem value={"Female"}>Feminino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formulaSelecionada.includes("Distribuição Macro Nutrientes") && (
              <>
                <Grid item xs={6}>
                  <TextField
                    label="Total de Calorias"
                    type="totalCalorias"
                    value={totalCalorias}
                    onChange={(e) => setCalorias(Number(e.target.value))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Porcentagem de Carboidratos (%)"
                    type="number"
                    value={pctCarbo}
                    onChange={(e) => setPctCarbo(Number(e.target.value))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Porcentagem de Proteinas (%)"
                    type="number"
                    value={pctPtn}
                    onChange={(e) => setPctPtn(Number(e.target.value))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Porcentagem de Lipídios (%)"
                    type="number"
                    value={pctLip}
                    onChange={(e) => setPctLip(Number(e.target.value))}
                    fullWidth
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalcular}
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Calcular
              </Button>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={700}>
                Resultados
              </Typography>
            </Grid>
            {formulaSelecionada.includes("IMC") && (
              <Grid item xs={6}>
                <Typography variant="body1">
                  Seu IMC é: <strong>{imc}</strong>
                </Typography>
              </Grid>
            )}
            {formulaSelecionada.includes("TMB Harris Benedict") && (
              <Grid item xs={6}>
                <Typography variant="body1">
                  Sua TMB Harris Benedict é: <strong>{tmbHarris}</strong>
                </Typography>
              </Grid>
            )}
            {formulaSelecionada.includes("TMB Mifflin St Jeor") && (
              <Grid item xs={6}>
                <Typography variant="body1">
                  Sua TMB Mifflin St Jeor é: <strong>{tmbMifflin}</strong>
                </Typography>
              </Grid>
            )}
            {/* {formulaSelecionada.includes("Peso Ideal") && (
              <Grid item xs={6}>
                <Typography variant="body1">
                  Seu Peso Ideal é: <strong>{pesoIdeal}</strong>
                </Typography>
              </Grid>
            )} */}

            {formulaSelecionada.includes("Distribuição Macro Nutrientes") && (
              <>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    Total de Calorias: <strong>{totalCalorias}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    Carboidratos: <strong>{macros[0]}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    Proteínas: <strong>{macros[1]}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    Lipídios: <strong>{macros[2]}</strong>
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setValue(0)}
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Voltar
              </Button>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
      <Box></Box>
    </Box>
  );
}

export default Calculator;
