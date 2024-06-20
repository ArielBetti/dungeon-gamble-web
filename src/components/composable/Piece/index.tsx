import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TMovementStatus } from '@/services/types/types-get-board';

type TPieceProps = {
  status: TMovementStatus | 'empty';
  id: string;
  sprite?: string;
  name: string;
  onClick: () => void;
};

const Piece = ({ sprite, status }: TPieceProps) => {
  const miss = status === 'miss';
  const missPlaced = status === 'missPlaced';
  const hit = status === 'hit';

  return (
    <Card
      className={cn(
        'bg-primary/10 border border-border overflow-hidden max-sm:h-16 max-sm:w-16 h-24 w-24',
        miss && 'border-red-500',
        missPlaced && 'border-amber-500',
        hit && 'border-emerald-500',
        sprite && 'bg-card',
      )}
    >
      {sprite && <img src={sprite} className="w-full" />}
    </Card>
  );
};

export default Piece;
