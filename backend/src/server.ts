import express from 'express';
import cors from 'cors';

import snailpayRoutes from './routes/snailpay.routes';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Snail API funcionando correctamente',
  });
});

app.use('/api/snailpay', snailpayRoutes);

app.listen(PORT, () => {
  console.log(
    `Backend ejecutándose en http://localhost:${PORT}`,
  );
});