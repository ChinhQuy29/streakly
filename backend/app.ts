import express from 'express';
import cors from 'cors';
import connectToDB from './libs/database';
import habitRoutes from './routes/habitRoutes';

const app = express();
app.use(express.json());

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use the habit routes
app.use(habitRoutes);

connectToDB();

// Listen on all network interfaces (0.0.0.0) so it's accessible from other devices
app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on 0.0.0.0:3000');
  console.log('Access from another device using your IP address: http://YOUR_IP_ADDRESS:3000');
});

