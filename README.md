# WeatherApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code choices

As this is some kind of a showcase, I decided to use the experimental zoneless change detection feature. I've undertaken this because that feature, along with signals and new syntax, represents the future of Angular. When zoneless functionality reaches a stable phase, it will open up pathways to a new level of productivity without messing up with on-push change detection and executing code outside Angular's zone library.
The app uses the Angular Material library. It consists of three views, a toolbar with a structural menu that allows users to switch between views, and weather units. Additionally, a button on the right can reload weather data for predefined cities. The list of cities and many other defaults are localised in the config.ts file. Last, but not least, a shared component is used in all views and shows forecast data in the table. 

The next possible steps would be:
1. Add error detection and handling in weather service
2. Add more unit tests to achieve a 100% coverage
3. Improve styling and theming Angular Material components

However, I'm going to move this project into the NX monorepo first, because I plan to add NestJS backend.

I hope that you'll enjoy my little project.

