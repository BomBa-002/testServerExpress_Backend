import express from 'express';
import { data } from '../data/db_customers.js';

const router = express.Router();

// GET: الحصول على كل العملاء
router.get('/customers', (req, res) => {
  res.json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

// POST: إضافة عميل جديد (بدون حفظ فعلي)
router.post('/customers', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      status: 'fail',
      message: 'يرجى إدخال الاسم والبريد والهاتف.',
    });
  }

  const newCustomer = {
    id: data.length + 1,
    name,
    email,
    phone,
  };

  data.push(newCustomer); // ملاحظة: هذا الحفظ فقط في الذاكرة (ليس دائمًا)

  res.status(201).json({
    status: 'success',
    data: newCustomer,
  });
});

export default router;
