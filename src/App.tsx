import { AppContainer, AppCard, Header, Line, Strong } from "./styles/styles";
import GlobalStyles from "./styles/global";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import Calculator from "./components/Calculator";

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <AppCard>
          <ToastContainer autoClose={2000} />
          <Header>
            <Strong>Nutri Calculator</Strong>
            <Typography variant="subtitle2" color={"black"} fontWeight={500}>
              by Thaís Sgalbiero{" "}
            </Typography>
          </Header>

          <Calculator />
        </AppCard>
      </AppContainer>
    </>
  );
}

export default App;
