import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./app/App";
import { StoreProvider } from "./app/providers/StoreProvider";
import { RouterProvider } from "./app/providers/RouterProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StoreProvider>
        <RouterProvider>
            <App />
        </RouterProvider>
    </StoreProvider>
);
//que pasa que no se renderiza el componente
