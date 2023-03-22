import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    <div className="App">
      Hello Quad Coders
    </div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/ >} >
            <Route path='' element={<Home/>}> </Route>
            <Route path='about' element={<About/>}> </Route>
            <Route path='content' element={<Contact/>}> </Route>
            <Route path='Allfaculty' element={<Allfaculty />}> </Route>
            <Route path='exprfaculty' element={<Faculty10 />}> </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
