import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Admin from './Admin/Admin';
import Dailyentry from './Admin/Pages/Dailyentry';
import Adduser from './Admin/Pages/Adduser';
import Deleteuser from './Admin/Pages/Deleteuser';
import Menu from './Admin/Pages/Menu';
import User from './User/User';
import UserMenu from './User/Pages/UserMenu';
import EditProfile from './User/Pages/EditProfile';
import Subscription from './User/Pages/Subscription';
import Payment from './User/Pages/Payment';
import Main from './Components/Main';

function App() {
  return (
    <>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} >
        </Route>
        <Route path='/admin' element={<Admin />} >
            <Route path='' element={<Dailyentry />}> </Route>
            <Route path='adduser' element={<Adduser/>}> </Route>
            <Route path='deleteuser' element={<Deleteuser />}> </Route>
            <Route path='menu' element={<Menu />}> </Route>
        </Route>
        <Route path='/user' element={<User />} >
            <Route path='' element={<UserMenu />}> </Route>
            <Route path='editprofile' element={<EditProfile />}> </Route>
            <Route path='subscription' element={<Subscription />}> </Route>
            <Route path='payment' element={<Payment />}> </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
