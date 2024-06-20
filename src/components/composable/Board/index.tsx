import React, { useState, useEffect } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import Piece from '../Piece';
import { TMovementStatus } from '@/services/types/types-get-board';
import { TPiecesAPI } from '@/services/types/types-get-pieces';

type TBoardMovement = {
  id: string;
  status: TMovementStatus | 'empty';
  column: number;
  row: number;
};

type TBoardProps = {
  rows: number;
  columns: number;
  movements: TBoardMovement[];
  currentHint: TBoardMovement[];
  pieces: TPiecesAPI;
};

const Board: React.FC<TBoardProps> = ({
  rows,
  pieces,
  columns,
  movements,
  currentHint,
}) => {
  const [list, setList] = useState<TBoardMovement[]>([]);
  const [hearts, setHearts] = useState(columns);

  useEffect(() => {
    if (currentHint.length === 0) {
      setList(
        Array.from({ length: columns }).map((_, index) => ({
          id: index.toString(),
          status: 'empty',
          column: (index % columns) + 1,
          row: Math.floor(index / columns) + 1,
        })),
      );
    } else {
      setList(currentHint);
    }

    const maxGuesses = columns;
    const guessesCount =
      movements.length === 0 ? -1 : (movements.length + 1) / maxGuesses;

    const remainingHearts = maxGuesses - guessesCount;
    setHearts(remainingHearts);
  }, [movements, currentHint, columns]);

  const renderHearts = () => {
    const heartIcons = Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="w-10 h-10">
        {index < hearts ? (
          <Heart className="text-red-500" />
        ) : (
          <HeartOff className="text-zinc-500" />
        )}
      </div>
    ));

    return <div className="flex gap-2">{heartIcons}</div>;
  };

  return (
    <div className="w-full gap-2 flex items-center justify-center flex-col mt-5">
      {renderHearts()}
      <div className="flex items-center justify-center gap-2 mt-5">
        {list.map((move) => {
          const person = pieces.findLast((flast) => flast.id === move.id);
          return (
            <Piece
              key={move.id}
              id={move.id}
              name={person?.name || move.id}
              onClick={() => console.log()}
              sprite={person?.sprite}
              status={move.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
