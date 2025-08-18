package com.backend.controller;

import com.backend.document.UserCredits;
import com.backend.dto.FileMetadataDTO;
import com.backend.service.FileMetadataService;
import com.backend.service.UserCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final FileMetadataService fileMetadataService;
    private final UserCreditsService userCreditsService;


    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestPart("files") MultipartFile files[]) throws IOException {
        Map<String, Object> response = new HashMap<>();
        List<FileMetadataDTO> responseDTO = fileMetadataService.uploadFiles(files);

        UserCredits userCredits = userCreditsService.getUserCredits();

        response.put("files", responseDTO);
        response.put("remainingCredits", userCredits);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<?> getFilesForCurrentUser() {
        List<FileMetadataDTO> files = fileMetadataService.getFiles();
        return ResponseEntity.ok(files);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<?> getPublicFile(@PathVariable String id) {
        FileMetadataDTO publicFile = fileMetadataService.getPublicFile(id);
        return ResponseEntity.ok(publicFile);
    }


    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable String id) throws IOException {
        FileMetadataDTO downloadableFile = fileMetadataService.getDownloadableFile(id);
        Path path = Paths.get(downloadableFile.getFileLocation());
        UrlResource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment: filename=\"" + downloadableFile.getName() + "\"")
                .body(resource);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable String id){
        fileMetadataService.deleteFile(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle-public")
    public ResponseEntity<?> togglePublic(@PathVariable String id){
        FileMetadataDTO fileMetadataDTO = fileMetadataService.togglePublic(id);
        return ResponseEntity.ok(fileMetadataDTO);
    }

}
