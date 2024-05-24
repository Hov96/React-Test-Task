import { Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import MainPageWrapper from './Pages/MainPageWrapper';
import MainPage from './Pages/MainPage';
import RegisterUser from './Pages/RegisterUser/RegisterUser';
import UpdateEmail from './Pages/UpdateEmail/UpdateEmail';
import UpdatePhone from './Pages/UpdatePhone/UpdatePhone';
import UpdateAllergies from './Pages/UpdateAllergies/UpdateAllergies';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainPageWrapper />}>
                    <Route index element={<MainPage />} />
                    <Route path='/register-user' element={<RegisterUser />} />
                    <Route path='/update-email/:id' element={<UpdateEmail />} />
                    <Route path='/update-phone/:id' element={<UpdatePhone />} />
                    <Route path='/update-allergies/:id' element={<UpdateAllergies />} />
                </Route>
            </Routes>
            <ToastContainer data-testid="toast-container" />
        </>
    );
}

export default App;
