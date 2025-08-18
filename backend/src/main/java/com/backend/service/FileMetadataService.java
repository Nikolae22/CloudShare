package com.backend.service;


import com.backend.dto.FileMetadataDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileMetadataService {

    List<FileMetadataDTO> uploadFiles(MultipartFile files[]) throws IOException;

    List<FileMetadataDTO> getFiles();

    FileMetadataDTO getPublicFile(String id);

    FileMetadataDTO getDownloadableFile(String id);

    void deleteFile(String id);

    FileMetadataDTO togglePublic(String id);
}
