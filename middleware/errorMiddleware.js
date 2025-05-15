// Global Error Handlers Middleware: Database.err -> (then() catch(), try{} catch(err){}, asyncHandler())
/**
 * @disc                  - دالة وسطية لإصطياد الأخطاء والتعديل عليها ثم إعادة توجيهها
 * @disc                  - Global Error Handlers Middleware: Database.err -> (then() catch(), try{} catch(err){}, asyncHandler())
 * @param {Error} err     - الخطأ الذي تم اصطياده
 * @param {Request} req   - طلب HTTP
 * @param {Response} res  - استجابة HTTP
 * @param {Function} next - دالة next لتمرير التحكم إلى الـ Middleware التالي
 * @returns {void}        - لا يتم إرجاع أي شيء، يتم إرسال الاستجابة مباشرة
 */
export function globalError(err, req, res /* , next */) {
  // تحديد statusCode و status بشكل افتراضي إذا لم يكونا محددين
  err.statusCode = err.statusCode || 500; // 500: Internal Server Error
  err.status = err.status || 'error';

  // إرسال الخطأ بناءً على بيئة التشغيل (تطوير أو إنتاج)
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
}

// إرسال الخطأ في بيئة التطوير
function sendErrorForDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack, // عرض تفاصيل الخطأ (فقط في بيئة التطوير)
  });
}

// إرسال الخطأ في بيئة الإنتاج
function sendErrorForProd(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

// ======================================================

export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
