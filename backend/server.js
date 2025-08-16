import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from "dotenv"
import { Resend } from 'resend';
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/email-veri",async(req,res)=>{
    try {
      
        const { email, full_name } = req.body;

  if (!email || !full_name) {
    return res.status(400).json({ error: "Missing email or full_name" });
  }
  const resend=new Resend("re_ghBa9GjJ_5Kz99GNL9bTj1tZKjMv5QhQJ");
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Your Account Has Been Approved",
      html: `<p>Hello ${full_name},</p>
             <p>Congratulations! Your account has been approved. 🎉</p>
             <p>You can now log in and start using our services.</p>
             <p>Adey Market</p>
             
             `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
})




const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
