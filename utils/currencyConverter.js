/** upDateAt: ['08/02/2025']
 * utils/currencyConverter.js          |==>  ملف لجلب و تحويل العملات
 */

import axios from 'axios'; // استيراد Axios لإجراء طلبات HTTP

// const BASE_URL = `${process.env.CURRENCY_CONVERTER_BASE_URL}${process.env.CURRENCY_CONVERTER_API_KEY}`;
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=6a93760f7f4a099f21eb7bc1c7b65bec`;

// تعريف متغير rates ككائن لتخزين أسعار الصرف
export let rates = {};

// دالة لجلب أسعار الصرف الحية من API خارجي
export const fun__getCurrency = async () => {
  try {
    const response = (await axios.get(BASE_URL)).data.rates; // إرسال طلب GET إلى API
    rates = response; // إرجاع أسعار الصرف
  } catch (error) {
    console.error('Failed to fetch exchange rates:' /* , error */); // طباعة خطأ في حالة الفشل
  }
};

// تحديث الأسعار كل فترة محددة
setInterval(async () => {
  const newRates = await fun__getCurrency();
  if (newRates) {
    console.log('تم تحديث أسعار الصرف:', rates);
    rates = newRates;
    return;
  }
  console.log('لم تتم عملية تحديث أسعار الصرف!!');
}, 1000 * 60 * 10); // كل 10 دقائق

// تحديث الأسعار عند بدء التشغيل
fun__getCurrency();

// دالة لتحويل العملات
export const getCurrencyConverter = async (req, res) => {
  const { amount, from } = req.query; // استخراج القيمة والعملة من الطلب
  // التحقق من وجود القيمة والعملة
  if (!amount || !from) {
    return res
      .status(400)
      .json({ error: 'Amount and from currency are required.' });
  }

  const amountFloat = parseFloat(amount); // تحويل القيمة إلى رقم
  // التحقق من أن القيمة رقم صحيح
  if (isNaN(amountFloat)) {
    return res.status(400).json({ error: 'Amount must be a valid number.' });
  }

  // جلب أسعار الصرف الحية
  await fun__getCurrency();

  // التحقق من نجاح جلب الأسعار
  if (!rates) {
    return res.status(500).json({ error: 'Failed to fetch exchange rates.' });
  }

  // التحقق من أن العملة المطلوبة مدعومة
  if (!rates[from]) {
    return res.status(400).json({ error: 'Unsupported currency.' });
  }

  // حساب القيم المحولة
  const result = {
    USD: (amountFloat / rates[from]) * rates.USD, // التحويل إلى الدولار الأمريكي
    EGP: (amountFloat / rates[from]) * rates.EGP, // التحويل إلى الجنيه المصري
    EUR: (amountFloat / rates[from]) * rates.EUR, // التحويل إلى اليورو
    SAR: (amountFloat / rates[from]) * rates.SAR, // التحويل إلى الريال السعودي
  };

  // إرجاع النتيجة كـ JSON
  // res.json({'Good': 'Currency Converter', rates});
  res.json({ [from]: amountFloat, ...result });
};

//#region { 5.Router }
import { Router } from 'express';
export const _router = Router();

_router.route(`/currencyConverter`).get(getCurrencyConverter);
// http://localhost:5000/api/v1/currencyConverter?amount=100&from=EGP
//#endregion
