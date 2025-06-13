import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
const Home = lazy(() => import("../pages/Home"))
const AppRoutes = () => {
    return (
        <Router>
            <Suspense>
            </Suspense>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes