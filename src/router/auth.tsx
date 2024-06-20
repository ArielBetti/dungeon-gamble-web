import { useUser } from '@/store/user';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { PATHS } from './paths';
import PlayerHeader from '@/components/composable/PlayerHeader';
import { useEffect } from 'react';

const AuthRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      navigate(PATHS.login);
    }
  }, [user]);

  return (
    <div className="pt-20 container max-w-2xl border border-border min-h-screen px-2">
      <PlayerHeader />
      <Outlet />
      <div className="w-full bg-card border-t border-border flex items-center justify-center py-1 fixed bottom-0 left-0">
        <h2 className="text-sm font-bold">Dungeon Gamble</h2>
      </div>
    </div>
  );
};

export default AuthRoute;
