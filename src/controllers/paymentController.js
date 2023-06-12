import Room from "../models/room";
import User from "@/models/user";
import Booking from "@/models/booking";
import ErrorHandler from "@/utils/errorHandler";

import catchAsyncErrors from "@/middlewares/catchAsyncErrors";

import APIFeatures from "@/utils/apiFeatures";
import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Generate stripe checkout session => /api/checkout_session/:roomId
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
  //Get room details
  const room = await Room.findById(req.query.roomId);

  const { origin } = absoluteUrl(req);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  if (req.method === "GET") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
              currency: "usd",
              unit_amount: req.query.price * 100,
              product_data: {
                name: room.name,
                images: [`${room.images[0].url}`],
              },
            },
            quantity: 1,
          },
        ],
        customer_email: req.user.email,
        client_reference_id: req.query.roomId,
        metadata: { checkInDate, checkOutDate, daysOfStay },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${origin}/bookings/me`,
        cancel_url: `${origin}/room/${room._id}`,
      });
      //   res.redirect(303, session.url);
      //   console.log(session);'
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
});

//Create new booking after payment => /api/webhook
const webhookCheckout = catchAsyncErrors(async (req, res) => {
  const rawBody = await getRawBody(req);

  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;
      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };
      const cin = session.metadata.checkInDate;
      const cout = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      //took a lot of time to fix -- finally reading docs helped
      // console.log(cin, "helo ji", cout);
      const checkInDate = moment(cin).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const checkOutDate = moment(cout).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      res
        .status(200)
        .json({
          succes: true,
        })
        .end();
    }
  } catch (error) {
    console.log(error, "Stripe error");
  }
});

export { stripeCheckoutSession, webhookCheckout };
