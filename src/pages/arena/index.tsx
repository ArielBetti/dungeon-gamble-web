import Board from '@/components/composable/Board';
import GameOver from '@/components/composable/GameOver';
import Piece from '@/components/composable/Piece';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGetBoard } from '@/queries/useGetBoard';
import { useGetPieces } from '@/queries/useGetPieces';
import { useGetPlayerInfo } from '@/queries/useGetPlayerInfo';
import { useSendHint } from '@/queries/useSendHint';
import { getPlayerInfo } from '@/services/getPlayerInfo';
import { TBoardMovement } from '@/services/types/types-get-board';
import { usePlayerActions } from '@/store/player';
import { Delete } from 'lucide-react';
import { useEffect, useState } from 'react';

const Arena = () => {
  const [currentHint, setCurrentHint] = useState<TBoardMovement[]>([]);
  const { data: playerInfo, refetch: updatePlayerInfo } = useGetPlayerInfo();
  const {
    data: board,
    refetch: getBoard,
    isFetching: loadingBoard,
  } = useGetBoard();
  const {
    data: pieces,
    refetch: getPieces,
    isFetching: loadingPieces,
  } = useGetPieces();

  const {
    data: hintBody,
    mutate: sendHint,
    isPending: hintLoading,
  } = useSendHint();
  const { setPlayer } = usePlayerActions();

  const handleRemoveHint = () => {
    if (currentHint.length === 0) {
      return;
    }

    const arr = [...currentHint];

    arr.pop();

    setCurrentHint(arr);
  };

  const handleSetHint = (item: TBoardMovement) => {
    if (currentHint.length >= (board?.boardColumns || 0)) {
      return;
    }

    setCurrentHint((prev) => [...prev, item]);
  };

  useEffect(() => {
    if (playerInfo) {
      setPlayer({
        ...playerInfo,
      });
    }
  }, [playerInfo]);

  if (board?.gameOver) {
    return (
      <GameOver
        currentTime={board.currentTime}
        endTime={board.endTime}
        onEnd={getBoard}
      />
    );
  }

  return (
    <div>
      <Board
        columns={board?.boardColumns || 0}
        rows={board?.boardRows || 0}
        pieces={pieces || []}
        movements={board?.currentBoard || []}
        currentHint={currentHint}
      />
      <div className="flex gap-2 items-center justify-center mt-10 flex-wrap flex-row-reverse">
        <Button
          onClick={handleRemoveHint}
          variant="secondary"
          className="h-14 w-14"
          disabled={hintLoading}
        >
          <Delete className="h-6" />
        </Button>
        <Button
          disabled={currentHint.length < 5}
          onClick={() =>
            sendHint(
              currentHint.map((mhint) => ({
                column: mhint.column,
                pieceId: mhint.id,
              })),
              {
                onSuccess: () => {
                  getBoard();
                  updatePlayerInfo();
                },
              },
            )
          }
          isLoading={hintLoading}
          className="h-14 w-32"
        >
          Enter
        </Button>
        {pieces?.map((piece, index) => {
          const statusCompare = board?.currentBoard.findLast(
            (b) => b.id === piece.id,
          );

          console.log(board?.currentBoard, piece);

          return (
            <Button
              variant="outline"
              className={cn(
                'h-16 w-16 p-0',
                statusCompare?.status === 'miss' && 'border-red-500',
                statusCompare?.status === 'missPlaced' && 'border-amber-500',
                statusCompare?.status === 'hit' && 'border-emerald-500',
              )}
              onClick={() =>
                handleSetHint({
                  column: currentHint.length + 1,
                  id: piece.id,
                  row: currentHint.length + 1,
                  status: statusCompare?.status || 'empty',
                })
              }
            >
              <img
                className="w-full"
                src={piece.sprite}
                alt={`Sprite do ${piece.name}`}
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Arena;
