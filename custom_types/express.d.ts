declare namespace Express {
  export interface Request {
    userData: {
      userId: number;
      userName: string;
    };
  }
}