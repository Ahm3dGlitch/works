const NAME = "myExampleWorkersABTest";

export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))
      return fetch(req);
      
    const cookie = req.headers.get("cookie");

    if (cookie && cookie.includes(`${NAME}=control`)) {
      url.pathname = "/control" + url.pathname;
    } else if (cookie && cookie.includes(`${NAME}=test`)) {
      url.pathname = "/test" + url.pathname;
    } else {
      const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
      if (group === "control") {
        url.pathname = "/control" + url.pathname;
      } else {
        url.pathname = "/test" + url.pathname;
      }
      let res = await fetch(url);
      res = new Response(res.body, res);
      res.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);
      return res;
    }
    return fetch(url);
  },
};