import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, PrivateRoute } from '_components';
import { Home } from './views/home';
import { Login } from './views/login';
import { Request } from './views/request';
import { Setting } from './views/setting';
import { Management } from './views/management';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Routes>
                <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                <Route path="/request"  element={<PrivateRoute><Request /></PrivateRoute>}/>
                <Route path="/management"  element={<PrivateRoute><Management /></PrivateRoute>}/>
                <Route path="/setting"  element={<PrivateRoute><Setting /></PrivateRoute>}/>
                
                <Route path="/login" element={<Login />} />
                {/* <Route path="/request" element={<Navigate to="/" />} /> */}
                </Routes>
            </div>
        </div>
    );
}
