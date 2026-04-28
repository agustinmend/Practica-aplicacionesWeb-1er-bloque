export class Router {
  private onRouteChange: (channelId: string) => void;

  constructor(onRouteChange: (channelId: string) => void) {
    this.onRouteChange = onRouteChange;
    window.addEventListener('popstate', () => {
      this.handleCurrentRoute();
    });
  }

  navigate(path: string): void {
    window.history.pushState({}, "", path);
    this.handleCurrentRoute();
  }

  handleCurrentRoute(): void {
    const path = window.location.pathname;

    if (path === "/" || path === "") {
      this.onRouteChange("c-general");
    } else if (path.startsWith("/c/")) {
      const parts = path.split("/c/");
      const id = parts[1];
      if (id !== undefined && id !== "") {
        this.onRouteChange(id);
      } else {
        this.onRouteChange("c-general");
      }
    } else {
      this.navigate("/");
    }
  }
}