package com.backend.controller;

import com.backend.dto.PaymentDTO;
import com.backend.dto.PaymentVerificationDTO;
import com.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentDTO paymentDTO) {
        PaymentDTO order = paymentService.createOrder(paymentDTO);

        if (order.getSuccess()) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.badRequest().body(order);
        }

    }


    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationDTO request){
        PaymentDTO response = paymentService.verifyPayment(request);
        if (response.getSuccess()){
            return ResponseEntity.ok(response);
        }else {
            return ResponseEntity.badRequest().body(response);
        }

    }
}
