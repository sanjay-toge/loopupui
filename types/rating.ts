export type Rating = {
  id: string;
  ratedUserId: string;
  raterUserId: string;
  score: number;
  comment: string;
  relation?: string;
  knownSince?: number;
  createdAt: string;
  updatedAt: string;
}
