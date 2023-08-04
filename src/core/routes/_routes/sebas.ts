import {RoutesDynamics} from "../../ImplRoutes";
import {Request} from "express";

export default class sebas  {
  static handler = (req: Request, res: Response) => {
    return (req: Request, res: Response) => {
      res.json().then(r => {
        console.log('r', r)
      })
     }
  };

}

