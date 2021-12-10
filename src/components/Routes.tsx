import { Routes as ReactRouters, Route } from 'react-router-dom';

import Chats from '../pages/Chats';
import Find from '../pages/Find';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Following from '../pages/Following';

const Routes = () => (
  <ReactRouters>
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<Profile />}>
      <Route path=":profileId" element={<Profile />} />
    </Route>

    <Route path="/find" element={<Find />} />
    <Route path="/chats" element={<Chats />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/following" element={<Following />} />
    <Route
      path="*"
      element={
        <main style={{ padding: '1rem' }}>
          <p>There`s nothing here!</p>
        </main>
      }
    />
    {/* !user && <Route path="/login" element={<Users />} /> */}
    {/* <Route element={<Users />} /> */}
  </ReactRouters>
);
export default Routes;
