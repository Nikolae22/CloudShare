package com.backend.service;

import com.backend.document.UserCredits;

public interface UserCreditsService {

    UserCredits createInitialCredits(String clerkId);
}
