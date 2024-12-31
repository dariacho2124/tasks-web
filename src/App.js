import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import { AuthProvider } from "./components/context/AuthContext";
import { TasksProvider } from "./components/context/TasksContext";
function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Ruta principal protegida, solo se accede si está autenticado */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TasksProvider>
                  <Tasks />
                </TasksProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
