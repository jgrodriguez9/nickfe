/* eslint-disable @typescript-eslint/no-explicit-any */
const extractMeaningfulMessage = (error: any, message: string ) => {
  if (!error) return message;
  let returnMessage = message;
  returnMessage = error?.response?.data?.message;
  if (returnMessage === undefined) {
    switch (error.response.status) {
      case 500:
        returnMessage =
            "Server error.";
        break;
      case 401:
        returnMessage = "Unauthenticated";
        break;
      case 406:
        returnMessage = "Not Acceptable";
        break;
      case 404:
        returnMessage =
            "Not found";
        break;
      case 409:
        returnMessage =
            "Conflict";
        break;
      case 422:
        returnMessage =
            "Unprocessable";
        break;
      default:
        returnMessage = "Not conexion";
        break;
    }
  }
  return returnMessage;
};
  
export default extractMeaningfulMessage;