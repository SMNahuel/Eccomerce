import React, { useEffect, useRef } from 'react';
import s from './PayPal.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function PayPal({ user, setCheckout, price, checkout }){

    const paypal = useRef();    

    useEffect(() => {
      window.paypal.Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "test description",
                  amount: {
                    currency_code: "USD",
                    value: 1,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }, []);
    console.log(price)
    return (
      <div>
        <div onClick={() => setCheckout(!checkout)} className={s.container_button_arrow}>
          <ArrowBackIcon fontSize="large" />
        </div>
        <div className={s.container_price}>
          <p>Total: ${price}</p>
        </div>
        <div ref={paypal} className={s.container_paypal}></div>

      </div>
    );
}