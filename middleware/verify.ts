import express, {Request, Response, NextFunction} from 'express';
import {safeParse} from '../utility/safeParse';
import {z} from 'zod';

export const verify = <Schema extends z.ZodTypeAny>(schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = safeParse(schema,req.body)
    if (!result) {
        return res.sendStatus(400).json({ error: "Invalid request" });
    }
    next();
}