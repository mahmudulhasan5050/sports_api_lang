import { Request, Response, NextFunction } from 'express';
import { stripe } from '../config/stripe';

import {
  AlreadyExistError,
  BadRequestError,
  ForbiddenError,
} from '../apiErrors/apiErrors';
import { clientURL } from '../utils/secrets';
import Facility from '../models/Facility';

export const checkoutStripe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { facilityId, paymentAmount } = req.body;

  try {
    const facility = await Facility.findById(facilityId);
    if (facility) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `${facility.type.en} ${facility.courtNumber}`,
              },
              unit_amount: paymentAmount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${clientURL}/payment-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: clientURL,
      });

      //res.redirect(session.url ?? `${clientURL}/payment-error`);
      res.status(200).json({ url: session.url, sessionId: session.id });
    }
    res.status(404);
  } catch (error) {
    next(new BadRequestError());
  }
};

export const verifyPaymentStripe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      res.status(200).json({ payment: true });
    } else {
      res.status(400).json({ payment: false });
    }
  } catch (error) {
    next(new BadRequestError());
  }
};
