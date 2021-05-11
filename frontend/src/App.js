import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { green, indigo } from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './components/Layout';
import Create from './pages/Create';
import HomePage from './pages/HomePage';
import SignIn from './pages/Login';
import Notes from './pages/Notes';
import SignUp from './pages/SignUp';

const theme = createMuiTheme({
  palette: {
    palette: {
      primary: green,
      secondary: indigo,
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  //   const [user, setUser] = useQuery(GET_USER)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/login'>
            <SignIn />
          </Route>
          <Route path='/register'>
            <SignUp />
          </Route>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Layout>
            <Route path='/create'>
              {window.localStorage.getItem('tokenValue') ? (
                <Create />
              ) : (
                <Redirect to='/login' />
              )}
            </Route>
            <Route exact path='/notes'>
              <Notes />
              {/* {window.localStorage.getItem('tokenValue') ? (
                <Notes />
              ) : (
                <Redirect to='/login' />
              )} */}
            </Route>
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
