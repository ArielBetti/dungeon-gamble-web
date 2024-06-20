export type TMovementStatus = 'hit' | 'miss' | 'missPlaced';

export type TBoardMovement = {
  id: string;
  status: TMovementStatus | "empty";
  column: number;
  row: number;
};

export type TBoardAPI = {
  streak: number;
  gameOver: boolean;
  initTime: string; // considerando que a data e hora estão em formato ISO 8601
  endTime: string; // considerando que a data e hora estão em formato ISO 8601
  currentTime: string; // considerando que a data e hora estão em formato ISO 8601
  boardRows: number;
  boardColumns: number;
  currentBoard: TBoardMovement[];
};
