import { Request, Response, Express } from 'express';
import { injectable, inject } from 'tsyringe';
import { IReveilService } from '../../application/ports/inbound/ReveilServicePort';

@injectable()
export class ReveilController {
  constructor(
    @inject("ReveilService") private reveilService: IReveilService
  ) {}

  registerRoutes(app: Express) {
    app.post('/reveil', this.sendReveilNotification.bind(this));
  }

  async sendReveilNotification(req: Request, res: Response) {
    const { userId, day, weather } = req.body;
    try {
      this.reveilService.sendUserAlarm(userId, day, weather);
      res.status(200).send("Notification has been sent");
    } catch (e){
      res.status(404).send({ message: "Notification could not be sent" });
    } 
  }
}