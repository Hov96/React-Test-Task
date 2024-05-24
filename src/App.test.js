import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mock the child components
jest.mock('./Pages/MainPageWrapper', () => () => <div>MainPageWrapper</div>);
jest.mock('./Pages/MainPage', () => () => <div>MainPage</div>);
jest.mock('./Pages/RegisterUser/RegisterUser', () => () => <div>RegisterUser</div>);
jest.mock('./Pages/UpdateEmail/UpdateEmail', () => () => <div>UpdateEmail</div>);
jest.mock('./Pages/UpdatePhone/UpdatePhone', () => () => <div>UpdatePhone</div>);
jest.mock('./Pages/UpdateAllergies/UpdateAllergies', () => () => <div>UpdateAllergies</div>);

test('renders main components correctly', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    );

    // Check if the ToastContainer is rendered
    expect(document.querySelector('.Toastify')).toBeInTheDocument();
    // expect(screen.getByTestId('toast-container')).toBeInTheDocument();
});
