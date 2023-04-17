import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
	"pk_test_51Mxsi5G9XpG9wIA583k5SZeUxEOfKRGr67CB5sb92nGQPBAF4nFeriZlCjP8Pk7MwjC21otBCyvQeIPvG8Kb5ZYP000wRMOmRp";

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm/>
    </Elements>
  )
}

export default StripeContainer