import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Ippopay } from 'react-ippopay';

function App() {
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [orderId, setOrderId] = useState("")
  const api = axios.create({
    baseURL: `https://dev.apiv2.truedreem.com`,
    headers: {
      'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEwMDA0NzM5LCJqdGkiOiIxYjIzY2I1MzExY2U0OWU5YjE4OWU5NjJhYmEyMDJmMSIsInJpZCI6IjI1NzVhOTkyLTRmZGMtNGEwYS1iMmVkLTg2YjUyN2NiZjJmOSJ9.zv1R3grGo4jdZtrGOXqTDmAgeYvmAIbpf9ITreIcnsg",
      'Content-Type': 'application/json'
    }
  })
  useEffect(() => {
    window.addEventListener('message', ippopayHandler)

    return () => window.removeEventListener('message', ippopayHandler)
  })

  const ippopayHandler = (e: any) => {
    setPaymentLoading(false)
    if (e.data.status === 'success') {
      console.log(e.data)
    }
    if (e.data.status === 'failure') {
      console.log(e.data)
    }
  }

  /* 
  Authorization header is server token
  */
  const makePayment = () => {
    setPaymentLoading(true)
    api.post("/auction/create-order").then(res => {
      setOrderId(res.data.data.order.order_id)
      setPaymentOpen(true)
    })
  }


  return (
    <div className="App">
      <button onClick={() => makePayment()}>{paymentLoading ? "Loading..." : "MAKE PAYMENT"}</button>
      <Ippopay
        ippopayOpen={paymentOpen}
        ippopayClose={true}
        order_id={orderId}
        public_key={`pk_live_TvLSKXeLxFVF`}
      />
    </div>
  );
}

export default App;
