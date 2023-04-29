export default {
    async fetch(request) {
     
      const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
      const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";
      const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);
  
      if (psk === PRESHARED_AUTH_HEADER_VALUE) {
        return fetch(request);
      }
  
      return new Response("Sorry, you have supplied an invalid key.", {
        status: 403,
      });
    },
  };