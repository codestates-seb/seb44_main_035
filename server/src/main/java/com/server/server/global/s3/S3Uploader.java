package com.server.server.global.s3;


import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.region.static}")
    private String region;


    public String upload(MultipartFile multipartFile) {
        String s3FileName = UUID.randomUUID()+"";

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getSize());

        try {
            amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);
        } catch (IOException e) {
            log.error("Failed to upload file to S3", e);
            // 예외 처리: IOException 발생 시 로그 출력
        }

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

    public void delete(String fileUrl) {
        try {
            String fileKey = fileUrl.substring(68);
            amazonS3.deleteObject(bucket, fileKey);
        } catch (SdkClientException e) {
            log.error("Failed to delete file", e);
        }
    }
}