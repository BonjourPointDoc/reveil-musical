import { Request, Response, Express } from 'express';
import { injectable, inject } from 'tsyringe';
import { WeatherService } from '../../domain/services/WeatherService';

@injectable()
export class WeatherController {
  constructor(
    private weatherService: WeatherService,         
    @inject("DemoWeatherService") private demoWeatherService: WeatherService    
  ) {}

  registerRoutes(app: Express) {
    app.get('/weather/:city', this.getWeatherByCity.bind(this));
  }

  async getWeatherByCity(req: Request, res: Response) {
    const city: string = req.params.city;
    const demo = req.query.demo === 'true';

    const service = demo ? this.demoWeatherService : this.weatherService;
    const result = await service.get(city); 

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Weather not found" });
    }
  }
}