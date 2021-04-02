CREATE TABLE `country` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `short` varchar(255)
);

CREATE TABLE `prov` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `short` varchar(255),
  `country` int
);

CREATE TABLE `city` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `short` varchar(255),
  `prov` int
);

CREATE TABLE `access` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `short` varchar(255),
  `about` varchar(255)
);

CREATE TABLE `family_relation` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `store` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255),
  `phone` varchar(255),
  `fax` varchar(255),
  `address` varchar(255),
  `city` int,
  `prov` int,
  `country` int,
  `postal` varchar(255),
  `logo` varchar(255),
  `branch` varchar(255),
  `active` boolean DEFAULT true,
  `created` datetime DEFAULT (now()),
  `updated` datetime
);

CREATE TABLE `admin` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `fname` varchar(255),
  `lname` varchar(255),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255),
  `store` varchar(255),
  `active` boolean DEFAULT true,
  `access` int,
  `admin` varchar(255),
  `created` datetime DEFAULT (now()),
  `updated` datetime
);

CREATE TABLE `family` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` datetime DEFAULT (now()),
  `updated` datetime
);

CREATE TABLE `customer` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `fname` varchar(255),
  `lname` varchar(255),
  `email` varchar(255),
  `hphone` varchar(255),
  `cphone` varchar(255),
  `wphone` varchar(255),
  `address` varchar(255),
  `city` int,
  `prov` int,
  `country` int,
  `postal` varchar(255),
  `store` varchar(255),
  `family` varchar(255),
  `family_relation` int,
  `plan` boolean DEFAULT false,
  `active` boolean DEFAULT true,
  `created` datetime DEFAULT (now()),
  `updated` datetime
);

ALTER TABLE `prov` ADD FOREIGN KEY (`country`) REFERENCES `country` (`id`);

ALTER TABLE `city` ADD FOREIGN KEY (`prov`) REFERENCES `prov` (`id`);

ALTER TABLE `store` ADD FOREIGN KEY (`city`) REFERENCES `city` (`id`);

ALTER TABLE `store` ADD FOREIGN KEY (`prov`) REFERENCES `prov` (`id`);

ALTER TABLE `store` ADD FOREIGN KEY (`country`) REFERENCES `country` (`id`);

ALTER TABLE `store` ADD FOREIGN KEY (`branch`) REFERENCES `store` (`id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`store`) REFERENCES `store` (`id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`access`) REFERENCES `access` (`id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`admin`) REFERENCES `admin` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`city`) REFERENCES `city` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`prov`) REFERENCES `prov` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`country`) REFERENCES `country` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`store`) REFERENCES `store` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`family`) REFERENCES `family` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`family_relation`) REFERENCES `family_relation` (`id`);
