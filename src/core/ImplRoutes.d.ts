import {Request, Response} from "express";

export interface RoutesDynamics {
    handler: (req: Request, res: Response) => any
}