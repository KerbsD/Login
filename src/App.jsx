import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Layout from './pages/Layout'
import LinkPage from './pages/LinkPage'
import Lounge from './pages/Lounge'
import Missing from './pages/Missing'
import RequireAuth from './pages/RequireAuth'
import Unauthorized from './pages/Unauthorized'
import PersistLogin from './pages/PersistLogin'
import { Routes, Route } from 'react-router-dom';
import Todo from './pages/Todo'

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="todo" element={<Todo />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;