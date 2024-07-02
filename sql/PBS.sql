CREATE DATABASE IF NOT EXISTS `personal-budget-system`;


CREATE TABLE IF NOT EXISTS `personal-budget-system`.`users` (
	`id` VARCHAR(255) NOT NULL,
  	`username` VARCHAR(255) NOT NULL,
  	`password` VARCHAR(255) NULL,
  	`email` VARCHAR(255) NULL,
  	`role` VARCHAR(255) NOT NULL,
  	`status` VARCHAR(255) NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`email`)
);

CREATE TABLE IF NOT EXISTS `personal-budget-system`.`records` (
	`id` VARCHAR(255) NOT NULL,
	`userId` VARCHAR(255) NOT NULL,
	`date` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`category` VARCHAR(255) NOT NULL,
	`amount` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY (`userId`) REFERENCES users(`id`)

);
