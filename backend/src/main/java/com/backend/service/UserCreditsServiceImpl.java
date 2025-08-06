package com.backend.service;

import com.backend.document.UserCredits;
import com.backend.repository.UserCreditsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCreditsServiceImpl implements UserCreditsService {

    private final UserCreditsRepository userCreditsRepository;

    @Override
    public UserCredits createInitialCredits(String clerkId) {
        UserCredits userCredits = UserCredits.builder()
                .clerkId(clerkId)
                .credits(5)
                .plan("BASIC")
                .build();

        return userCreditsRepository.save(userCredits);

    }
}
