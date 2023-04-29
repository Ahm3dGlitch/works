export default {
    async fetch(request) {
      const response = await fetch(request);
  
      const newResponse = new Response(response.body, response);
  
      newResponse.headers.append(
        "x-workers-hello",
        "Hello from Cloudflare Workers"
      );
  
      newResponse.headers.delete("x-header-to-delete");
      newResponse.headers.delete("x-header2-to-delete");
  
      newResponse.headers.set("x-header-to-change", "NewValue");
      return newResponse;
    },
  };