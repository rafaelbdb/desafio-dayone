import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import './index.css'
import RoutesConfig from './RoutesConfig'

toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "preventDuplicates": true
}

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <RoutesConfig />
    </React.StrictMode>
)
