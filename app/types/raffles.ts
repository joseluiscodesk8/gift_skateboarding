export type Participant = {
  id: string;
  name: string;
  numbers: number[];
  photo?: string;
};

export type Winner = {
  participantName: string;
  winningNumber: number;
  photo?: string;
};