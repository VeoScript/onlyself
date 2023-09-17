-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `profile_photo` VARCHAR(191) NULL,
    `cover_photo` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `facebook_link` VARCHAR(191) NULL,
    `instagram_link` VARCHAR(191) NULL,
    `twitterx_link` VARCHAR(191) NULL,
    `linkedin_link` VARCHAR(191) NULL,
    `github_link` VARCHAR(191) NULL,
    `website_link` VARCHAR(191) NULL,
    `is_display_name` BOOLEAN NOT NULL DEFAULT false,
    `is_receive_files_anonymous` BOOLEAN NOT NULL DEFAULT false,
    `is_receive_images_anonymous` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
