package com.backend.service;

import com.backend.dto.ProfileDTO;
import org.springframework.http.HttpStatus;

public interface ProfileService {

    ProfileDTO createProfile(ProfileDTO profileDTO);

    ProfileDTO updateProfile(ProfileDTO profileDTO);

    boolean existsByClerkId(String clerkId);

    void deleteProfile(String clerkId);
}
