export default {
    async fetch(request) {
      
      const someHost = "https://examples.cloudflareworkers.com/demos";
      const url1 = someHost + "/requests/json";
      const url2 = someHost + "/requests/json";
      const type = "application/json;charset=UTF-8";
  
      
      async function gatherResponse(response) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return JSON.stringify(await response.json());
        } else if (contentType.includes("application/text")) {
          return response.text();
        } else if (contentType.includes("text/html")) {
          return response.text();
        } else {
          return response.text();
        }
      }
  
      const init = {
        headers: {
          "content-type": type,
        },
      };
  
      const responses = await Promise.all([fetch(url1, init), fetch(url2, init)]);
      const results = await Promise.all([
        gatherResponse(responses[0]),
        gatherResponse(responses[1]),
      ]);
      return new Response(results.join(), init);
    },
  };