package com.backend.service;

import com.backend.document.UserCredits;

public interface UserCreditsService {

    UserCredits createInitialCredits(String clerkId);

    UserCredits getUserCredits(String clerkId);

    UserCredits getUserCredits();

    Boolean hasEnoughCredits(int requiredCredits);

    UserCredits consumeCredit();
}
