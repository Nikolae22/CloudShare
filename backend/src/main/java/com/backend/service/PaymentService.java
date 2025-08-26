package com.backend.service;

import com.backend.dto.PaymentDTO;
import com.backend.dto.PaymentVerificationDTO;

public interface PaymentService {

    PaymentDTO createOrder(PaymentDTO paymentDTO);

    PaymentDTO verifyPayment(PaymentVerificationDTO request);


}
