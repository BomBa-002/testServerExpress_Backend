// routes/Router.js
// [theStep] - 001: إنشاء الروابط
import { Router } from 'express';
const router = Router();


// قائمة بالروابط
const router_DB = [
  {version: 1, routers: [
    { id: 1, from: 'companies', notes:[''], 
      to: [ 
            { id: 1, text: 'show[All]',  api: '/api/companies',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 2, text: 'create',  api: '/api/companies',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 3, text: 'show[id]',  api: '/api/companies/[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 4, text: 'update[id]',  api: '/api/companies/[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 5, text: 'delete[id]',  api: '/api/companies/[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
    ]},


    
    { id: 2, from: 'users', api: '/api/users', notes:[''], 
      to: [ 
            { id: 1, text: 'show[All]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 2, text: 'create',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 3, text: 'show[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 4, text: 'update[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 5, text: 'delete[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
    ]},
    { id: 3, from: 'permissions', api: '/api/permissions', notes:[''], 
      to: [ 
            { id: 1, text: 'show[All]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 2, text: 'create',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 3, text: 'show[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 4, text: 'update[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
            { id: 5, text: 'delete[id]',
              commit: [ 
                { id: 1, text: 'تم انشاء الرابط.', updatedAt: '2025-05-10', },
                { id: 2, text: 'تم تعديل الرابط.', updatedAt: '2025-05-10', },
              ] },
    ]},

  ] },
  // {version: 2,{}},
];


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
