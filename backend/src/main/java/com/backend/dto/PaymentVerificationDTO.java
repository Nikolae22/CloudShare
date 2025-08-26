package com.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Builder
public class PaymentVerificationDTO {

    private String razorpay_order_id;
    private String razorpay_payment_id;
    private String razorpay_signature;
    private String planId;

}
