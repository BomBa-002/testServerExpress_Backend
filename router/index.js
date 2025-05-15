// routes/Router.js
// [theStep] - 001: إنشاء الروابط
import { Router } from 'express';
const router = Router();

// const ls = ['../utils/currencyConverter.js' /* تحديد مسار الهاتف */];
// ls.forEach((i) => {
//   router.use((req, res, next) =>
//     import(i)
//       .then((m) => m._router(req, res, next))
//       .catch(next)
//   );
// });

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

import customerRouter from './customers.js';
// تثبيت جميع الراوترات هنا
router.use(customerRouter);

// export default (req, res, next) => {
//   router(req, res, next);
// };

export default router;
