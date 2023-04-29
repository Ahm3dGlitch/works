export default {
    async fetch(request, env, ctx) {
      
      const someHost = "https://examples.cloudflareworkers.com/demos";
      const url = someHost + "/static/json";
  
     
      async function gatherResponse(response) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return JSON.stringify(await response.json());
        }
        return response.text();
      }
  
      const init = {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
  
      const response = await fetch(url, init);
      const results = await gatherResponse(response);
      return new Response(results, init);
    },
  };