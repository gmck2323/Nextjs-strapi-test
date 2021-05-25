'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const stripe = require("stripe")("sk_test_l8p2JJUuOGivk2Ze5gQ4SIO700cOcG7q6p");

 module.exports = {
   /**
    * Create a/an order record.
    *
    * @return {Object}
    */
 
   create: async (ctx) => {
     const { address, amount, paintings, token, city, state } = JSON.parse(
       ctx.request.body
     );
     const stripeAmount = Math.floor(amount * 100);
     // charge on stripe
     const charge = await stripe.charges.create({
       // Transform cents to dollars.
       amount: stripeAmount,
       currency: "usd",
       description: `Order ${new Date()} by ${ctx.state.user._id}`,
       source: token,
     });
 
     // Register the order in the database
     const order = await strapi.services.order.create({
       user: ctx.state.user.id,
       charge_id: charge.id,
       amount: stripeAmount,
       address,
       paintings,
       city,
       state,
     });
     
     return order;
   },
 };
