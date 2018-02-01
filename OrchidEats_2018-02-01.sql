# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.20)
# Database: OrchidEats
# Generation Time: 2018-02-01 19:13:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table chefs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chefs`;

CREATE TABLE `chefs` (
  `chef_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `food_handler` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `min_order` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_limit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pickup` tinyint(4) NOT NULL DEFAULT '0',
  `oe_delivery` tinyint(4) NOT NULL DEFAULT '1',
  `per_delivery` tinyint(4) NOT NULL DEFAULT '0',
  `chefs_user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`chef_id`),
  UNIQUE KEY `chefs_food_handler_unique` (`food_handler`),
  UNIQUE KEY `chefs_chefs_user_id_unique` (`chefs_user_id`),
  CONSTRAINT `chefs_chefs_user_id_foreign` FOREIGN KEY (`chefs_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `chefs` WRITE;
/*!40000 ALTER TABLE `chefs` DISABLE KEYS */;

INSERT INTO `chefs` (`chef_id`, `food_handler`, `min_order`, `order_limit`, `pickup`, `oe_delivery`, `per_delivery`, `chefs_user_id`, `created_at`, `updated_at`)
VALUES
	(1,'6443061','4','3',0,1,0,3,'2001-01-09 14:29:39','2004-12-15 21:22:26'),
	(2,'68825485','3','7',0,1,0,4,'1979-10-02 09:17:49','1972-08-03 14:59:04'),
	(3,'9437','2','9',0,1,0,6,'2014-06-12 15:10:03','1972-06-09 09:25:09'),
	(4,'771374833','0','3',0,1,0,14,'1977-12-31 05:00:05','1982-12-10 10:46:18'),
	(5,'5357','0','0',0,1,0,15,'1993-01-06 09:41:23','1972-03-04 06:23:06'),
	(6,'674856787','2','4',0,1,0,16,'1993-03-09 11:12:04','1971-01-27 06:44:06'),
	(7,'261668','4','7',0,1,0,17,'2002-03-12 03:44:51','1974-12-26 23:45:16'),
	(8,'481','9','6',0,1,0,18,'1977-02-15 16:46:29','1983-04-30 22:51:11'),
	(9,'733','6','3',0,1,0,19,'1989-12-11 16:52:14','1995-10-08 14:41:01'),
	(10,'18','3','1',0,1,0,20,'2010-12-22 17:33:52','1988-06-27 22:11:51');

/*!40000 ALTER TABLE `chefs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table deliveries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `deliveries`;

CREATE TABLE `deliveries` (
  `delivery_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `delivery_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(4) NOT NULL,
  `deliveries_order_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`delivery_id`),
  KEY `deliveries_deliveries_order_id_foreign` (`deliveries_order_id`),
  CONSTRAINT `deliveries_deliveries_order_id_foreign` FOREIGN KEY (`deliveries_order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;

INSERT INTO `deliveries` (`delivery_id`, `delivery_address`, `completed`, `deliveries_order_id`, `created_at`, `updated_at`)
VALUES
	(1,'7015 Lizzie Curve',0,1,'1982-02-28 15:03:41','2013-03-22 02:50:00'),
	(2,'15272 Pearl Ranch',0,2,'2009-04-06 14:01:45','1990-05-27 18:55:53'),
	(3,'170 Ritchie Manors',0,3,'2005-09-09 07:55:25','2000-09-09 23:40:06'),
	(4,'49403 Effertz Inlet',0,4,'2002-02-05 20:18:27','1972-02-02 09:30:04'),
	(5,'22547 Torphy Stravenue Apt. 433',0,5,'2003-12-01 20:25:07','2016-01-30 15:39:43'),
	(6,'1243 Schumm Canyon',0,6,'1985-05-05 02:52:41','1988-01-12 22:36:33'),
	(7,'3755 Rebekah Track Apt. 193',0,7,'1972-06-28 03:18:08','2011-12-03 20:37:17'),
	(8,'9361 Jacobs Pine',0,8,'1991-04-07 05:58:06','2008-08-01 11:47:05'),
	(9,'805 Willie Land',0,9,'2008-07-21 05:32:26','1982-02-21 22:16:47'),
	(10,'656 Karelle Trail Apt. 165',0,10,'2014-11-25 16:56:59','1997-08-19 14:00:40');

/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table diets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `diets`;

CREATE TABLE `diets` (
  `diets_chef_id` int(10) unsigned NOT NULL,
  `keto` tinyint(4) NOT NULL,
  `paleo` tinyint(4) NOT NULL,
  `high_fat` tinyint(4) NOT NULL,
  `low_carb` tinyint(4) NOT NULL,
  `high_protein` tinyint(4) NOT NULL,
  `vegan` tinyint(4) NOT NULL,
  `vegetarian` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `diets_diets_chef_id_foreign` (`diets_chef_id`),
  CONSTRAINT `diets_diets_chef_id_foreign` FOREIGN KEY (`diets_chef_id`) REFERENCES `chefs` (`chef_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `diets` WRITE;
/*!40000 ALTER TABLE `diets` DISABLE KEYS */;

INSERT INTO `diets` (`diets_chef_id`, `keto`, `paleo`, `high_fat`, `low_carb`, `high_protein`, `vegan`, `vegetarian`, `created_at`, `updated_at`)
VALUES
	(1,6,5,4,2,5,5,9,'1978-10-29 07:01:02','2007-01-24 06:41:25'),
	(2,2,6,5,3,4,3,4,'1995-03-29 17:57:40','1976-01-26 00:46:42'),
	(3,4,9,9,1,4,3,1,'2012-07-05 14:07:07','2012-06-23 16:32:09'),
	(4,8,9,3,2,4,2,3,'1997-01-01 01:40:44','1984-05-25 12:11:20'),
	(5,8,3,6,9,4,6,4,'1993-01-29 02:24:02','1986-07-27 21:04:42'),
	(6,9,3,0,8,9,9,7,'2002-03-23 08:11:02','1986-08-17 15:43:58'),
	(7,6,7,1,1,8,8,7,'1999-05-29 22:54:55','2005-02-20 22:26:18'),
	(8,0,6,1,0,6,0,9,'2010-10-04 00:24:13','2016-12-09 02:08:47'),
	(9,1,7,7,4,3,9,0,'1998-02-16 22:53:40','2006-04-29 11:14:57'),
	(10,3,9,8,7,2,3,5,'1978-03-31 20:13:04','1977-07-27 19:57:48');

/*!40000 ALTER TABLE `diets` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table meals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `meals`;

CREATE TABLE `meals` (
  `meal_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `calories` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `protein` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `carbs` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meals_chef_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `current_menu` tinyint(2) DEFAULT '0',
  PRIMARY KEY (`meal_id`),
  KEY `meals_meals_chef_id_foreign` (`meals_chef_id`),
  CONSTRAINT `meals_meals_chef_id_foreign` FOREIGN KEY (`meals_chef_id`) REFERENCES `chefs` (`chef_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;

INSERT INTO `meals` (`meal_id`, `rating`, `name`, `type`, `calories`, `protein`, `carbs`, `fat`, `description`, `price`, `photo`, `meals_chef_id`, `created_at`, `updated_at`, `current_menu`)
VALUES
	(1,3,'assumenda','voluptatem','5','4','6','5','Aut qui nisi magni. Rerum doloribus molestiae quia nihil. Ut ducimus rem ea asperiores maiores consequatur aut.','6','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/b2bde6b2fa04a18d2270b59903ce53e1.jpg',1,'1988-02-18 09:28:54','2010-07-11 00:37:24',NULL),
	(2,6,'est','est','4','0','8','7','Cumque voluptate accusamus itaque quis ut numquam. Sunt exercitationem aspernatur neque vel. Hic eos similique officiis exercitationem aut fuga pariatur magni.','8','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/0404896339a657387d53c56751cee88c.jpg',1,'1971-04-29 20:18:18','2003-11-26 17:59:47',NULL),
	(3,5,'aut','natus','4','8','1','9','Corrupti sit ducimus omnis sit sunt. Natus sed nesciunt quibusdam non dolore laudantium. Ab qui et quo vel voluptatum quia. Itaque dolor architecto maxime praesentium neque reiciendis porro.','8','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/e0e420c9a2d5e426af5fedd0943702b1.jpg',1,'1980-09-07 18:14:38','1994-07-25 12:34:21',NULL),
	(4,8,'magni','voluptas','7','0','3','4','Consequuntur dolorum recusandae ad cumque et. Itaque saepe dicta molestias similique. Sunt enim dolorem error sed ducimus.','4','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/089fa034c656ad05e1cf27253704a17f.jpg',1,'1999-10-29 04:57:03','1993-05-08 14:40:36',NULL),
	(5,9,'minus','fugit','1','1','2','2','Iure at eius nihil consequatur. Omnis omnis repellendus illum saepe distinctio quae. Quod dicta est temporibus excepturi optio reiciendis.','1','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/b66324b6b436c86e5afc704fe0971c2d.jpg',1,'1981-06-15 14:15:49','1975-12-03 11:27:22',NULL),
	(6,9,'repellat','aut','0','5','2','4','Commodi hic maxime natus debitis sit voluptatem sint. Eveniet eveniet dolor quam iusto ut vel. Nihil sed praesentium eligendi ratione perspiciatis.','0','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/75275fb1615fe1b39e42830cc749ec69.jpg',1,'1994-09-16 09:28:01','1981-01-19 21:54:41',NULL),
	(7,8,'nisi','voluptate','1','0','8','9','Facere corporis laborum eum. Voluptatum et recusandae sit optio necessitatibus veritatis. Omnis libero explicabo rerum nemo ex illo praesentium. Corrupti sunt eligendi tempora impedit.','9','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/c8550ba5df284ab8200d791182ebb8f3.jpg',1,'1970-09-11 14:15:24','2017-05-31 05:59:41',NULL),
	(8,3,'aliquam','aut','1','3','4','3','Consequatur alias quia placeat labore quod amet enim. Corporis iure alias nemo voluptatibus nesciunt sint modi est. Sit fuga architecto esse adipisci dicta vero.','2','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/e24d9706a2a2bc1bdf0030adfbd6e41a.jpg',1,'1998-10-30 15:44:09','1970-02-08 21:50:27',NULL),
	(9,9,'aut','magnam','9','1','3','2','Eum distinctio maiores recusandae accusantium reiciendis ea quibusdam molestiae. Rerum quos dignissimos fuga. Deserunt omnis assumenda ut. Molestiae enim magnam facere inventore.','4','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/e3d6f6926da6199e4dbb0ce6490d74c5.jpg',1,'1992-03-05 00:02:41','1992-08-21 04:03:15',NULL),
	(10,4,'error','at','2','9','2','2','Ullam molestiae omnis corrupti pariatur non quisquam omnis omnis. Aut et sequi iste rerum iste odit animi.','9','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/ccfdd75983fdd779779b2c1ce97c4588.jpg',1,'1998-01-13 08:50:15','2004-05-19 11:18:40',NULL);

/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `migration`, `batch`)
VALUES
	(51,'2014_10_12_000000_create_users_table',1),
	(52,'2018_01_08_000001_create_chefs_table',1),
	(53,'2018_01_08_000002_create_profiles_table',1),
	(54,'2018_01_08_000003_create_orders_table',1),
	(55,'2018_01_08_000004_create_ratings_table',1),
	(56,'2018_01_08_000005_create_meals_table',1),
	(57,'2018_01_08_000007_create_diets_table',1),
	(58,'2018_01_09_000008_create_stripes_table',1),
	(59,'2018_01_11_000009_create_order_details_table',1),
	(60,'2018_01_11_000010_create_deliveries_table',1),
	(61,'2018_01_14_171435_create_password_resets_table',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_details`;

CREATE TABLE `order_details` (
  `od_order_id` int(10) unsigned NOT NULL,
  `meal_details` text CHARACTER SET utf8mb4,
  `delivery_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_window` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `order_details_od_order_id_foreign` (`od_order_id`),
  CONSTRAINT `order_details_od_order_id_foreign` FOREIGN KEY (`od_order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;

INSERT INTO `order_details` (`od_order_id`, `meal_details`, `delivery_date`, `delivery_window`, `created_at`, `updated_at`)
VALUES
	(2,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:14','1984-01-04 00:17:17'),
	(5,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:12','1984-01-04 00:17:17'),
	(3,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:51','1984-01-04 00:17:17'),
	(4,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:52','1984-01-04 00:17:17'),
	(6,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:42','1984-01-04 00:17:17'),
	(7,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:32','1984-01-04 00:17:17'),
	(8,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:14','1984-01-04 00:17:17'),
	(9,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:33','1984-01-04 00:17:17'),
	(10,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:51','1984-01-04 00:17:17'),
	(1,'[{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"},{\"meal_id\":\"1\",\"meals_chef_id\":\"1\",\"user_id\":\"43\",\"quantity\":\"8\",\"price\":\"10\",\"name\":\"meal name\"}]','friday','4-8 pm','1982-03-09 23:48:18','1984-01-04 00:17:17');

/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_total` decimal(6,2) NOT NULL,
  `reviewed` tinyint(4) NOT NULL,
  `orders_user_id` int(10) unsigned NOT NULL,
  `orders_chef_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `completed` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `orders_orders_user_id_foreign` (`orders_user_id`),
  KEY `orders_orders_chef_id_foreign` (`orders_chef_id`),
  CONSTRAINT `orders_orders_chef_id_foreign` FOREIGN KEY (`orders_chef_id`) REFERENCES `chefs` (`chef_id`),
  CONSTRAINT `orders_orders_user_id_foreign` FOREIGN KEY (`orders_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;

INSERT INTO `orders` (`order_id`, `order_total`, `reviewed`, `orders_user_id`, `orders_chef_id`, `created_at`, `updated_at`, `completed`)
VALUES
	(1,111.00,0,2,1,'1987-01-17 15:51:31','1977-05-29 21:25:48',1),
	(2,111.00,0,2,1,'2007-07-18 16:30:14','1986-05-07 01:58:20',1),
	(3,111.00,1,2,1,'1982-04-13 09:33:43','1995-09-11 22:10:58',1),
	(4,111.00,0,4,1,'1983-04-03 22:32:39','1984-03-20 04:09:31',1),
	(5,111.00,0,5,1,'2004-01-13 16:18:31','2011-03-31 23:31:12',1),
	(6,111.00,0,6,1,'2000-08-17 18:16:43','2003-08-20 02:26:56',0),
	(7,111.00,0,2,1,'2008-10-11 16:32:13','1978-10-01 21:27:13',0),
	(8,111.00,0,2,1,'2016-06-29 12:47:37','1980-02-05 04:54:48',0),
	(9,111.00,0,2,1,'1975-09-16 21:50:28','2009-08-10 11:04:36',0),
	(10,111.00,0,2,1,'1983-03-16 20:21:42','1987-12-31 03:35:27',0);

/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table password_resets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiry` int(10) unsigned NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `password_resets_token_unique` (`token`),
  KEY `password_resets_user_id_foreign` (`user_id`),
  CONSTRAINT `password_resets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table profiles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `profiles`;

CREATE TABLE `profiles` (
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `prof_pic` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_note` tinyint(4) NOT NULL DEFAULT '1',
  `text_note` tinyint(4) NOT NULL DEFAULT '1',
  `profiles_user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `profiles_profiles_user_id_foreign` (`profiles_user_id`),
  CONSTRAINT `profiles_profiles_user_id_foreign` FOREIGN KEY (`profiles_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;

INSERT INTO `profiles` (`gender`, `dob`, `phone`, `address`, `zip`, `bio`, `prof_pic`, `email_note`, `text_note`, `profiles_user_id`, `created_at`, `updated_at`)
VALUES
	('male','1974-09-21 17:02:54','4','2507 Heidenreich Port','20834','Veniam ipsum explicabo veniam ut nihil. Tenetur nihil consectetur fugiat ea expedita. Autem aliquid sed ipsum unde dignissimos in ad. Molestiae aspernatur illo aut quo dolorem.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/1d4429cc1285a98fbd806753bd631bc7.jpg',7,6,1,'1989-04-09 22:27:18','2017-07-19 18:59:15'),
	('male','2004-12-10 06:02:48','333','2624 Bosco Extensions','66629','Asperiores omnis sit distinctio natus et cupiditate facilis. Et laborum accusamus et quidem.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/64834ab4d45064211272f4f234f6dc78.jpg',9,9,2,'1989-10-23 16:55:55','1988-05-23 22:23:37'),
	('male','1990-10-09 01:29:40','1680556','3261 Gislason Walks Suite 230','03986','Delectus in tempore ipsum quisquam repudiandae. Unde rerum natus blanditiis distinctio qui rerum ad. Ut maxime ab dolorem voluptas delectus odit aut.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/b2f3f0249a777d8f115a1c78dd221c32.jpg',8,6,3,'1982-05-29 23:16:21','1992-03-25 08:50:36'),
	('male','1982-12-25 20:10:26','5','92419 Oda Manor Suite 421','43135','Optio id aut quod. Provident dignissimos velit quos pariatur minima dolores. Tenetur est molestiae modi sit consequatur occaecati sed. Voluptatem magnam autem in totam laborum voluptas eum.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/2bfd29a7f9b88295165fc2825fc15884.jpg',1,1,4,'1979-02-08 11:13:48','2001-05-06 19:49:08'),
	('male','1979-05-22 20:50:19','538973','30673 Johnston Roads','11659-5805','Minima tempora molestiae id alias numquam id illum. Sequi est occaecati ducimus non molestiae fugit. Cumque accusantium dolor animi fuga maxime laborum dolores sunt.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/2159a8cdab3787ab8b198f69260f50d1.jpg',2,5,5,'2001-09-17 16:43:00','2012-01-07 10:46:00'),
	('male','2014-04-28 04:38:02','35012','4378 Lonie Lodge Suite 574','83092','Nihil explicabo est aut et. Et doloremque amet dolore quo. Facere omnis rem sapiente dolorem veritatis. Et culpa voluptates sit recusandae beatae.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/99fa72df8aa166bd65037223900cfea4.jpg',8,3,6,'1981-12-26 18:21:52','1980-11-01 22:20:01'),
	('male','2000-08-26 13:26:35','9623','6970 Bradtke Junctions Suite 983','13192-1067','Velit sit nam quas sunt. Reiciendis consequatur molestias autem debitis.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/0b47c2f2154d29e4be4cfabfaf407d08.jpg',0,5,7,'1984-11-20 22:35:31','2002-08-05 15:16:04'),
	('male','1988-04-20 07:08:29','27344','1923 Doyle Springs Apt. 166','75808','Non minima repellat explicabo ducimus ipsa ea. Autem minima omnis atque quisquam ducimus in ratione. Sed amet ipsum eum enim. Unde laborum cum velit enim beatae nesciunt.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/288b1028e9b56cdc623b4fad54c084cb.jpg',3,6,8,'2011-07-28 04:39:16','2007-03-24 06:52:45'),
	('male','1975-01-25 15:19:17','58959762','6634 Deckow Pass Apt. 883','18342','Qui consequatur consequatur qui et veritatis perferendis. Qui et illo dignissimos est ut odit ipsum minus. Voluptatem harum error iusto odit expedita recusandae.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/ff77dcdf38248a0e54419e94fccf1d76.jpg',7,5,9,'1996-08-15 13:47:42','1982-01-08 04:31:53'),
	('male','2008-07-15 02:53:34','19343624','703 Winnifred Roads','02844-8235','Cupiditate officiis culpa itaque qui officia. Quo cum perferendis praesentium dolor ea necessitatibus tenetur. Sint ea quis quae animi. Voluptatem at cumque et saepe labore repellat perferendis.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/8627be136cc00f103fbf9e7404c45227.jpg',9,3,10,'1972-06-20 20:34:19','1994-03-09 06:05:48'),
	('male','1974-04-19 07:24:07','788','4910 Tremblay Alley Apt. 145','22413-2286','Repudiandae quam fuga provident quia quia autem. Alias nam repellendus blanditiis. Officia aut est dignissimos dolorem ipsa totam dolor. Provident vel possimus id quisquam.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/a5fcc9e9e6dedbd129006c9b612ecd31.jpg',9,6,11,'1998-11-26 22:01:28','2003-09-01 15:29:06'),
	('male','2011-12-14 17:42:35','700518','7621 Paucek Forges Suite 334','31498','Officia occaecati voluptate aut quibusdam iusto sed deleniti perspiciatis. Minima occaecati provident cum qui quia molestiae similique.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/661e9b90a11fc0d1c4cf15891c99eedb.jpg',9,2,12,'1971-03-19 14:31:38','2016-11-03 09:48:03'),
	('male','2000-01-12 15:11:50','1301844','613 Koepp Shoal','85019-6951','Repellendus ut quas occaecati harum. Sit minima itaque quod aliquid optio aut rerum. Minus eos hic voluptas nisi.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/78df780d2ec4fc85f0e76a746817b634.jpg',3,1,13,'2016-05-05 12:36:33','1998-09-23 12:12:37'),
	('male','1973-05-07 03:01:04','3','5311 Jack Club Apt. 371','73486','Eius laudantium qui voluptatem aspernatur inventore perferendis. Eos voluptatibus tempore quia soluta voluptatem dolorum. Qui enim impedit aut animi. Iusto id sunt saepe tenetur.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/92c9b7420d6caed2e8c2c638a0ce115b.jpg',9,7,14,'1984-04-27 18:33:13','1978-12-26 16:46:26'),
	('male','1994-04-08 14:36:08','282042','161 Jaeden Ports Apt. 807','08510-5513','Eum corporis perspiciatis necessitatibus exercitationem rerum. Voluptatem beatae ipsum labore velit mollitia. Temporibus cumque sed neque est et totam.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/b97c0c1a4daa92293550be6dbcee3b3e.jpg',0,5,15,'1974-09-02 06:44:09','2004-04-28 08:53:15'),
	('male','2011-06-07 09:10:14','8092151','973 Destinee Hill','60650','Dolores iusto ut et et ipsum. Est et vero sapiente voluptas. Deleniti commodi ratione adipisci consectetur explicabo architecto rerum. Odio provident eos nihil dolore rerum.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/acfdab18719ff7e1f07ecc30bf6ad055.jpg',6,8,16,'1996-10-23 23:30:42','1998-05-14 00:31:07'),
	('male','2001-02-10 22:46:03','2827187','5809 Genevieve Heights','89007','Dolor quam nostrum minus dolorum. Dolorum minima aut excepturi. Voluptatum dolores sed quibusdam et. Et delectus eum enim nisi deserunt alias. Debitis quam sint et. Quam aspernatur nisi et nesciunt.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/f853c2df916e3c2e4fd39c781599bdbb.jpg',6,6,17,'1970-04-01 01:04:41','2012-01-25 06:43:43'),
	('male','2010-06-24 09:51:52','702847515','113 Kunde Rapid','90336-4502','Ipsa dolor asperiores et incidunt saepe sed. Et odit deserunt maiores cumque aliquid quibusdam temporibus. Provident laboriosam corporis asperiores quaerat dolor.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/86c2ce4614c117f935c11643a9d03cad.jpg',0,8,18,'1988-04-27 10:59:52','1996-11-13 17:29:42'),
	('male','2004-02-17 22:42:45','61243372','6735 Hagenes Valley','48695-1302','Rerum adipisci fuga repellendus voluptatem impedit. Sit rerum et reprehenderit voluptatem quis. Et blanditiis aut quas voluptates magnam quidem.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/216e54f91fb650e41fcfacc424cdea4d.jpg',4,0,19,'1995-01-02 16:03:38','1999-01-13 01:03:56'),
	('male','1990-11-07 21:05:08','44647835','6402 Hauck Tunnel Suite 161','18624-6604','Corrupti reprehenderit quia et error totam dolore maiores laudantium. Assumenda repellendus officiis quae harum id. Incidunt aspernatur suscipit alias laborum vel. Optio aut qui doloremque.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/63564d34f05d43d3c4f52babe4017ae7.jpg',2,6,20,'1974-01-01 08:09:23','1996-01-06 22:17:14'),
	('male','1970-08-02 15:56:00','1518','2921 Jast Prairie','22897','Neque delectus ipsam vitae facilis cupiditate reprehenderit. Possimus et sunt aliquid deserunt culpa. Corrupti cupiditate distinctio magnam est eligendi dolor quaerat.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/14089f2f6dca3fac77ce68430dda9d01.jpg',0,0,21,'1978-06-02 21:03:59','1998-08-25 23:24:50'),
	('male','1981-01-12 02:28:02','209098','74528 Collins Viaduct','80885','Blanditiis id voluptas dolores magnam vero commodi. Enim doloribus quod dolores mollitia. Dolor magni voluptatem repellendus quis tempora. Quaerat in numquam quod sed est pariatur dolorem cupiditate.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/8b6230110d13f0a628ef65ee6d1db931.jpg',3,3,22,'1990-11-18 06:48:58','2014-11-28 19:46:32'),
	('male','2012-06-05 12:16:21','8126','64671 Turner Prairie','35805','Numquam doloremque eum culpa quia accusamus. Nihil id rem id aut. Qui explicabo consequatur quia veniam vel. Consequatur molestiae soluta suscipit nihil veritatis culpa eum quos.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/142f3ce7b3e5f7af39fbfd901def1082.jpg',0,0,23,'1977-04-08 00:14:23','1982-06-14 00:40:56'),
	('male','2014-03-13 01:50:17','98378','3866 Hoppe Cape Suite 016','70194-8197','Vero alias vel minima doloribus. Nisi qui vitae ad non earum quia. Inventore vitae sint et velit. Aut sunt rem nemo qui voluptatem nobis sed quae. Porro veniam aliquam a laboriosam ut.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/c0b7b2e9d5c176cb224fc4e66ef582ac.jpg',8,9,24,'1997-09-06 17:40:14','1994-06-20 08:15:36'),
	('male','1996-05-10 09:30:46','7135569','557 Schimmel Tunnel','19596-1875','Quidem corrupti enim amet. Optio voluptas nobis necessitatibus qui quia. Placeat ducimus id eligendi et asperiores at. Quia debitis et hic soluta nisi odio.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/aa610cb94ec9d02a9e308a740fc05fb5.jpg',4,5,25,'1981-03-13 10:11:55','1979-02-21 08:42:27'),
	('male','1982-10-09 15:00:41','6642111','1403 Bartell Squares','06563','Voluptatem qui voluptas nihil. Aliquam optio ratione excepturi accusantium ut non ad quis. Nemo sunt neque dignissimos non odio doloremque.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/f7045213149d9966b0c24190261a7235.jpg',7,8,26,'2018-01-05 14:34:25','1977-10-08 17:03:25'),
	('male','1999-04-02 16:07:49','21078','6188 Keebler Walks Suite 889','09727','Velit laboriosam impedit aut quod dolore debitis. Iste et nulla ipsam facere et quia. Fugiat dolorem pariatur eveniet veniam voluptate voluptas quidem.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/f6d7cb751963cab6776824096454250c.jpg',0,8,27,'1976-10-06 04:24:03','1983-06-09 20:47:55'),
	('male','1998-11-16 04:55:46','262877','19206 Johns Knolls Suite 814','53261','Aut repellendus dolor ad corrupti atque. Animi corporis quae officiis quia sit nemo possimus. Cum reprehenderit omnis illo ut suscipit enim. Eligendi aliquam ut qui quo nemo.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/0ff0f58496495b719a0ace620f04c9d5.jpg',6,3,28,'1970-02-28 21:39:33','1974-01-09 18:33:43'),
	('male','1977-12-16 05:51:21','2540','31592 Trantow Shore Apt. 851','56959-0660','Minus maxime itaque ut quod sed sunt. Voluptatem magni veniam mollitia et qui porro quo. Laudantium doloremque iste asperiores occaecati iure dignissimos vel.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/6be7070e0dffad4cbb72b77b89deaac6.jpg',3,3,29,'1977-06-02 12:36:59','2004-01-24 11:00:07'),
	('male','1993-04-25 09:03:34','53989','17756 Mylene Land','61001-9598','Eaque distinctio blanditiis cupiditate earum amet assumenda. Adipisci dicta cumque occaecati possimus doloribus. Autem qui rerum beatae nesciunt ex qui. Maxime repellat laudantium et dolor.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/a93ae776e017e8c14676a4adea37e54a.jpg',9,6,30,'1981-05-24 17:51:24','1996-08-16 13:50:43'),
	('male','2008-10-28 08:21:06','1144463','1154 Daugherty Cliffs Apt. 422','93488','Est fuga maiores eveniet qui voluptate. Et nam expedita a dolores dolor sunt nostrum. Consectetur voluptas pariatur quibusdam rerum dolorem.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/63068d9389bf57c47d56276020c16c36.jpg',4,1,31,'2013-10-05 15:31:39','1984-09-25 21:41:50'),
	('male','1978-04-16 03:55:05','76147822','185 Merl Corners Apt. 254','50379-1869','Nemo explicabo quasi itaque dignissimos voluptatum. Ut et est expedita et officia dolore repellat. Atque officiis accusantium rerum unde sit eos. Adipisci esse qui enim eum ab sunt perferendis.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/b91ff9a0201e3b509699ec35541f931a.jpg',6,4,32,'1976-02-22 18:48:22','1995-09-30 08:28:08'),
	('male','1997-07-31 22:48:00','52','252 Tiana Drive','68528-8312','Quis neque laudantium voluptas dolorem dignissimos nobis perferendis. Animi cum rerum et unde sequi excepturi eaque.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/3aada330784653bf62c7d99ceda3592c.jpg',9,8,33,'2006-04-21 15:18:22','1999-09-03 23:35:13'),
	('male','1993-05-19 14:29:18','59082585','3440 Lane Prairie Suite 597','15111-9369','Vero nemo non cumque odio. Fugiat nobis cum animi eos occaecati. Repudiandae ea molestiae exercitationem sequi sed odit voluptatem. Explicabo labore enim amet exercitationem.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/8a48c7a53d78bb25abe5db98f87ed861.jpg',8,8,34,'1995-11-27 07:45:34','1993-10-10 06:34:20'),
	('male','1971-05-31 02:49:07','525482237','91736 Korey Stravenue Apt. 765','06760-5059','Sapiente recusandae fugit corporis odit. Similique officiis et minus. Ut itaque dolor at ad debitis. Et a quibusdam sit corrupti nemo ullam et.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/38fee235716ae5873794f6d74dc8f77f.jpg',3,5,35,'2014-10-01 15:51:53','1999-10-01 23:28:12'),
	('male','2003-06-15 08:16:13','40411617','87115 Victor Tunnel Suite 318','09630-4568','Aperiam culpa voluptas ut qui commodi nostrum. Et occaecati fugiat quia natus enim ipsa. Nesciunt ut quam sapiente qui. In aliquam qui eligendi sint.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/49b4545ddb3ee99ed2ad07dbf6f12960.jpg',5,9,36,'1977-02-03 18:48:00','1994-02-24 09:02:54'),
	('male','2006-06-30 18:44:26','6966469','81550 Corwin Stream Suite 443','99248','Iusto architecto quasi nostrum sunt a voluptatem. A itaque omnis cum. Soluta et eveniet fugit. Doloremque odio ad ut quia eum deserunt. Dolore hic sed neque aut eligendi sunt et.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/5e72c5ef2cbd71317eba53088815fd19.jpg',3,5,37,'2011-11-11 21:53:26','1990-06-15 16:37:00'),
	('male','1973-01-04 17:25:52','83722935','424 Bernadette Club','77968-7444','Vel voluptate debitis labore magni in expedita. Saepe quia esse veritatis. Sunt placeat est qui sit perspiciatis quam. Et quibusdam fugiat eligendi.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/b81ca89cf543664537ad72ebf178b737.jpg',0,9,38,'1995-01-30 16:52:02','2007-06-27 14:21:30'),
	('male','2011-12-06 21:27:55','40369263','949 Medhurst Cliffs Suite 082','70100-0696','Exercitationem consequatur necessitatibus quia atque. Architecto ut mollitia ut quaerat at et eveniet. Ut qui dolore corrupti soluta est.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/7cb0223cac22eae1e6a79656568d5f11.jpg',4,4,39,'1992-01-03 19:58:00','1980-11-17 17:09:02'),
	('male','1980-11-28 07:07:32','80991','8075 Gregorio Viaduct','28707-5932','Quas qui labore iure aut assumenda perspiciatis asperiores. Laboriosam quia dolorem laborum iste et ut non.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/c1e5d4da39a1024290f586bd56c4a27d.jpg',2,6,40,'1999-06-16 16:22:37','1977-10-16 03:29:00'),
	('male','1996-01-28 22:32:12','37996','991 Paolo Street Suite 027','87723-2444','Voluptatibus unde ut at nostrum. Reiciendis a sit reiciendis possimus explicabo. Sapiente nesciunt repellat sit aliquam vitae aut veniam nobis. Sed minima quia ea quia rerum.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/dfac650928854459afd2f031b6d4b94f.jpg',9,5,41,'2015-01-09 05:37:06','1978-07-03 13:18:29'),
	('male','1996-10-28 02:15:46','89546571','709 Colt Harbor','85551','Necessitatibus corrupti minima voluptatem est aspernatur deserunt autem. Quos tempore dolorem atque quis. Quam amet sed neque nihil deserunt amet.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/76ddeb65aca2d5e599ccc3a3f652525b.jpg',5,3,42,'2009-04-03 20:03:33','2012-04-15 22:43:46'),
	('male','2014-08-04 06:26:40','398656191','49902 Yvette Fall Apt. 127','88015-7157','Ut voluptates dolor et blanditiis modi quibusdam quidem. Quos cupiditate animi similique. Aperiam molestiae alias qui rerum animi.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/945544f642a7c6bff86d7cd1dea8a8ef.jpg',7,3,43,'2010-01-19 05:46:47','1984-01-22 13:13:24'),
	('male','1976-08-03 13:09:54','9870435','4995 Christine Forge Suite 533','87402-1262','Qui nostrum illum placeat quis minus sed. Porro aspernatur aut qui. Magni quia sit consequuntur incidunt nisi doloribus. Vel illo sapiente ullam amet sint esse.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/a9bc233729814d6ad4e2f072238e6d37.jpg',4,4,44,'1994-12-26 18:21:09','1971-05-17 11:24:31'),
	('male','2009-03-31 17:26:47','14756','451 Arlene Grove','24148','Eos aut iure et modi voluptas. Sit consequatur eum maxime quae fugiat. Placeat voluptas blanditiis architecto omnis. Qui nostrum ipsam beatae consequatur quisquam. Vero numquam aut sed soluta aut.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/b71ff2810bd7df152d18d5cebc5d73fd.jpg',0,0,45,'1990-05-07 12:39:01','1993-12-20 15:09:41'),
	('male','1981-07-12 14:45:49','876469','609 Roger Station','41552','Repudiandae quia aspernatur voluptatem. Itaque eum quos repudiandae neque autem eligendi.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/3dbb88ce22c042a1cf4fd3d576cde5de.jpg',7,3,46,'1986-06-25 16:09:43','1979-02-12 16:32:27'),
	('male','1996-07-18 19:22:09','9325142','791 Gislason Rue','09361','Omnis nihil voluptas unde doloremque. Perspiciatis voluptas quis saepe voluptas ipsam. Fuga et quibusdam et eveniet quaerat veritatis. Quo harum ut deserunt nam.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/47d31442bd259263d6309ab938d2cd1c.jpg',1,3,47,'1980-01-17 06:36:20','2013-04-22 19:19:46'),
	('male','1975-10-13 00:28:05','332883','89278 Smitham Unions','26497','Molestiae voluptatum ut omnis omnis totam. Quasi magnam exercitationem expedita amet. Et ut quia mollitia velit nobis.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/a4ab65ab08a6ac03d2cf1174bceffaf8.jpg',0,1,48,'1988-11-13 09:59:50','2013-07-02 21:03:38'),
	('male','2006-02-25 03:56:37','0','78271 Lelia Garden Apt. 873','33536','Voluptatem dicta non ipsam id. Quia doloribus dolor neque tempore. Blanditiis voluptatum repellat et dignissimos. Non tenetur totam quasi veniam.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/cf894f74f3421948856b3cc93a105c3c.jpg',7,7,49,'1986-02-04 06:09:48','2016-03-17 02:22:34'),
	('male','1987-08-19 07:54:33','102','185 Cruickshank Gateway','55297','Rerum iusto et hic laudantium quam dolorem vero qui. Quaerat velit alias omnis asperiores aperiam. Id ex reprehenderit fuga dolorum aut.','/var/folders/_3/h3mrn51j3vzgsjtkbd4yg1pr0000gn/T/407521218a6c95d44458ae6af536e013.jpg',8,9,50,'1993-04-10 02:53:58','2000-09-05 05:40:24');

/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ratings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
  `rating_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` int(11) NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `chef_feedback` text COLLATE utf8mb4_unicode_ci,
  `ratings_chef_id` int(10) unsigned NOT NULL,
  `ratings_user_id` int(10) unsigned NOT NULL,
  `ratings_order_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `ratings_ratings_user_id_foreign` (`ratings_user_id`),
  KEY `ratings_ratings_chef_id_foreign` (`ratings_chef_id`),
  KEY `ratings_ratings_order_id_foreign` (`ratings_order_id`),
  CONSTRAINT `ratings_ratings_chef_id_foreign` FOREIGN KEY (`ratings_chef_id`) REFERENCES `chefs` (`chef_id`),
  CONSTRAINT `ratings_ratings_order_id_foreign` FOREIGN KEY (`ratings_order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `ratings_ratings_user_id_foreign` FOREIGN KEY (`ratings_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;

INSERT INTO `ratings` (`rating_id`, `rating`, `body`, `chef_feedback`, `ratings_chef_id`, `ratings_user_id`, `ratings_order_id`, `created_at`, `updated_at`)
VALUES
	(1,8,'Exercitationem qui excepturi quod placeat. Aut perspiciatis modi hic minus nulla doloremque. Sed quia sunt sed.','Ullam eos totam voluptatibus temporibus et. Earum ipsum cumque illum earum exercitationem rerum. Magnam ut tenetur aut ut unde occaecati.',1,2,1,'1976-10-01 03:51:36','1999-04-27 06:18:51'),
	(2,4,'Nemo et labore ut dicta eveniet amet id. Eaque et nesciunt cum. Ea eum dicta asperiores earum illum similique distinctio. Possimus tempore aliquid eum doloremque et et nesciunt.','Optio qui quo beatae et. Id et quia est. Laborum quibusdam veniam blanditiis quo harum maxime at quas. Provident nobis ex qui quia dolores.',1,2,2,'1975-12-23 03:12:32','2013-08-27 07:12:04'),
	(3,9,'Sint dicta velit alias repellat. Eveniet voluptas voluptatem ea omnis quam. Et adipisci adipisci nisi quis. Adipisci veritatis sed et error consequatur.','Et ea at aliquid aliquam sit est ut. Cum placeat a rerum culpa. Est consequuntur qui sint nulla modi quis. Aut officiis non deleniti.',1,44,3,'1990-02-28 08:05:29','1994-07-24 02:16:05'),
	(4,3,'Ut ut omnis et nihil facere odit. In aut eaque suscipit exercitationem dolorum dolorem. Blanditiis pariatur dolore repellendus.','Qui repellat cum impedit voluptas ipsam est qui explicabo. Nostrum omnis ut vel saepe itaque rem. Omnis aut dolor molestias nesciunt magni ab dolores odio. Earum qui ut eum cum quibusdam omnis.',1,4,4,'1995-08-14 16:39:53','1978-07-25 05:07:02'),
	(5,8,'Dolor sint ducimus qui animi totam. Et repellendus commodi dolores quod debitis. Est provident eligendi numquam et inventore. Ut ipsum nihil corporis aspernatur quaerat nam.','Atque quod facilis quis corporis eos et. Magni quasi consectetur quia ut rerum sit ipsum. Nihil dolores voluptatum occaecati sit eum. Deserunt alias iste non sit placeat.',1,5,5,'1986-03-20 16:33:27','2001-07-06 16:05:14'),
	(6,5,'Qui earum hic rerum eveniet id in harum. Et nemo ratione recusandae atque. Culpa quaerat vero officiis sit.','Ducimus quos vitae dolores nulla quia culpa. Dolor velit voluptatem aliquam fugiat quia. Impedit voluptate tempore quis error vitae.',1,6,6,'2002-04-23 04:37:11','1995-02-17 00:23:45'),
	(7,9,'Ea aut fugiat quibusdam reiciendis. Nesciunt aspernatur non numquam eos qui quos consequatur.','Sit laboriosam ullam perspiciatis ipsum consequatur ut. Consequuntur sint optio nihil. Aut quae molestias et incidunt delectus aut aut.',1,7,7,'2009-04-08 16:09:52','2008-12-15 21:15:39'),
	(8,8,'Aut consequatur qui in beatae commodi optio. Ratione sed quasi autem expedita voluptates perferendis. Illum nostrum eum nulla quia laudantium neque esse.','Maiores ut repellendus quo est ipsam eius. Recusandae porro nihil repudiandae omnis. Quam sint debitis atque aliquid atque. Corrupti incidunt cum omnis ut.',1,8,8,'2002-11-27 11:37:12','1996-03-27 12:28:12'),
	(9,1,'Dolores sint veniam voluptas molestias. Atque est eaque suscipit iste quasi soluta et nisi. Consequatur officiis qui deleniti delectus ipsam vel at. Vel vel rerum accusamus optio eligendi.','Et placeat et et voluptatem labore magni. Nesciunt rerum consequuntur fugiat et itaque dolorem. Dolorum officiis qui sapiente velit commodi mollitia. Voluptates magni voluptatem officia dolorem.',9,9,9,'1982-06-09 02:03:34','1970-01-22 00:19:02'),
	(10,8,'Vel nesciunt asperiores quae. Quis doloribus velit suscipit sunt ea molestiae provident. Consequuntur reprehenderit est ea assumenda in.','Eos dolores quibusdam cupiditate earum. Harum quia illum rerum ipsam. Magnam non sit laudantium eos.',10,10,10,'1984-08-21 16:47:41','2012-07-26 09:50:11'),
	(15,5,'fadf','afdfad',1,2,1,'2018-02-01 04:39:30','2018-02-01 04:39:30'),
	(16,4,'fdf','adfd',1,2,1,'2018-02-01 04:40:10','2018-02-01 04:40:10'),
	(17,5,'fadf','fadf',1,2,1,'2018-02-01 04:42:38','2018-02-01 04:42:38'),
	(18,5,'fdfd','fdaf',1,2,1,'2018-02-01 04:44:50','2018-02-01 04:44:50');

/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stripes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stripes`;

CREATE TABLE `stripes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stripes_user_id_index` (`user_id`),
  CONSTRAINT `stripes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_chef` tinyint(4) NOT NULL DEFAULT '0',
  `stripe_user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `is_chef`, `stripe_user_id`, `remember_token`, `created_at`, `updated_at`)
VALUES
	(1,'chandler.kilback@example.com','$2y$10$icgvqvalbVkob.Jk/yO8ZO59z5zII1sABbFC4AnjVhPNS4njP2JGa','Carole','Larson',0,NULL,'JMCXwukvzY','2014-10-17 18:41:28','2011-03-17 14:31:51'),
	(2,'hrowe@example.com','$2y$10$sEI3prkaR355Vpd9EToWDu9npITKv/dAIr90Lp29ykKVatXWF011q','Noelia','Turner',0,NULL,'An52jm5xI3','1998-02-10 02:24:35','2005-01-25 23:58:11'),
	(3,'lawson07@example.net','$2y$10$p55fCZWr50lJAfSCNHVNpOz0wyUjKg8PfqYEKy9p1DKhkYxMFzJRm','Penelope','Goyette',1,NULL,'nQ5wwB36bh','1986-09-11 10:50:47','2018-02-01 05:24:01'),
	(4,'pcarroll@example.org','$2y$10$0r.L8JbAiQ/6J5ThbdbZfONuJwdU9YpiLRDsLKh93YX9vgtdK6Zle','Brent','Zemlak',0,NULL,'KLmITBNR1H','2008-09-16 06:18:25','2006-04-01 03:56:49'),
	(5,'kshlerin.tressa@example.net','$2y$10$piuL7D9lCfKcEqpDHGCVMeAqDj0cd5XnuLWH6yey1rUIjBz1E5Rdu','Fernando','Boyer',0,NULL,'ej78dhS1y0','1978-09-10 12:54:55','2012-08-19 12:27:51'),
	(6,'cjacobson@example.net','$2y$10$0L6vgffuVZRkUhX0.wI0MOMyln9cN1XH419tOgpFJwv6ta5/gerxi','Freddie','Shanahan',0,NULL,'A6X8MqQ0X0','2009-01-24 05:58:56','1986-04-30 16:13:01'),
	(7,'bernice84@example.net','$2y$10$0vwinG4h.4NMp3QH3CvCrudNAbe1jt1P8gEWiulTMvZQIy6ENU1GK','Rosa','Herzog',0,NULL,'LUhEm4HbQv','1993-07-20 11:27:31','1980-11-09 19:37:19'),
	(8,'qryan@example.net','$2y$10$O32D1O18lxZRtJSacFCxeu2A.QNGdgh.58eebjGZ3TAAvvPAnjWnC','Taurean','Hartmann',0,NULL,'UFL3ys6Dza','2009-01-17 19:31:31','1980-04-25 19:59:40'),
	(9,'astrid27@example.com','$2y$10$R9GvUGGlh35wrGhxsHM1BeGMjTjfA33bxQgromdjNx4TlccK9IL0m','Adrain','Kautzer',0,NULL,'HKTukVRmat','1971-02-25 08:12:25','1979-01-21 11:59:55'),
	(10,'johnston.paris@example.org','$2y$10$qmZ5h/sfX03eganDe9xKlOKqDvnIpS70QNlMOJhgN1kHr1YsJ9BLW','Amina','Nienow',0,NULL,'5jEdDgczDd','1984-06-08 01:54:02','1981-10-17 08:19:57'),
	(11,'jritchie@example.com','$2y$10$lpF/na0WpbIPlf9pkjw5XOK27iiC53v/0xwmaZmczDavyqrAfU6we','Jaqueline','Treutel',0,NULL,'N0SmE9OrV8','1981-07-13 15:47:52','1976-03-15 13:40:50'),
	(12,'ymann@example.org','$2y$10$CHJ3XIkYi3j5BxSh1LVWquAGcPyXYWy2E/vYfnbVesdvkvZeX3wL2','Odessa','Ryan',0,NULL,'thy3uKD6V2','1991-05-11 06:22:48','1972-01-11 11:43:48'),
	(13,'claudie32@example.org','$2y$10$eQFqd5Q7222YzfouOPHHe.N/wUA9mWubZum0OxiKatZae0s3rAOQC','Lew','Ledner',0,NULL,'NtEqC40hJT','1988-01-05 08:08:33','2008-02-22 06:04:27'),
	(14,'nash.lakin@example.com','$2y$10$L6S1wara8S4HAQKvMXv3reozle8JShLC3arCPImUMsdDgXHAQx2fK','Rachael','O\'Keefe',0,NULL,'7aDoMMwE2E','2003-10-14 09:16:02','2017-04-22 06:23:32'),
	(15,'padberg.efren@example.org','$2y$10$5doq3gfvFjbLnMaZocHnR.cQIQqUO4cOkwC6CIHSTs4az5PYCzhgO','Raymundo','Schmeler',0,NULL,'xAUUNmXe9B','1989-06-09 17:44:06','1978-07-04 20:38:52'),
	(16,'roy.borer@example.com','$2y$10$3r8bDuGegNwV2iRLkAl77erPqIE4ejn6qisAQAOoyfS5klWIMBAJa','Marcia','King',0,NULL,'5SN0fl8fHw','1986-07-03 14:35:52','1977-10-20 13:04:14'),
	(17,'runte.dario@example.org','$2y$10$q0Y1MXWZoYm8xpNhwZ3JIO4tnbpnEkqR/nz6CJ9UTn.0/U78jB6fq','Noemi','Crona',0,NULL,'wfCuS0pjPT','2012-08-14 22:48:34','2000-06-09 21:06:34'),
	(18,'carlee.gerlach@example.net','$2y$10$c6Tk7BKJWiM8PUQrhrZeJeDtRboAYkXjxiYw.g6B/r8R8CcjDlaNW','Christelle','Olson',0,NULL,'WJ7MghI6LH','1987-11-02 15:24:04','2017-08-04 03:05:01'),
	(19,'sheidenreich@example.org','$2y$10$vu9hY8N8YVTaluq60shu4u4kuyldYolf5VddhVLB1MohFHLzRpkmS','Stewart','Dicki',0,NULL,'ADIhTfF1K9','1995-10-18 22:10:39','1998-09-28 15:27:09'),
	(20,'hintz.kathleen@example.com','$2y$10$x6E2pjJyAWVS6rLTNs/.Leb3xQ9vznPkH5LdedugbnFbJLTXRMrgi','Cody','Okuneva',0,NULL,'2rTwsy0mTz','1974-04-25 15:23:19','2006-01-23 01:32:08'),
	(21,'mabel.collier@example.net','$2y$10$aaOnmvZ3pqRXkYIEmvD3wear4jD3EJbJAxFWhoTQ8.DcgR0SbOrlO','Greyson','Schimmel',0,NULL,'Kgi0kmSpkt','1990-05-17 19:48:31','1992-04-09 11:06:19'),
	(22,'angela.schneider@example.net','$2y$10$h8L4TM5P14/GJuVp.mWA8.d9HYd4y97Ig.tZY3ziV1c0pNktwVc1S','Albert','Metz',0,NULL,'KwhVrlkoRC','2005-07-02 22:36:43','2000-07-09 07:48:29'),
	(23,'dwolf@example.org','$2y$10$GfyhrVKNhvDMbnY0bsoZyuJpjUQWOHq30H/pw0LO8jxAiHWo/R1aC','Fae','Runolfsdottir',0,NULL,'cFkrUZPNcP','1970-12-27 23:43:05','1987-07-17 19:09:55'),
	(24,'samara.nikolaus@example.net','$2y$10$3s2uLd1KhZWIY4fuNI9x6en4GzEU3duSxlJ7SWUN2.v7P3TR1IM2C','Okey','Jacobs',0,NULL,'N4jkkvr0Hp','1988-11-16 17:09:26','1971-06-28 07:39:57'),
	(25,'gwhite@example.com','$2y$10$tRFF.3yEiCID3tOzau2ED.4gg15armK9vevNIDvCA5G9jmiX5LHYa','Constantin','Kemmer',0,NULL,'rcKDo1fnYC','2012-05-20 21:56:09','1984-05-18 05:31:40'),
	(26,'dylan85@example.net','$2y$10$EuU5EOHhO.Cd7xZGiasioORLLqhjU7uzlIXZTFiPjsyzcxoUxGDUG','Guillermo','Haley',0,NULL,'MN41Rf6aBQ','1972-03-19 16:23:58','1997-04-19 19:25:46'),
	(27,'wolf.vada@example.org','$2y$10$PCYiP2oG38rBOS1aizaU7OG4QAaXixv0eJY2a1hpkecSavBcAy3Um','Astrid','Littel',0,NULL,'LbpzN3JZaU','1983-02-11 07:45:35','1979-05-04 22:30:34'),
	(28,'ernser.abdiel@example.com','$2y$10$.Xu.rV01ktvUtI424pDdBOeiWy1W2wsAm/Kfv43x1XLUwVf/ZSv8G','London','Shields',0,NULL,'jRNjfuGizM','1979-11-30 04:33:38','1995-04-13 22:07:01'),
	(29,'rhea74@example.com','$2y$10$.kdKmzkj.8y0h45noQmJlO5BuFsXhjKTOv9oCbsTyaL2pDZRy0o5S','Blair','Ernser',0,NULL,'xwvU9XxhVh','1975-07-14 20:38:54','1995-05-31 19:40:16'),
	(30,'alana.hilpert@example.org','$2y$10$mVjbVgTIftN7IxKQGv2g.OQQ8bHtBAy4.iTMU9UuOGmZpGXPZ8c9C','Tessie','Frami',0,NULL,'tYZBxcHm4J','1970-04-01 20:55:08','1992-01-29 11:08:30'),
	(31,'carley23@example.org','$2y$10$8w2SL8xYfcLV/sboGVRUsecTCOx71ZfKtoFGt3cPvJ0vAGG5g4aIS','Neha','Lueilwitz',0,NULL,'pGhS2qyQ0s','2006-09-04 03:22:51','2011-01-28 16:45:19'),
	(32,'marilie09@example.org','$2y$10$g3xjlranb2/RS8cawFMCVOIuDHBwbRmQ7M.jB7rOaCw3bMp8YwuwC','Elton','Cummerata',0,NULL,'6v2xWralfk','1972-04-28 10:48:34','1987-11-27 14:02:15'),
	(33,'morton01@example.org','$2y$10$87tJ1DlR08lyxlNZcaZ84.PgC68svmEnqkxedppZzqPG0SVSU/gza','Carrie','Nikolaus',0,NULL,'5rHZJTksVQ','1999-02-01 19:09:35','1970-07-06 22:12:28'),
	(34,'oreilly.elissa@example.net','$2y$10$Qa1cCtHWFdNrf8IT8/9ez.w6tmnAHlwzQ63QUbJy.65plBA21qLu6','Jennifer','Haley',0,NULL,'Jmf0cu1HMP','1987-11-27 02:07:02','1995-03-21 03:04:54'),
	(35,'huels.ceasar@example.org','$2y$10$8VuoexUua9pyVrktZ/oQTOEjUWrxm9NNDMoJv60Gt9hAmAo1Qzf/e','Bret','Runolfsdottir',0,NULL,'HF3R46ZkAM','2001-12-31 17:06:53','2007-09-03 02:45:24'),
	(36,'fschiller@example.org','$2y$10$F.WoI8spw/1lfeuvQJ7y5ueH88AZS8JEIdCvmCHIjjOprqlyEDS7a','Otto','Mohr',0,NULL,'InfDszkWtd','2006-03-21 04:10:24','1986-12-02 16:11:50'),
	(37,'taryn65@example.net','$2y$10$.a9baLQAVx3oF2Y5McqO5u7JyRan4PVGL1FQcLxhPrkHfnTVxQMmu','Shea','Conroy',0,NULL,'9tG7Aube5a','1980-03-11 13:11:55','1975-06-17 00:32:26'),
	(38,'ulices.oconner@example.com','$2y$10$KGIYzlaKaOWghzapxCUbXePleqCUjf1iUl4GfslA7IxLUMC2yvQNO','Lambert','Harris',0,NULL,'9YQtAv96HI','1991-11-03 08:59:06','2017-05-08 23:06:10'),
	(39,'corkery.libbie@example.org','$2y$10$NOgEqdslLv80ZovA7x5zWOd8kB9tVTTNoMs.3sZzlYEyypgaW0Qv.','Cassandra','Volkman',0,NULL,'JC7sX2Vojg','1986-10-26 12:01:04','1990-01-19 18:13:45'),
	(40,'christ94@example.org','$2y$10$3hUmjg75x7aII4laBJ76IuYcbu2g52Kj/NHPh0UmmXHYhX89I.9Yi','Priscilla','Bednar',0,NULL,'5nT4mgdksV','1973-07-09 08:32:11','1978-07-12 02:01:59'),
	(41,'klein.patience@example.com','$2y$10$FkRHn0U5ve2o.2ZZbF30eOYyHgWkrA76AQu7n0btxHmSwJKHvghga','Flavie','Ledner',0,NULL,'d5U8BSOBi1','1971-01-19 19:25:08','2014-01-11 21:07:36'),
	(42,'kennedy05@example.com','$2y$10$vf0KxVtHgqztozgjbkA1eeDQecWDyQP77FbMRUU/vKLyrNUah3vkW','Conor','Purdy',0,NULL,'4L8wxNQ4p4','1997-01-26 09:03:53','1972-07-15 17:16:13'),
	(43,'rgulgowski@example.com','$2y$10$QvgTUVmaI2UhMNPI5E9vt.4c8Jwxd28GOykRR1o0pHHJ6B4.rGqQi','Wilhelmine','D\'Amore',0,NULL,'obqHh1lQp3','2004-12-10 15:40:43','1974-04-02 14:59:40'),
	(44,'araceli21@example.com','$2y$10$6wMpC4Jk6hG4GujpBcPDD.HxFkFF56VOA/AAUVyb4CT/BBqY1QdOK','Lou','Mertz',0,NULL,'5ZHI3lrt8W','1993-03-01 11:04:39','1973-03-16 15:11:09'),
	(45,'jast.shyanne@example.org','$2y$10$K.LkTer1Ungb/KVeknzGWOs9ZbrTM6WVGB3Gl46/P6EI3OphJRaRG','Hazle','Heathcote',0,NULL,'C2YF33ycdF','2000-06-27 17:06:42','1988-06-09 11:17:52'),
	(46,'lamont.jast@example.org','$2y$10$Xf1u1HPXzsJo7cthKCOujepcU1gQYa7zkllCyJaLXDnam3LsP4hsa','Geoffrey','Wisozk',0,NULL,'4EoVHzWPiq','2006-11-12 16:11:17','2002-08-29 15:58:43'),
	(47,'jamar.west@example.net','$2y$10$Ej4w9F8zRo652pFe/J7o2.aYphX0dnwouHT5WeeiXtkZaGBJQ7yNS','Richie','McCullough',0,NULL,'vDE3uoFbZO','1995-09-09 12:51:20','2004-01-29 22:21:35'),
	(48,'pmertz@example.net','$2y$10$Ccu7eC8gbq.7BqiAknYuWO9hoJLSrc79Ii7.REMknlRJHvucTFCyG','Daron','Halvorson',0,NULL,'NLzndZdY7I','2003-05-22 07:17:38','2009-06-05 21:03:26'),
	(49,'heaney.glennie@example.com','$2y$10$46/TnwtQ.90PUZShHH4dK.DTJ2lUdv39GnGxzO0x2zngkuZuqL6dG','Mandy','Harris',0,NULL,'8zw1Io11zX','1980-08-11 15:28:38','1973-07-06 14:56:56'),
	(50,'qheathcote@example.com','$2y$10$RPMGuQEvFBXszZwhMS9ba.AK0smJptlxUvYKOku/3WF.xw84KnSKu','Ceasar','Jast',0,NULL,'FHmdPydH6P','1972-05-24 02:21:27','1983-12-19 13:02:08');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
