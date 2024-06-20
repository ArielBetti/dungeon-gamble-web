import { Route, Routes } from 'react-router-dom';
import { PATHS } from './paths';
import * as Page from '../pages';
import AuthRoute from './auth';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404</div>} />
      <Route path={PATHS.login} element={<Page.Login />} />
      <Route path={PATHS.register} element={<Page.Register />} />
      <Route path={PATHS.dungeon} element={<AuthRoute />}>
        <Route path={PATHS.arena} element={<Page.Arena />} />
      </Route>
    </Routes>
  );
};
