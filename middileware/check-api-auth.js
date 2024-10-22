// module.exports = async (req, res, next) => {
//   const API_KEY = req.get('ApiKey');
//   const API_SECRET = req.get('ApiSecret');
//   // Replace these with your actual API_KEY and API_SECRET values
//   const validApiKey = process.env.API_KEY;
//   const validApiSecret = process.env.API_SECRET;
//   if (API_KEY !== validApiKey || API_SECRET !== validApiSecret) {
//     res.status(401).json(
//       {
//         statusCode: 401,
//         message: "Unauthorized. Check API_KEY and API_SECRET"
//       }
//     );
//   } else {
//     next(); // Proceed to the next middleware or route
//   }
// };

// for Pathao
module.exports = async (req, res, next) => {
  const API_KEY = req.get('X-PATHAO-Signature');
  const validApiKey = process.env.API_KEY;
  if (API_KEY !== validApiKey ) {
    res.status(401).json(
      {
        statusCode: 401,
        message: "Unauthorized. Check API_KEY and API_SECRET"
      }
    );
  } else {
    next(); // Proceed to the next middleware or route
  }
};
