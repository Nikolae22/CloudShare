package com.backend.repository;

import com.backend.document.ProfileDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Optional;

@EnableMongoRepositories
public interface ProfileRepository extends MongoRepository<ProfileDocument,String> {

    Optional<ProfileDocument> findByEmail(String email);

    ProfileDocument findByClerkId(String clerkId);

    boolean existsByClerkId(String clerkId);
}
