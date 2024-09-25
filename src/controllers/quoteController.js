const CPQEngine = require('../engine/cpq-engine');

exports.generateQuote = (req, res) => {
  const { productId } = req.body;

    var context = {
      request: {
        user: {
          id: 1,
          authenticated: true,
        },
        product: {
          id: productId,
        }
      },
      response: {
        product: null,
        price: null,
      },
      error: {
        message: null,
      }
    };

    CPQEngine.run(context);

    if (context.error.message) {
      res.status(400).json(context.error);
    } else {
      res.status(200).json(context.response);
    }
};