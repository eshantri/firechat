import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Chats from "./components/Chats";
import { AuthProvider } from "./contexts/AuthContext";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Raleway, Arial",
  },
});
function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
