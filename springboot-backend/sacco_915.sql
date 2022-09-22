/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 10.4.24-MariaDB : Database - sacoo_management_system
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sacoo_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `sacoo_management_system`;

/*Table structure for table `employee_role` */

DROP TABLE IF EXISTS `employee_role`;

CREATE TABLE `employee_role` (
  `id` bigint(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `employee_role` */

insert  into `employee_role`(`id`,`role_name`) values 
(1,'executive'),
(2,'manager'),
(3,'stuff'),
(4,'volunteer'),
(5,'user');

/*Table structure for table `employees` */

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `employees` */

insert  into `employees`(`id`,`email_id`,`role_id`,`first_name`,`last_name`,`password`) values 
(1,'incredgex@sacco.com',1,'Leo','Aikawa','test'),
(2,'markhansen@sacco.com',2,'Mark','Hansen','test'),
(3,'harry@sacco.com',2,'Harry','Wang','test'),
(4,'iwanegor@sacco.com',4,'Iwan','Negor','test'),
(5,'student@sacco.com',5,'student','Nam','test'),
(6,'teacher@sacco.com',5,'teacher','Tam','test');

/*Table structure for table `loan_approve` */

DROP TABLE IF EXISTS `loan_approve`;

CREATE TABLE `loan_approve` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `loan_id` int(11) NOT NULL,
  `rdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4;

/*Data for the table `loan_approve` */

insert  into `loan_approve`(`id`,`user_id`,`loan_id`,`rdate`) values 
(50,6,50,NULL),
(51,4,50,NULL),
(52,4,51,NULL),
(53,5,51,NULL),
(54,5,52,NULL),
(55,2,52,NULL),
(56,2,51,NULL),
(57,3,51,NULL),
(58,3,52,NULL);

/*Table structure for table `loan_log` */

DROP TABLE IF EXISTS `loan_log`;

CREATE TABLE `loan_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `approve_id` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `edate` varchar(255) DEFAULT NULL,
  `rdate` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

/*Data for the table `loan_log` */

insert  into `loan_log`(`id`,`user_id`,`approve_id`,`amount`,`edate`,`rdate`,`state`) values 
(50,'1',NULL,'1000','2025-02-16','2022-09-15 23:31:29',NULL),
(51,'6',NULL,'300','2026-06-03','2022-09-15 23:32:11',NULL),
(52,'4',NULL,'5000','2023-03-02','2022-09-15 23:32:59',NULL),
(53,'3',NULL,'5000','2024-02-01','2022-09-15 23:34:59',NULL);

/*Table structure for table `loan_number_setting` */

DROP TABLE IF EXISTS `loan_number_setting`;

CREATE TABLE `loan_number_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `number` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `loan_number_setting` */

insert  into `loan_number_setting`(`id`,`role_id`,`number`) values 
(1,1,2),
(2,2,2),
(3,3,3),
(4,4,4),
(9,5,4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
