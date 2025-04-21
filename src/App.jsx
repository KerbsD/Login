import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const PersistLogin = lazy(() => import('./pages/PersistLogin'));
const RequireAuth = lazy(() => import('./pages/RequireAuth'));
const Missing = lazy(() => import('./pages/Missing'));
const Layout = lazy(() => import('./pages/Layout'));
const NoteLayout = lazy(() => import('./pages/Notes/NoteLayout'));
const TodoLayout = lazy(() => import('./pages/Todos/TodoLayout'));
const Home = lazy(() => import('./pages/Home'));
const Todo = lazy(() => import('./pages/Todos/Todo'));
const Notes = lazy(() => import('./pages/Notes/Notes'));

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
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route element={<TodoLayout />}>
              <Route path="todo" element={<Todo />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route element={<NoteLayout />}>
              <Route index path="notes" element={<Notes />} />
            </Route>
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;