export const textShorthand = (text = '', limit = 25) => {
  if (text.length < limit) {
    return text;
  } else {
    return text.slice(0, limit).padEnd(3, '.');
  }
};

// export class Request {
//   static async get(){
//     const data = await fetch(
//       'http://example.com/movies.json',
//     ).then((response) => ({ status: response.status, body: response.json() }));
//   }
//   static async post() {

//   }

// }
