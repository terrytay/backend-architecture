import express from "express";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();

    //TODO: Health check route here

    //TODO: Call initializeMiddlewares

    //TODO: Call initializeControllers
  }

  public start(port: string): void {
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      //TODO: logger stuff here
    });
  }
}

export default App;
