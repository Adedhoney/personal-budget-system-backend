CREATE DATABASE IF NOT EXISTS `afridol`;


CREATE TABLE IF NOT EXISTS `afridol`.`accounts` (
	`id` INT AUTO_INCREMENT,
	`accountId` VARCHAR(255) NOT NULL,
  	`email` VARCHAR(255) NOT NULL,
  	`firstname` VARCHAR(255) NULL,
  	`lastname` VARCHAR(255) NULL,
  	`DOB` INT NULL,
  	`status` VARCHAR(255) NULL,
  	`password` VARCHAR(255) NULL,
  	`emailVerifiedStatus` VARCHAR(255)  NULL,
  	`isCreator` VARCHAR(255) NULL,
  	`createdOn` VARCHAR(255) NULL,
  	`lastModifiedOn` VARCHAR(255) NULL,
  	`createdBy` VARCHAR(255) NULL,
  	`modifiedBy` VARCHAR(255) NULL,
	PRIMARY KEY(`accountId`),
	UNIQUE(`accountId`, `email`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`otps` (
	`id` INT AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL,
	`otp` VARCHAR(255) NOT NULL,
	`expiry` VARCHAR(255) NOT NULL,
	`status` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`email`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`creators` (
	`id` INT AUTO_INCREMENT,
	`creatorId` VARCHAR(255) NOT NULL,
	`accountId` VARCHAR(255) NOT NULL,
	`userName` VARCHAR(255) NOT NULL,
  	`status` VARCHAR(255) NULL,
  	`createdOn` VARCHAR(255) NULL,
  	`lastModifiedOn` VARCHAR(255) NULL,
  	`createdBy` VARCHAR(255) NULL,
  	`modifiedBy` VARCHAR(255) NULL,
	PRIMARY KEY(`creatorId`),
	UNIQUE(`accountId`),
	FOREIGN KEY (`accountId`) REFERENCES accounts(`accountId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`creators-subscribers` (
	`id` INT AUTO_INCREMENT,
	`creatorId` VARCHAR(255) NOT NULL,
	`subscriberId` VARCHAR(255) NOT NULL,
  	`createdOn` VARCHAR(255) NULL,
  	`lastModifiedOn` VARCHAR(255) NULL,
  	`createdBy` VARCHAR(255) NULL,
  	`modifiedBy` VARCHAR(255) NULL,
	PRIMARY KEY(`creatorId, subscriberId`),
	FOREIGN KEY (`creatorId`) REFERENCES creators(`creatorId`)
	FOREIGN KEY (`subscriberId`) REFERENCES accounts(`accountId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`badges` (
	`id` INT AUTO_INCREMENT,
	`badgeId` VARCHAR(255) NOT NULL,
  	`name` VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS `afridol`.`creators-badges` (
	`id` INT AUTO_INCREMENT,
	`creatorId` VARCHAR(255) NOT NULL,
	`badgeId` VARCHAR(255) NOT NULL,
  	`createdOn` VARCHAR(255) NULL,
  	`lastModifiedOn` VARCHAR(255) NULL
	PRIMARY KEY(`creatorId, badgeId`),
	FOREIGN KEY (`creatorId`) REFERENCES creators(`creatorId`)
	FOREIGN KEY (`badgeId`) REFERENCES badges(`badgeId`)
);


CREATE TABLE IF NOT EXISTS `afridol`.`conversations` (
	`id` INT AUTO_INCREMENT,
	`conversationId` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`conversationId`)
);


CREATE TABLE IF NOT EXISTS `afridol`.`messages` (
	`id` INT AUTO_INCREMENT,
	`messsageId` VARCHAR(255) NOT NULL,
	`conversationId` VARCHAR(255) NOT NULL,
	`senderId` VARCHAR(255) NOT NULL,
  	`recieverId` VARCHAR(255) NULL,
  	`messageReference` VARCHAR(255) NULL,
  	`messsage` VARCHAR(255) NOT NULL,
  	`mediaStatus` VARCHAR(255) NOT NULL,
  	`createdOn` VARCHAR(255) NULL,
  	`lastModifiedOn` VARCHAR(255) NULL,
  	`createdBy` VARCHAR(255) NULL,
  	`modifiedBy` VARCHAR(255) NULL,
	PRIMARY KEY(`messsageId`),
	FOREIGN KEY (`conversationId`) REFERENCES conversations(`conversationId`)
	FOREIGN KEY (`senderId`) REFERENCES accounts(`accountId`)
	FOREIGN KEY (`recieverId`) REFERENCES accounts(`accountId`)
	FOREIGN KEY (`messageReference`) REFERENCES messages(`messageId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`conversations-members` (
	`id` INT AUTO_INCREMENT,
	`accountId` VARCHAR(255) NOT NULL,
	`conversationId` VARCHAR(255) NOT NULL,
  	`status` VARCHAR(255) NULL,
	`createdOn` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`accountId`, `conversationId`),
	FOREIGN KEY (`conversationId`) REFERENCES conversations(`conversationId`)
	FOREIGN KEY (`accountId`) REFERENCES accounts(`accountId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`posts` (
	`id` INT AUTO_INCREMENT,
	`postId` VARCHAR(255) NOT NULL,
	`creatorId` VARCHAR(255) NOT NULL,
	`text` VARCHAR(255) NOT NULL,
  	`status` VARCHAR(255) NULL,
  	`postType` VARCHAR(255) NULL,
  	`createdOn` VARCHAR(255) NULL,
  	`lastModifiedOn` VARCHAR(255) NULL,
  	`createdBy` VARCHAR(255) NULL,
  	`modifiedBy` VARCHAR(255) NULL,
	PRIMARY KEY(`postId`),
	FOREIGN KEY (`creatorId`) REFERENCES creators(`creatorId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`posts-medias` (
	`id` INT AUTO_INCREMENT,
	`mediaId` VARCHAR(255) NOT NULL,
	`postId` VARCHAR(255) NOT NULL,
	`url` VARCHAR(255) NOT NULL
	PRIMARY KEY(`mediaId`),
	FOREIGN KEY (`postId`) REFERENCES posts(`postId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`posts-likes` (
	`id` INT AUTO_INCREMENT,
	`postId` VARCHAR(255) NOT NULL,
	`accountId` VARCHAR(255) NOT NULL
	PRIMARY KEY(`postId`),
	FOREIGN KEY (`postId`) REFERENCES posts(`postId`),
	FOREIGN KEY (`accountId`) REFERENCES accounts(`accountId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`posts-comments` (
	`id` INT AUTO_INCREMENT,
	`commentId` VARCHAR(255) NOT NULL,
	`postId` VARCHAR(255) NOT NULL,
	`accountId` VARCHAR(255) NOT NULL,
  	`text` VARCHAR(255) NULL,
  	`createdOn` VARCHAR(255) NULL,
  	`lastModifiedOn` VARCHAR(255) NULL,
  	`createdBy` VARCHAR(255) NULL,
  	`modifiedBy` VARCHAR(255) NULL,
	PRIMARY KEY(`commentId`),
	FOREIGN KEY (`postId`) REFERENCES posts(`postId`),
	FOREIGN KEY (`accountId`) REFERENCES accounts(`accountId`)
);

CREATE TABLE IF NOT EXISTS `afridol`.`posts-comments-likes` (
	`id` INT AUTO_INCREMENT,
	`commentId` VARCHAR(255) NOT NULL,
	`accountId` VARCHAR(255) NOT NULL
	PRIMARY KEY(`commentId`, `accountId`),
	FOREIGN KEY (`commentId`) REFERENCES `posts-comments`(`commentId`),
	FOREIGN KEY (`accountId`) REFERENCES accounts(`accountId`)
);
