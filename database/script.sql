CREATE SCHEMA IF NOT EXISTS `db_alphacode` DEFAULT CHARACTER SET utf8 ;
USE `db_alphacode` ;

CREATE TABLE IF NOT EXISTS `db_alphacode`.`tbl_contacts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `birth_date` DATE NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `profession` VARCHAR(256) NOT NULL,
  `phone` VARCHAR(15) NULL,
  `cellphone` VARCHAR(20) NOT NULL,
  `has_whatsapp` TINYINT NULL DEFAULT 0,
  `email_notifications` TINYINT NULL DEFAULT 0,
  `sms_notifications` TINYINT NULL DEFAULT 0, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
INSERT INTO tbl_contacts (
	name,
	birth_date,
    email,
    profession,
    phone,
    cellphone,
    has_whatsapp,
    email_notifications,
    sms_notifications

) 
VALUES (
	"Rafael Oliveira de Souza",
    '2006-05-04',
    "rafael@gmail.com",
    "Desenvolvedor Web",
    null,
    "11999999999",
    1,
    0,
    0
), (
	"Letícia Pacheco dos Santos",
    '2003-10-03',
    "leticia@gmail.com",
    "Desenvolvedora Web",
    null,
    "11999999999",
    1,
    1,
    0
);