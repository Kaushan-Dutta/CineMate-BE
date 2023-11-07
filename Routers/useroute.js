const router=require('express').Router();
const AuthController=require('../Controllers/authController');
const PaymentController=require('../Controllers/paymentController');

router.route('/auth').post(AuthController.Authentication,AuthController.Register);
router.route('/payment').post(PaymentController.Payment);
router.route('/subscribe').post(AuthController.Subscribe);

module.exports=router;
