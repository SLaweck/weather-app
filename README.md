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
If I could have more time, I would:
1. Add error detection and handling in weather service
2. Add more unit tests (I lost a lot of time on figuring out why them wouldn't work, but finally I've managed to fix problems, but they aren't fully compatible with zoneless functionality)
3. Improve styling and theming Angular Material components

I hope that you'll enjoy my little project.

