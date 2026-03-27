/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { DepartmentPage } from "./pages/DepartmentPage";
import { FacultyPage } from "./pages/FacultyPage";
import { CourseCatalogPage } from "./pages/CourseCatalogPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { AboutPage } from "./pages/AboutPage";
import { SectionPage } from "./pages/SectionPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/layout/AdminRoute";
import { AuthProvider } from "./lib/AuthContext";
import { ThemeProvider } from "./lib/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about/:section" element={<AboutPage />} />
            <Route path="/about" element={<Navigate to="/about/about-bmsce" replace />} />
            <Route path="/department/:id" element={<DepartmentPage />} />
            <Route path="/department/:deptId/faculty/:facultyId" element={<FacultyPage />} />
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/:category" element={<SectionPage />} />
            <Route path="/:category/:section" element={<SectionPage />} />
            
            {/* Protected Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}




