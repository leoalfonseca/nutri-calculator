import { ReactNode, createContext, useContext } from "react";

interface ICalculatorProvider {
  children: ReactNode;
}

interface ICalculatorContext {
  calcularIMC: (peso: number, altura: number) => number;
  calcularTMBHarrisBenedictHomem: (
    peso: number,
    altura: number,
    idade: number
  ) => number;
  calcularTMBHarrisBenedictMulher: (
    peso: number,
    altura: number,
    idade: number
  ) => number;
  calcularNCT: (tmb: number, fatorAtividade: number) => number;
  calcularDistribuicaoMacronutrientes: (
    totalCalorias: number,
    pctCarbo: number,
    pctPtn: number,
    pctLip: number
  ) => {
    carboidratos: number;
    proteinas: number;
    gorduras: number;
  };
  calcularPesoIdealHomem: (altura: number) => number;
  calcularPesoIdealMulher: (altura: number) => number;
  calcularTMBMifflinStJeorHomem: (
    peso: number,
    altura: number,
    idade: number
  ) => number;
  calcularTMBMifflinStJeorMulher: (
    peso: number,
    altura: number,
    idade: number
  ) => number;
}

const CalculatorContext = createContext({} as ICalculatorContext);

const CalculatorProvider = ({ children }: ICalculatorProvider) => {
  function calcularIMC(peso: number, altura: number): number {
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    return imc;
  }

  // Função para calcular a Taxa de Metabolismo Basal (TMB) usando a fórmula de Harris-Benedict para homens
  function calcularTMBHarrisBenedictHomem(
    peso: number,
    altura: number,
    idade: number
  ): number {
    const tmbHarris = 66.473 + 13.7516 * peso + 5.0033 * altura - 6.755 * idade;
    return tmbHarris;
  }

  // Função para calcular a Taxa de Metabolismo Basal (TMB) usando a fórmula de Harris-Benedict para mulheres
  function calcularTMBHarrisBenedictMulher(
    peso: number,
    altura: number,
    idade: number
  ): number {
    const tmbHarris =
      655.0955 + 9.247 + 9.5634 * peso + 1.8496 * altura - 4.6756 * idade;
    return tmbHarris;
  }

  // Função para calcular as Necessidades Calóricas Totais (NCT) baseadas na TMB e no fator de atividade física
  function calcularNCT(tmb: number, fatorAtividade: number): number {
    const nct = tmb * fatorAtividade;
    return nct;
  }

  // Função para calcular a Distribuição de Macronutrientes com base no total de calorias diárias
  function calcularDistribuicaoMacronutrientes(
    totalCalorias: number,
    pctCarbo: number,
    pctPtn: number,
    pctLip: number
  ): {
    carboidratos: number;
    proteinas: number;
    gorduras: number;
  } {
    const carboidratos = ((pctCarbo / 100) * totalCalorias) / 4;
    const proteinas = ((pctPtn / 100) * totalCalorias) / 4;
    const gorduras = ((pctLip / 100) * totalCalorias) / 9;
    return { carboidratos, proteinas, gorduras };
  }

  // Função para calcular a Estimativa de Peso Ideal usando a fórmula de Devine para mulheres
  function calcularPesoIdealMulher(altura: number): number {
    const pesoIdeal = 45 + 2.3 * (altura - 60.7);
    return pesoIdeal;
  }

  // Função para calcular a Estimativa de Peso Ideal usando a fórmula de Devine para homens
  function calcularPesoIdealHomem(altura: number): number {
    const pesoIdeal = 50 + 2.3 * (altura - 60);
    return pesoIdeal;
  }

  // Função para calcular a Taxa de Metabolismo Basal (TMB) usando a fórmula de Mifflin-St Jeor para homens
  function calcularTMBMifflinStJeorHomem(
    peso: number,
    altura: number,
    idade: number
  ): number {
    const tmbMifflin = 10 * peso + 6.25 * altura - 5 * idade + 5;
    return tmbMifflin;
  }

  // Função para calcular a Taxa de Metabolismo Basal (TMB) usando a fórmula de Mifflin-St Jeor para mulheres
  function calcularTMBMifflinStJeorMulher(
    peso: number,
    altura: number,
    idade: number
  ): number {
    const tmbMifflin = 10 * peso + 6.25 * altura - 5 * idade - 161;
    return tmbMifflin;
  }
  return (
    <CalculatorContext.Provider
      value={{
        calcularIMC,
        calcularTMBHarrisBenedictHomem,
        calcularTMBHarrisBenedictMulher,
        calcularNCT,
        calcularDistribuicaoMacronutrientes,
        calcularPesoIdealMulher,
        calcularPesoIdealHomem,
        calcularTMBMifflinStJeorHomem,
        calcularTMBMifflinStJeorMulher,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error(
      "useCalculator deve ser usado dentro de um CalculatorProvider"
    );
  }
  return context;
};

export { CalculatorProvider, useCalculator };
