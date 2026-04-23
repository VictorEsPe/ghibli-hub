import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { MovieDetails } from "../pages/MovieDetails";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}> 
                <Route index element={<Home />} />
                <Route path="/:id" element={<MovieDetails />} />
            </Route>
        </Routes>
    )
}