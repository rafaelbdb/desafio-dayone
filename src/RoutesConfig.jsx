import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './Admin';
import App from './App';

const routes = [
    { path: '/', element: <App /> },
    { path: '/index.php', element: <App /> },
    { path: '/index', element: <App /> },
    { path: '/admin', element: <Admin /> },
    { path: '/admin.php', element: <Admin /> }
];

function RoutesConfig() {
    return (
        <Router>
            <Routes>
                {routes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </Router>
    );
}

export default RoutesConfig;
