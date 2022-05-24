const asyncHandler = require("express-async-handler")
//order model
const Order = require("../models/Order");
//stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//handle checkout 
const handleCheckout = asyncHandler(async (req, res) => {
    let { orderId, name, price, qty } = req.body

    if (!orderId || !name || !price || !qty) {
        res.status(400);
        throw new Error("Please provide all info");
    }
    let id = orderId;
    let priceInCents = Number(price) * 100

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name
                    },
                    unit_amount: priceInCents,
                },
                quantity: qty,
            }],

            //if the payment is successful we will redierect to this page
            success_url: `${process.env.CLIENT_URL}/payment/success`,
            //if the payment is cancel we will redierect to this page
            cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
        });

        //set the tran id to db
        const updatedOrderDetails = await Order.findByIdAndUpdate(id, { tranId: session.payment_intent }, {
            new: true,
        });
        //send redirect url
        res.json({ url: session.url});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

//handle stripe webhook
const handleStripeWebhook = asyncHandler(async (req, res) => {
    const event = req.body;
    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            //res.status(200).json(paymentIntent)
            if (paymentIntent) {
                let tranId = paymentIntent.id
                //set the tran id to db
                await Order.findOneAndUpdate({ tranId }, { paymentStatus: paymentIntent.status });
            }
            break;
        case "payment_method.attached":
            const paymentMethod = event.data.object;
            console.log("PaymentMethod was attached to a Customer!");
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
})

module.exports = { handleCheckout, handleStripeWebhook }