export type Comment = {
  by: string;
  id: number;
  kids?: number[];
  dead?: boolean;
  deleted?: boolean;
  parent: number;
  text: string;
  time: number;
  type: "comment";
};
