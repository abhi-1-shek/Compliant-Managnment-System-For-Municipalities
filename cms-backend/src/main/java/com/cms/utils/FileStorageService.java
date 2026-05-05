package com.cms.utils;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
	String store(MultipartFile file) throws Exception;
}
