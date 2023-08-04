import {RoutesDynamics} from "../../ImplRoutes";

export default class RouteTest implements RoutesDynamics {
    public handler = (req: any, res: any): any => {
        res.json({ message: 'Hello World' })
    };

}

