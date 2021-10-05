// Used for parsing mixed urls with parameters and auxiliary outlets
// function is not needed anymore
export function parseUrlPathInSegments(fullUrl: string): Array<string> {
  const result = fullUrl
    .split("/")
    .filter((segment) => segment)
    .map((segment) => {
      let path = segment;
      const paramPos = path.indexOf("?");
      if (paramPos > -1) {
        path = path.substring(0, paramPos);
      }
      return path;
    });
  return result;
}
