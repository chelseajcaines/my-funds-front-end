import { Routes, Route } from 'react-router-dom';
import { JWTProvider } from 'contexts/JWTContext';
import router from 'routes';

const AuthWrapper = () => {
    return (
        <JWTProvider>
            <Routes>
                {router.routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}>
                        {route.children &&
                            route.children.map((child, childIndex) => <Route key={childIndex} path={child.path} element={child.element} />)}
                    </Route>
                ))}
            </Routes>
        </JWTProvider>
    );
};

export default AuthWrapper;
