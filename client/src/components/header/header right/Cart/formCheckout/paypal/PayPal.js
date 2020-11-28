import React, { useEffect, useRef } from 'react';
import s from './PayPal.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

export default function PayPal({ user, setCheckout, price, checkout }){

    const paypal = useRef();  
    const userPrice = {
      price: price,
      name: user.name,
      email: user.email
    }  
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
                    value: 0.1,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            axios.post(`${process.env.REACT_APP_API_URL}/orders/confirmPay`, userPrice)
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }, []);
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