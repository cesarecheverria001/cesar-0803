import express from 'express';
import cors from 'cors';

import snailpayRoutes from './routes/snailpay.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Snail API funcionando correctamente',
  });
});

app.use('/api/snailpay', snailpayRoutes);

export default app;