import React from 'react'

type Props = {}

export default function PaymentSummary({}: Props) {
  return (
    <div className='divide-y-2 divide-dashed'>
      <div className="flex flex-col gap-y-3 py-3">
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p>10.00 KD</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Delivery Fee</p>
          <p>10.00 KD</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Fees & Estimated Tax</p>
          <p>10.00 KD</p>
        </div>
      </div>

      <div className="flex justify-between items-center font-semibold pt-3">
        <p>Total</p>
        <p>10.00 KD</p>
      </div>
    </div>
  );
}