import { Routes as ReactRouters, Route } from 'react-router-dom';

import Chats from '../pages/Chats';
import Find from '../pages/Find';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Routes = () => (
  <ReactRouters>
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/find" element={<Find />} />
    <Route path="/chats" element={<Chats />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    {/* !user && <Route path="/login" element={<Users />} /> */}
    {/* <Route element={<Users />} /> */}
  </ReactRouters>
);
export default Routes;
