import React from "react";
import App from "./App.jsx";
import ServerList from "./ServerList.jsx";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function Router() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="serverlist" component={<ServerList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;