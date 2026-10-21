import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cabecalho from './componentes/Cabecalho';
import Home from './componentes/Home';
import Read from './componentes/Read';
import Create from './componentes/Create';
import Update from './componentes/Update';
import Delete from './componentes/Delete';

function App() {
    return (
        <BrowserRouter>
            <Cabecalho />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/read/:id' element={<Read />} />
                <Route path='/create' element={<Create />} />
                <Route path='/update' element={<Update />} />
                <Route path='/delete' element={<Delete />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
