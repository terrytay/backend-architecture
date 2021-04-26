import App from "./app";

export function initApp(): void {
  const app = new App();

  // Entry point
  const port = process.env.PORT || "3000";
  app.start(port);
}
