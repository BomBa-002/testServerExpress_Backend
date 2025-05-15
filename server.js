/* eslint-disable no-undef */
import express from 'express';
import 'dotenv/config';

import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

//#region 🌍 Environment Variables
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';
//#endregion

//#region 🧠 Connect to Database (اختياري حسب استخدامك)
// import('./data/config_db.js')
//   .then(({ default: connectDB }) => connectDB())
//   .catch((err) => console.error('❌ Failed to connect to DB:', err.message));
//#endregion

//#region 🧩 Middleware
// Logging (Development only)
if (NODE_ENV === 'development') {
  import('morgan').then((morgan) => app.use(morgan.default('dev')));
}

// Security Headers
app.use(helmet());

// CORS
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: '❌ Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));
//#endregion

//#region 🧭 Routes
app.get('/', (req, res) => {
  res.send('🌍 Welcome to the API Server!');
});

// Mount Main API Routes
app.use('/api/v1', async (req, res, next) => {
  try {
    const routerModule = await import('./router/index.js');
    routerModule.default(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Catch-all Route
app.all('*', async (req, res, next) => {
  const { error } = await import('./utils/message.js');
  next(new error(`🚫 Can't find this route: ${req.originalUrl}`));
});
//#endregion

//#region 🛠️ Global Error Handler
app.use(async (err, req, res, next) => {
  const { default: errorHandler } = await import(
    './middleware/errorMiddleware.js'
  );
  errorHandler(err, req, res, next);
});
//#endregion

//#region 🚀 Server Listener
app.listen(SERVER_PORT, () => {
  console.log(`🖥️ Server is running at: ${SERVER_URL}:${SERVER_PORT}`);
  console.log(`🧪 Environment: ${NODE_ENV}`);
});

// Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error(`💥 Unhandled Rejection: ${err.name} | ${err.message}`);
  if (NODE_ENV === 'development') console.error(err.stack);
});
//#endregion
