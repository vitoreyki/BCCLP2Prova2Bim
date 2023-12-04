import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Pagina } from './templates/pagina';
import store from './redux/store';
import { BatePapo } from './telas/bate-papo/bate-papo';
import { CadastroUsuários } from './telas/cadastro-usuarios';
 
function App() {
  return (
    <>
     <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/bate-papo" element={<BatePapo />} />
          <Route path="/usuario" element={<CadastroUsuários />} />
          <Route
            path="/"
            element={
              <Container>
                <Pagina />
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
