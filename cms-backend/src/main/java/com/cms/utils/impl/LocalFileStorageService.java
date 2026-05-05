package com.cms.utils.impl;

import com.cms.utils.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Override
    public String store(MultipartFile file) throws Exception {
        if (file == null || file.isEmpty()) return null;

        String original = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = FilenameUtils.getExtension(original);
        String name = UUID.randomUUID().toString() + (ext.isEmpty() ? "" : "." + ext);

        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path target = uploadPath.resolve(name);
        file.transferTo(target.toFile());

      
        return uploadDir + "/" + name;
    }
}
