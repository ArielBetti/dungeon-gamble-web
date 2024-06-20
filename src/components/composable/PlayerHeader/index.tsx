import { useUser } from '@/store/user';
import defaultAvatar from '../../../assets/default_avatar.jpeg';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/store/player';
import { useMemo } from 'react';
import { TPlayerInfoAPI } from '@/services/types/types-get-player-info';

const PlayerHeader = () => {
  const user = useUser();
  const player = usePlayer();

  function calculateExpPerLevel(player: TPlayerInfoAPI): number {
    return (
      player.totalExp +
      player.expToNextLevel -
      (player.totalExp % (player.totalExp + player.expToNextLevel))
    );
  }

  const expPercentage = useMemo(() => {
    if (!player) return 0;

    const { totalExp } = player;
    const expPerLevel = 200;
    const expSinceLastLevel = totalExp % expPerLevel;
    const progressPercentage = (expSinceLastLevel / expPerLevel) * 100;
    return progressPercentage;
  }, [player]);

  if (!user) return null;

  return (
    <div className="bg-card fixed top-0 left-0 w-full flex items-center justify-center flex-col">
      <div className="flex justify-between items-center py-2 max-w-2xl w-full px-2 border border-border border-b-0 border-t-0">
        <div className="flex flex-col items-start justify-start">
          <div className="flex gap-2 items-start justify-start">
            <img
              className="h-12 rounded-md"
              src={defaultAvatar}
              alt="Avatar padrão"
            />
            <div className="flex flex-col items-start justify-start">
              <span className="font-semibold">{user.nameWithTag}</span>
              <p className="text-sm">
                <span>
                  <strong className="text-emerald-500">LVL </strong>
                  {player?.level}
                </span>
                {' / '}
                <span>
                  <strong className="text-yellow-500">G </strong>
                  {player?.gold}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Button variant="destructive">Sair</Button>
      </div>
      <div className="h-2 w-full max-w-2xl border border-border bg-emerald-500/10">
        <div
          style={{ width: `${expPercentage}%` }}
          className="h-full bg-emerald-500 transition-all"
        ></div>
      </div>
    </div>
  );
};

export default PlayerHeader;
