const CPQEngine = require('../engine/cpq-engine');

exports.generateQuote = (req, res) => {
  const { productId, options, quantity } = req.body;

    // todo: move definition of context to a separate file
    var context = {
      request: {
        user: {
          id: 1,
          authenticated: true,
        },
        product: {
          id: productId,
          quantity,
          options,
        }
      },
      quote: {
        product: null,
        price: {
          unit: undefined,
          base: undefined,
          discounts: [],
          offering: undefined,
        }
      },
      status: {
        configured: false,
        priced: false,
        validated: false,
        error: false,
      },
      bind: function(name, data) {
        this.quote[name] = data;
      },
      error: function(message) {
        this.error.message = { error: message };
        this.status.error = true;
      }
    };

    CPQEngine.run(context);

    if (context.status.error) {
      res.status(400).json(context.error.message);
    } else {
      res.status(200).json(context.quote);
    }
};