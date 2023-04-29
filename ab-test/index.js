export default {
  async fetch(request) {
    try {
      const tlsVersion = request.cf.tlsVersion;
      if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {
        return new Response("Please use TLS version 1.2 or higher.", {
          status: 403,
        });
      }
      return fetch(request);
    } catch (err) {
      console.error(
        "request.cf does not exist in the previewer, only in production"
      );
      return new Response(``)
      
    }
  },
};