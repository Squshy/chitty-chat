import { Request, Response } from "express";
import { Redis } from "ioredis";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
};

type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & { [K in Keys]-?:
        Required<Pick<T, K>>
        & Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]

interface GetUserInterface {
  email?: string;
  username?: string;
  id?: string;
}
export type GetUser = RequireOnlyOne<
  GetUserInterface,
  "email" | "username" | "id"
>;

