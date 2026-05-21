-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2026 at 10:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

CREATE TABLE `tbl_logs` (
  `LID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `action` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `truck_info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_logs`
--

INSERT INTO `tbl_logs` (`LID`, `UID`, `email`, `Created_at`, `action`, `status`, `truck_info`) VALUES
(70, 1, 'stgoadrian24@gmail.com', '2026-05-16 14:14:48', 'Rent', 'Failed', NULL),
(71, 1, 'stgoadrian24@gmail.com', '2026-05-16 14:15:25', 'Rent', 'Success', NULL),
(72, 3, 'Andrie@gmail.com', '2026-05-16 14:16:31', 'Rent', 'Failed', NULL),
(73, 3, 'Andrie@gmail.com', '2026-05-16 14:17:00', 'Rent', 'Failed', NULL),
(74, 3, 'Andrie@gmail.com', '2026-05-16 14:17:07', 'Rent', 'Success', NULL),
(75, 3, 'Andrie@gmail.com', '2026-05-16 14:17:45', 'Rent', 'Failed', NULL),
(76, 3, 'Andrie@gmail.com', '2026-05-16 14:21:01', 'Rent', 'Failed', NULL),
(77, 3, 'Andrie@gmail.com', '2026-05-16 14:21:16', 'Rent', 'Success', NULL),
(78, 3, 'Andrie@gmail.com', '2026-05-16 14:21:23', 'Cancel Order', 'Success', NULL),
(79, 3, 'Andrie@gmail.com', '2026-05-16 14:23:16', 'Log out', 'Success', NULL),
(80, 20, 'jane@gmail.com', '2026-05-16 14:23:57', 'SignUp', 'Success', NULL),
(81, 20, 'jane@gmail.com', '2026-05-16 14:24:34', 'Rent', 'Success', NULL),
(82, 20, 'jane@gmail.com', '2026-05-16 14:24:43', 'Cancel Order', 'Success', NULL),
(83, 20, 'jane@gmail.com', '2026-05-16 14:25:22', 'Rent', 'Success', NULL),
(84, 20, 'jane@gmail.com', '2026-05-16 14:25:35', 'Cancel Order', 'Success', NULL),
(85, 20, 'jane@gmail.com', '2026-05-16 14:25:45', 'Log out', 'Success', NULL),
(86, 20, 'jane@gmail.com', '2026-05-16 14:26:56', 'Rent', 'Success', NULL),
(87, 20, 'jane@gmail.com', '2026-05-16 14:29:23', 'Log out', 'Success', NULL),
(88, 3, 'Andrie@gmail.com', '2026-05-16 14:29:40', 'Rent', 'Success', NULL),
(89, 3, 'Andrie@gmail.com', '2026-05-16 14:31:34', 'Log out', 'Success', NULL),
(90, 20, 'jane@gmail.com', '2026-05-16 14:32:30', 'Rent', 'Success', NULL),
(91, 20, 'jane@gmail.com', '2026-05-16 14:37:55', 'Log out', 'Success', NULL),
(92, 20, 'jane@gmail.com', '2026-05-16 14:58:54', 'Log out', 'Success', NULL),
(93, 3, 'Andrie@gmail.com', '2026-05-16 15:13:56', 'Log out', 'Success', NULL),
(94, 20, 'jane@gmail.com', '2026-05-16 15:14:39', 'Rent', 'Success', NULL),
(95, 20, 'jane@gmail.com', '2026-05-16 15:18:36', 'Log out', 'Success', NULL),
(96, 3, 'Andrie@gmail.com', '2026-05-16 15:19:18', 'Log out', 'Success', NULL),
(106, 20, 'jane@gmail.com', '2026-05-16 16:25:09', 'Rent', 'Success', NULL),
(107, 20, 'jane@gmail.com', '2026-05-16 16:25:17', 'Log out', 'Success', NULL),
(108, 20, 'jane@gmail.com', '2026-05-16 16:41:50', 'Log out', 'Success', NULL),
(109, 3, 'Andrie@gmail.com', '2026-05-16 16:48:21', 'Rent', 'Success', NULL),
(110, 3, 'Andrie@gmail.com', '2026-05-16 16:49:49', 'Log out', 'Success', NULL),
(111, 3, 'Andrie@gmail.com', '2026-05-16 16:53:14', 'Log out', 'Success', NULL),
(112, 3, 'Andrie@gmail.com', '2026-05-16 16:54:25', 'Log out', 'Success', NULL),
(113, 6, 'marcky@gmail.com', '2026-05-16 17:10:43', 'Rent', 'Success', NULL),
(114, 6, 'marcky@gmail.com', '2026-05-16 17:11:18', 'Cancel Order', 'Success', NULL),
(115, 6, 'marcky@gmail.com', '2026-05-16 17:11:40', 'Rent', 'Success', NULL),
(116, 6, 'marcky@gmail.com', '2026-05-16 17:11:47', 'Cancel Order', 'Success', NULL),
(117, 6, 'marcky@gmail.com', '2026-05-16 17:13:33', 'Log out', 'Success', NULL),
(118, 6, 'marcky@gmail.com', '2026-05-16 17:14:49', 'Rent', 'Success', NULL),
(119, 6, 'marcky@gmail.com', '2026-05-16 17:14:57', 'Cancel Order', 'Success', NULL),
(120, 6, 'marcky@gmail.com', '2026-05-16 17:16:03', 'Rent', 'Success', NULL),
(121, 6, 'marcky@gmail.com', '2026-05-16 17:16:12', 'Cancel Order', 'Success', NULL),
(122, 6, 'marcky@gmail.com', '2026-05-16 17:16:19', 'Log out', 'Success', NULL),
(123, 6, 'marcky@gmail.com', '2026-05-16 17:17:35', 'Rent', 'Success', NULL),
(124, 6, 'marcky@gmail.com', '2026-05-16 17:17:46', 'Rent', 'Success', NULL),
(125, 6, 'marcky@gmail.com', '2026-05-16 17:17:58', 'Rent', 'Success', NULL),
(126, 1, 'stgoadrian24@gmail.com', '2026-05-16 17:18:27', 'Log out', 'Success', NULL),
(127, 1, 'stgoadrian24@gmail.com', '2026-05-16 17:20:54', 'Log out', 'Success', NULL),
(128, 6, 'marcky@gmail.com', '2026-05-17 14:04:42', 'Rent', 'Failed', NULL),
(129, 6, 'marcky@gmail.com', '2026-05-17 14:04:53', 'Rent', 'Success', NULL),
(130, 6, 'marcky@gmail.com', '2026-05-17 14:05:08', 'Cancel Order', 'Success', NULL),
(131, 6, 'marcky@gmail.com', '2026-05-17 14:24:47', 'Log out', 'Success', NULL),
(132, 6, 'marcky@gmail.com', '2026-05-17 14:41:27', 'Rent', 'Success', NULL),
(133, 6, 'marcky@gmail.com', '2026-05-17 14:51:28', 'Log out', 'Success', NULL),
(134, 6, 'marcky@gmail.com', '2026-05-18 03:42:43', 'Rent', 'Success', NULL),
(135, 6, 'marcky@gmail.com', '2026-05-18 03:44:34', 'Rent', 'Success', NULL),
(136, 1, 'stgoadrian24@gmail.com', '2026-05-18 03:45:42', 'Log out', 'Success', NULL),
(137, 1, 'stgoadrian24@gmail.com', '2026-05-18 03:45:44', 'Log out', 'Success', NULL),
(138, 6, 'marcky@gmail.com', '2026-05-18 03:56:37', 'Log out', 'Success', NULL),
(139, 6, 'marcky@gmail.com', '2026-05-18 03:57:12', 'Rent', 'Success', NULL),
(140, 1, 'stgoadrian24@gmail.com', '2026-05-18 04:01:33', 'Rent', 'Success', NULL),
(141, 1, 'stgoadrian24@gmail.com', '2026-05-18 04:03:55', 'Log out', 'Success', NULL),
(142, 6, 'marcky@gmail.com', '2026-05-18 04:04:29', 'Rent', 'Success', NULL),
(143, 6, 'marcky@gmail.com', '2026-05-18 04:23:30', 'Log out', 'Success', NULL),
(144, 6, 'marcky@gmail.com', '2026-05-18 05:00:25', 'Log out', 'Success', NULL),
(145, 6, 'marcky@gmail.com', '2026-05-18 14:29:59', 'Log out', 'Success', NULL),
(146, 7, 'jhon@gmail.com', '2026-05-18 14:31:52', 'Log out', 'Success', NULL),
(147, 6, 'marcky@gmail.com', '2026-05-18 14:32:07', 'Log out', 'Success', NULL),
(148, 3, 'Andrie@gmail.com', '2026-05-18 14:34:20', 'Log out', 'Success', NULL),
(149, 6, 'marcky@gmail.com', '2026-05-18 14:34:52', 'Log out', 'Success', NULL),
(150, 1, 'stgoadrian24@gmail.com', '2026-05-18 14:35:22', 'Log out', 'Success', NULL),
(151, 6, 'marcky@gmail.com', '2026-05-18 14:37:11', 'Log out', 'Success', NULL),
(152, 7, 'jhon@gmail.com', '2026-05-18 14:39:23', 'Log out', 'Success', NULL),
(153, 6, 'marcky@gmail.com', '2026-05-18 14:39:38', 'Log out', 'Success', NULL),
(154, 3, 'Andrie@gmail.com', '2026-05-18 14:42:44', 'Rent', 'Success', NULL),
(155, 1, 'stgoadrian24@gmail.com', '2026-05-18 14:44:31', 'Log out', 'Success', NULL),
(156, 1, 'stgoadrian24@gmail.com', '2026-05-18 14:45:21', 'Log out', 'Success', NULL),
(157, 7, 'jhon@gmail.com', '2026-05-18 14:47:07', 'Log out', 'Success', NULL),
(158, 6, 'marcky@gmail.com', '2026-05-18 14:48:29', 'Log out', 'Success', NULL),
(159, 1, 'stgoadrian24@gmail.com', '2026-05-18 14:49:26', 'Log out', 'Success', NULL),
(160, 6, 'marcky@gmail.com', '2026-05-18 14:50:04', 'Log out', 'Success', NULL),
(161, 6, 'marcky@gmail.com', '2026-05-18 14:53:29', 'Log out', 'Success', NULL),
(162, 6, 'marcky@gmail.com', '2026-05-18 14:54:21', 'Log out', 'Success', NULL),
(163, 6, 'marcky@gmail.com', '2026-05-18 14:55:56', 'Log out', 'Success', NULL),
(164, 1, 'stgoadrian24@gmail.com', '2026-05-18 14:56:46', 'Log out', 'Success', NULL),
(165, 1, 'stgoadrian24@gmail.com', '2026-05-18 15:13:07', 'Log out', 'Success', NULL),
(166, 1, 'stgoadrian24@gmail.com', '2026-05-18 15:13:17', 'Rent', 'Success', NULL),
(167, 1, 'stgoadrian24@gmail.com', '2026-05-18 15:14:49', 'Log out', 'Success', NULL),
(168, 6, 'marcky@gmail.com', '2026-05-18 15:18:00', 'Log out', 'Success', NULL),
(169, 1, 'stgoadrian24@gmail.com', '2026-05-18 15:22:51', 'Log out', 'Success', NULL),
(170, 1, 'stgoadrian24@gmail.com', '2026-05-19 13:54:11', 'Log out', 'Success', NULL),
(171, 6, 'marcky@gmail.com', '2026-05-19 13:55:37', 'Rent', 'Success', NULL),
(172, 6, 'marcky@gmail.com', '2026-05-19 13:55:46', 'Cancel Order', 'Success', NULL),
(173, 6, 'marcky@gmail.com', '2026-05-19 14:07:38', 'Log out', 'Success', NULL),
(174, 6, 'marcky@gmail.com', '2026-05-19 14:25:36', 'Log out', 'Success', NULL),
(175, 6, 'marcky@gmail.com', '2026-05-19 14:33:36', 'Log out', 'Success', NULL),
(176, 6, 'marcky@gmail.com', '2026-05-19 15:24:29', 'Rent', 'Success', NULL),
(177, 6, 'marcky@gmail.com', '2026-05-19 15:24:48', 'Cancel Order', 'Success', NULL),
(178, 6, 'marcky@gmail.com', '2026-05-19 15:25:48', 'Log out', 'Success', NULL),
(179, 6, 'marcky@gmail.com', '2026-05-19 15:27:53', 'Log out', 'Success', NULL),
(180, 6, 'marcky@gmail.com', '2026-05-19 15:31:32', 'Log out', 'Success', NULL),
(181, 1, 'stgoadrian24@gmail.com', '2026-05-19 15:40:16', 'Log out', 'Success', NULL),
(182, 1, 'stgoadrian24@gmail.com', '2026-05-19 16:07:02', 'Log out', 'Success', NULL),
(183, 3, 'Andrie@gmail.com', '2026-05-20 00:07:27', 'Rent', 'Success', NULL),
(184, 3, 'Andrie@gmail.com', '2026-05-20 00:13:25', 'Rent', 'Success', NULL),
(185, 3, 'Andrie@gmail.com', '2026-05-20 01:38:12', 'Log out', 'Success', NULL),
(186, 6, 'marcky@gmail.com', '2026-05-20 02:05:19', 'Rent', 'Success', NULL),
(187, 6, 'marcky@gmail.com', '2026-05-20 02:06:51', 'Rent', 'Success', NULL),
(188, 6, 'marcky@gmail.com', '2026-05-20 02:08:17', 'Rent', 'Success', NULL),
(189, 6, 'marcky@gmail.com', '2026-05-20 02:10:38', 'Rent', 'Success', NULL),
(190, 6, 'marcky@gmail.com', '2026-05-20 02:13:12', 'Rent', 'Success', NULL),
(191, 6, 'marcky@gmail.com', '2026-05-20 02:18:38', 'Rent', 'Success', NULL),
(192, 6, 'marcky@gmail.com', '2026-05-20 02:56:13', 'Log out', 'Success', NULL),
(193, 6, 'marcky@gmail.com', '2026-05-20 02:58:45', 'Rent', 'Success', NULL),
(194, 1, 'stgoadrian24@gmail.com', '2026-05-20 03:01:55', 'Log out', 'Success', NULL),
(195, 1, 'stgoadrian24@gmail.com', '2026-05-20 03:03:51', 'Log out', 'Success', NULL),
(196, 1, 'stgoadrian24@gmail.com', '2026-05-20 03:04:53', 'Rent', 'Success', NULL),
(197, 1, 'stgoadrian24@gmail.com', '2026-05-20 03:08:00', 'Log out', 'Success', NULL),
(198, 6, 'marcky@gmail.com', '2026-05-20 05:07:26', 'Log out', 'Success', NULL),
(199, 9, 'redmi@gmail.com', '2026-05-20 05:13:02', 'Rent', 'Success', NULL),
(200, 9, 'redmi@gmail.com', '2026-05-20 05:14:51', 'Log out', 'Success', NULL),
(201, 21, 'albertjansantos@gmail.com', '2026-05-20 05:16:32', 'SignUp', 'Success', NULL),
(202, 21, 'albertjansantos@gmail.com', '2026-05-20 05:17:44', 'Rent', 'Success', NULL),
(203, 9, 'redmi@gmail.com', '2026-05-20 05:20:31', 'Rent', 'Success', NULL),
(204, 9, 'redmi@gmail.com', '2026-05-20 05:21:10', 'Rent', 'Success', NULL),
(205, 9, 'redmi@gmail.com', '2026-05-20 05:21:35', 'Log out', 'Success', NULL),
(206, 22, 'zed@gmail.com', '2026-05-20 05:22:00', 'SignUp', 'Success', NULL),
(207, 22, 'zed@gmail.com', '2026-05-20 05:22:38', 'Rent', 'Success', NULL),
(208, 22, 'zed@gmail.com', '2026-05-20 05:25:29', 'Rent', 'Success', NULL),
(209, 22, 'zed@gmail.com', '2026-05-20 05:29:47', 'Log out', 'Success', NULL),
(210, 22, 'zed@gmail.com', '2026-05-20 05:39:23', 'Rent', 'Failed', NULL),
(211, 22, 'zed@gmail.com', '2026-05-20 05:39:33', 'Rent', 'Success', NULL),
(212, 6, 'marcky@gmail.com', '2026-05-20 05:45:23', 'Log out', 'Success', NULL),
(213, 6, 'marcky@gmail.com', '2026-05-20 05:45:26', 'Log out', 'Success', NULL),
(214, 3, 'Andrie@gmail.com', '2026-05-20 05:46:11', 'Rent', 'Success', NULL),
(215, 3, 'Andrie@gmail.com', '2026-05-20 05:49:41', 'Rent', 'Success', NULL),
(216, 3, 'Andrie@gmail.com', '2026-05-20 05:54:16', 'Log out', 'Success', NULL),
(217, 6, 'marcky@gmail.com', '2026-05-20 08:31:58', 'Log out', 'Success', NULL),
(218, 22, 'zed@gmail.com', '2026-05-20 08:33:02', 'Rent', 'Success', NULL),
(219, 6, 'marcky@gmail.com', '2026-05-20 08:37:25', 'Log out', 'Success', NULL),
(220, 6, 'marcky@gmail.com', '2026-05-20 08:39:37', 'Log out', 'Success', NULL),
(221, 6, 'marcky@gmail.com', '2026-05-20 08:39:52', 'Log out', 'Success', NULL),
(222, 6, 'marcky@gmail.com', '2026-05-20 08:40:26', 'Rent', 'Success', NULL),
(223, 14, 'alexandrieabon12@gmail.com', '2026-05-21 02:42:48', 'Rent', 'Success', NULL),
(224, 14, 'alexandrieabon12@gmail.com', '2026-05-21 02:44:04', 'Rent', 'Success', NULL),
(225, 6, 'marcky@gmail.com', '2026-05-21 03:00:22', 'Log out', 'Success', NULL),
(226, 6, 'marcky@gmail.com', '2026-05-21 03:01:16', 'Log out', 'Success', NULL),
(227, 22, 'zed@gmail.com', '2026-05-21 03:03:19', 'Rent', 'Success', NULL),
(228, 6, 'marcky@gmail.com', '2026-05-21 03:08:02', 'Log out', 'Success', NULL),
(229, 22, 'zed@gmail.com', '2026-05-21 03:09:45', 'Rent', 'Success', NULL),
(230, 1, 'stgoadrian24@gmail.com', '2026-05-21 03:30:32', 'Log out', 'Success', NULL),
(231, 14, 'alexandrieabon12@gmail.com', '2026-05-21 03:35:41', 'Rent', 'Failed', NULL),
(232, 14, 'alexandrieabon12@gmail.com', '2026-05-21 03:36:20', 'Rent', 'Success', NULL),
(233, 6, 'marcky@gmail.com', '2026-05-21 05:12:12', 'Rent', 'Success', NULL),
(234, 6, 'marcky@gmail.com', '2026-05-21 05:13:15', 'Cancel Order', 'Success', NULL),
(235, 6, 'marcky@gmail.com', '2026-05-21 05:13:41', 'Rent', 'Success', NULL),
(236, 6, 'marcky@gmail.com', '2026-05-21 05:13:49', 'Cancel Order', 'Success', NULL),
(237, 6, 'marcky@gmail.com', '2026-05-21 05:23:56', 'Rent', 'Success', NULL),
(238, 6, 'marcky@gmail.com', '2026-05-21 05:24:40', 'Cancel Order', 'Success', NULL),
(239, 6, 'marcky@gmail.com', '2026-05-21 05:25:03', 'Rent', 'Success', NULL),
(240, 6, 'marcky@gmail.com', '2026-05-21 05:32:34', 'Cancel Order', 'Success', NULL),
(241, 6, 'marcky@gmail.com', '2026-05-21 05:32:37', 'Log out', 'Success', NULL),
(242, 23, 'jun@gmail.com', '2026-05-21 05:46:26', 'SignUp', 'Success', NULL),
(243, 23, 'jun@gmail.com', '2026-05-21 05:51:10', 'Log out', 'Success', NULL),
(244, 23, 'jun@gmail.com', '2026-05-21 05:52:12', 'Log out', 'Success', NULL),
(245, 14, 'alexandrieabon12@gmail.com', '2026-05-21 05:57:00', 'Rent', 'Success', NULL),
(246, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:08:18', 'Rent', 'Success', NULL),
(247, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:12:14', 'Log out', 'Success', NULL),
(248, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:23:04', 'Rent', 'Success', NULL),
(249, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:25:00', 'Rent', 'Success', NULL),
(250, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:29:26', 'Rent', 'Success', NULL),
(251, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:41:10', 'Rent', 'Success', NULL),
(252, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:42:48', 'Rent', 'Success', NULL),
(253, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:43:20', 'Rent', 'Success', NULL),
(254, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:44:04', 'Rent', 'Success', NULL),
(255, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:50:13', 'Log out', 'Success', NULL),
(256, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:52:15', 'Log out', 'Success', NULL),
(257, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:52:16', 'Log out', 'Success', NULL),
(258, 24, 'alex@gmail.com', '2026-05-21 06:53:44', 'SignUp', 'Success', NULL),
(259, 14, 'alexandrieabon12@gmail.com', '2026-05-21 06:55:26', 'Rent', 'Success', NULL),
(260, 14, 'alexandrieabon12@gmail.com', '2026-05-21 07:29:34', 'Rent', 'Success', 'IZUZU - UST 411'),
(261, 14, 'alexandrieabon12@gmail.com', '2026-05-21 07:34:40', 'Rent', 'Success', 'IZUZU - URV 177'),
(262, 14, 'alexandrieabon12@gmail.com', '2026-05-21 07:35:49', 'Rent', 'Success', 'IZUZU - URV 177'),
(263, 14, 'alexandrieabon12@gmail.com', '2026-05-21 07:36:25', 'Rent', 'Success', 'IZUZU - 023209'),
(264, 14, 'alexandrieabon12@gmail.com', '2026-05-21 07:37:17', 'Rent', 'Success', 'IZUZU - UST 411'),
(265, 14, 'alexandrieabon12@gmail.com', '2026-05-21 07:39:27', 'Rent', 'Failed', 'IZUZU - RGW 900'),
(266, 14, 'alexandrieabon12@gmail.com', '2026-05-21 07:59:39', 'Log out', 'Success', 'undefined - undefined'),
(267, 14, 'alexandrieabon12@gmail.com', '2026-05-21 08:01:09', 'Rent', 'Success', 'IZUZU - RGW 900'),
(268, 14, 'alexandrieabon12@gmail.com', '2026-05-21 08:03:09', 'Rent', 'Failed', 'IZUZU - 023209'),
(269, 14, 'alexandrieabon12@gmail.com', '2026-05-21 08:03:16', 'Rent', 'Failed', 'IZUZU - 023209'),
(270, 14, 'alexandrieabon12@gmail.com', '2026-05-21 08:03:30', 'Rent', 'Success', 'IZUZU - 023209');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notif`
--

CREATE TABLE `tbl_notif` (
  `notif_id` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `isRead` tinyint(1) DEFAULT 0,
  `type` varchar(255) DEFAULT NULL,
  `tagType` varchar(255) DEFAULT NULL,
  `avatarColor` varchar(255) DEFAULT 'green',
  `badgeColor` varchar(255) DEFAULT 'green',
  `tag` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_notif`
--

INSERT INTO `tbl_notif` (`notif_id`, `UID`, `timeStamp`, `isRead`, `type`, `tagType`, `avatarColor`, `badgeColor`, `tag`, `text`) VALUES
(1, 6, '2026-05-18 03:42:54', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', NULL),
(2, 6, '2026-05-18 03:43:24', 1, 'request', 'approved', 'green', 'green', 'APPROVED', NULL),
(3, 6, '2026-05-18 03:43:24', 1, 'request', 'approved', 'green', 'green', 'APPROVED', NULL),
(4, 6, '2026-05-18 03:43:42', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', NULL),
(5, 6, '2026-05-18 03:44:52', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', NULL),
(6, 6, '2026-05-18 03:57:30', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba Approved Order'),
(7, 6, '2026-05-18 03:58:05', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(8, 6, '2026-05-18 03:58:44', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Marcky Balaba Pending Order'),
(9, 6, '2026-05-18 03:59:04', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(10, 6, '2026-05-18 04:04:48', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba Approved Order'),
(11, 6, '2026-05-18 04:07:24', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(12, 6, '2026-05-18 04:59:45', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba Approved Order'),
(13, 6, '2026-05-18 05:00:12', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(14, 6, '2026-05-18 05:20:41', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba Approved Order'),
(15, 6, '2026-05-18 05:20:55', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Marcky Balaba Pending Order'),
(16, 1, '2026-05-18 05:27:01', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Adrian Santiago Complete Order'),
(17, 6, '2026-05-18 05:28:10', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(18, 3, '2026-05-18 14:43:56', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Andrie Approved Order'),
(19, 6, '2026-05-18 15:13:54', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(20, 6, '2026-05-18 15:15:13', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba Approved Order'),
(21, 3, '2026-05-18 15:16:30', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Andrie Complete Order'),
(22, 6, '2026-05-19 13:53:05', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(23, 6, '2026-05-19 13:54:57', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Marcky Balaba Pending Order'),
(24, 6, '2026-05-19 13:55:09', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba Complete Order'),
(25, 3, '2026-05-20 00:08:15', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Andrie Approved Order'),
(26, 3, '2026-05-20 00:13:37', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', '<strong>Andrie</strong> your Order has been Approved by the Admin'),
(27, 3, '2026-05-20 00:23:31', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Andrie your Order has been Approved by the Admin'),
(28, 6, '2026-05-20 02:05:31', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has been Approved by the Admin'),
(29, 6, '2026-05-20 02:06:56', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has been Approved by the Admin'),
(30, 6, '2026-05-20 02:08:22', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba your Order has been Approved by the Admin'),
(31, 6, '2026-05-20 02:08:32', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has been Approved by the Admin'),
(32, 6, '2026-05-20 02:11:02', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba your Order has been Approved by the Admin'),
(33, 6, '2026-05-20 02:11:40', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has been Approved by the Admin'),
(34, 6, '2026-05-20 02:13:32', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba your Order has set to Approved by the Admin'),
(35, 6, '2026-05-20 02:13:41', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has set to Complete by the Admin'),
(36, 6, '2026-05-20 02:19:19', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba your Order has set to Approved by the Admin'),
(37, 6, '2026-05-20 02:19:36', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has set to Complete by the Admin'),
(38, 6, '2026-05-20 02:58:53', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba your Order has set to Approved by the Admin'),
(39, 6, '2026-05-20 02:59:09', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has set to Complete by the Admin'),
(40, 6, '2026-05-20 03:02:11', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba your Order has set to Approved by the Admin'),
(41, 6, '2026-05-20 03:03:26', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has set to Complete by the Admin'),
(42, 1, '2026-05-20 03:05:12', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Adrian Santiago your Order has set to Approved by the Admin'),
(43, 1, '2026-05-20 03:05:45', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Adrian Santiago your Order has set to Complete by the Admin'),
(44, 1, '2026-05-20 03:05:52', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Adrian Santiago your Order has set to Pending by the Admin'),
(45, 1, '2026-05-20 03:05:57', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Adrian Santiago your Order has set to Approved by the Admin'),
(46, 1, '2026-05-20 03:06:15', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Adrian Santiago your Order has set to Complete by the Admin'),
(47, 9, '2026-05-20 05:13:33', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Redmi your Order has set to Approved by the Admin'),
(48, 9, '2026-05-20 05:13:59', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Redmi your Order has set to Complete by the Admin'),
(49, 21, '2026-05-20 05:18:18', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Albert your Order has set to Approved by the Admin'),
(50, 21, '2026-05-20 05:18:31', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Albert your Order has set to Complete by the Admin'),
(51, 21, '2026-05-20 05:19:29', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Albert your Order has set to Pending by the Admin'),
(52, 21, '2026-05-20 05:20:00', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Albert your Order has set to Complete by the Admin'),
(53, 9, '2026-05-20 05:20:43', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Redmi your Order has set to Approved by the Admin'),
(54, 9, '2026-05-20 05:21:19', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Redmi your Order has set to Approved by the Admin'),
(55, 22, '2026-05-20 05:22:49', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(56, 22, '2026-05-20 05:23:28', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(57, 9, '2026-05-20 05:23:39', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Redmi your Order has set to Complete by the Admin'),
(58, 9, '2026-05-20 05:23:48', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Redmi your Order has set to Complete by the Admin'),
(59, 22, '2026-05-20 05:25:41', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(60, 22, '2026-05-20 05:40:06', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(61, 22, '2026-05-20 05:42:18', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(62, 22, '2026-05-20 05:42:35', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Zed your Order has set to Pending by the Admin'),
(63, 22, '2026-05-20 05:42:45', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(64, 22, '2026-05-20 05:42:54', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Zed your Order has set to Pending by the Admin'),
(65, 22, '2026-05-20 05:43:10', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(66, 3, '2026-05-20 05:46:37', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Andrie your Order has set to Approved by the Admin'),
(67, 3, '2026-05-20 05:46:51', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Andrie your Order has set to Complete by the Admin'),
(68, 3, '2026-05-20 05:53:31', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Andrie your Order has set to Complete by the Admin'),
(69, 22, '2026-05-20 08:33:25', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(70, 22, '2026-05-20 08:35:53', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(71, 6, '2026-05-20 08:40:50', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Marcky Balaba your Order has set to Approved by the Admin'),
(72, 14, '2026-05-21 02:43:05', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'alex abon your Order has set to Approved by the Admin'),
(73, 14, '2026-05-21 02:43:20', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(74, 14, '2026-05-21 02:44:18', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'alex abon your Order has set to Approved by the Admin'),
(75, 14, '2026-05-21 02:45:04', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(76, 6, '2026-05-21 03:02:58', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Marcky Balaba your Order has set to Complete by the Admin'),
(77, 22, '2026-05-21 03:03:30', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(78, 22, '2026-05-21 03:03:34', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(79, 22, '2026-05-21 03:03:45', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(80, 22, '2026-05-21 03:08:19', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(81, 22, '2026-05-21 03:08:25', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(82, 22, '2026-05-21 03:08:30', 1, 'request', 'pending', 'green', 'green', 'PENDING', 'Zed your Order has set to Pending by the Admin'),
(83, 22, '2026-05-21 03:10:11', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(84, 22, '2026-05-21 03:10:22', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'Zed your Order has set to Approved by the Admin'),
(85, 22, '2026-05-21 03:10:45', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(86, 22, '2026-05-21 03:10:54', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'Zed your Order has set to Complete by the Admin'),
(87, 14, '2026-05-21 03:37:11', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'alex abon your Order has set to Approved by the Admin'),
(88, 14, '2026-05-21 05:59:35', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'alex abon your Order has set to Approved by the Admin'),
(89, 14, '2026-05-21 06:07:13', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(90, 14, '2026-05-21 06:09:01', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(91, 14, '2026-05-21 06:23:35', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'alex abon your Order has set to Approved by the Admin'),
(92, 14, '2026-05-21 06:23:59', 1, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(93, 14, '2026-05-21 06:25:32', 1, 'request', 'approved', 'green', 'green', 'APPROVED', 'alex abon your Order has set to Approved by the Admin'),
(94, 14, '2026-05-21 06:25:56', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(95, 14, '2026-05-21 06:37:43', 0, 'request', 'approved', 'green', 'green', 'APPROVED', 'alex abon your Order has set to Approved by the Admin'),
(96, 14, '2026-05-21 06:38:00', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(97, 14, '2026-05-21 06:44:22', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(98, 14, '2026-05-21 06:44:28', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(99, 14, '2026-05-21 06:44:46', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(100, 14, '2026-05-21 06:44:53', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(101, 14, '2026-05-21 06:56:13', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(102, 14, '2026-05-21 07:29:49', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(103, 14, '2026-05-21 07:29:53', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(104, 14, '2026-05-21 07:29:59', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(105, 14, '2026-05-21 07:34:54', 0, 'request', 'pending', 'green', 'green', 'PENDING', 'alex abon your Order has set to Pending by the Admin'),
(106, 14, '2026-05-21 07:34:59', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(107, 14, '2026-05-21 08:01:31', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin'),
(108, 14, '2026-05-21 08:01:41', 0, 'request', 'complete', 'green', 'green', 'COMPLETE', 'alex abon your Order has set to Complete by the Admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `transac_id` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pickup_date` varchar(255) DEFAULT NULL,
  `return_date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `pickup_location` varchar(255) DEFAULT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`transac_id`, `trip_id`, `amount`, `created_at`, `pickup_date`, `return_date`, `status`, `pickup_location`, `note`) VALUES
(227, 227, 0, '2026-05-21 07:37:17', '2026-06-29', '2026-07-09', 'Pending', 'dubinan, 87, 788', ''),
(228, 228, 0, '2026-05-21 08:01:09', '2026-07-02', '2026-07-11', 'Pending', 'rosario, 556, 45', ''),
(229, 229, 0, '2026-05-21 08:03:30', '2026-05-22', '2026-05-23', 'Pending', 'rosario, 556, ', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trip`
--

CREATE TABLE `tbl_trip` (
  `trip_id` int(11) NOT NULL,
  `UID` int(11) DEFAULT NULL,
  `truck_id` int(11) DEFAULT NULL,
  `trip_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_trip`
--

INSERT INTO `tbl_trip` (`trip_id`, `UID`, `truck_id`, `trip_status`, `created_at`) VALUES
(227, 14, 8, NULL, '2026-05-21 07:37:16'),
(228, 14, 23, NULL, '2026-05-21 08:01:09'),
(229, 14, 6, NULL, '2026-05-21 08:03:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_truck`
--

CREATE TABLE `tbl_truck` (
  `truck_id` int(11) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `plate_number` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `truck_type` varchar(255) DEFAULT NULL,
  `fuel_type` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `on_trip` tinyint(1) DEFAULT NULL,
  `max_weight_capacity_kg` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_truck`
--

INSERT INTO `tbl_truck` (`truck_id`, `model`, `year`, `plate_number`, `brand`, `truck_type`, `fuel_type`, `is_active`, `on_trip`, `max_weight_capacity_kg`, `photo_url`, `created_at`, `status`) VALUES
(1, 'IZUZU', '2014', 'CAY 1951', 'IZUZU', 'Wing Van', 'Diesel', 1, 0, '25 Tons', 'truck1.jpg', '0000-00-00 00:00:00', 'maintenance'),
(2, 'IZUZU', '2014', 'RGW 829', 'IZUZU', 'Wing Van', 'Diesel', 1, 0, '25 Tons', 'truck2.jpg', '0000-00-00 00:00:00', 'maintenance'),
(3, 'IZUZU', '2014', 'CAO 2834', 'IZUZU', 'Wing Van', 'Diesel', 1, 0, '25 Tons', 'truck3.jpg', '0000-00-00 00:00:00', 'unavailable'),
(4, 'IZUZU', '2014', 'CAL 7948', 'IZUZU', 'Wing Van', 'Diesel', 1, 0, '25 Tons', 'truck4.jpg', '0000-00-00 00:00:00', 'unavailable'),
(6, 'IZUZU', '2014', '023209', 'IZUZU', 'Wing Van', 'Diesel', 1, 1, '25 Tons', 'truck6.jpg', '0000-00-00 00:00:00', 'available'),
(7, 'IZUZU', '2012', 'URV 177', 'IZUZU', 'Drop Side Elf', 'Diesel', 1, 0, '17 Tons', 'truck7.jpg', '0000-00-00 00:00:00', 'available'),
(8, 'IZUZU', '2012', 'UST 411', 'IZUZU', 'Drop Side Elf', 'Diesel', 1, 1, '17 Tons', 'truck8.jpg', '0000-00-00 00:00:00', 'available'),
(23, 'IZUZU', '2020', 'RGW 900', 'IZUZU', 'Wing Van', 'Diesel', 1, 1, NULL, 'truck5.JPG-1779343844850', '2026-05-21 06:10:44', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `UID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(255) DEFAULT 'user',
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`UID`, `username`, `password`, `photo`, `created_at`, `role`, `email`, `phone_number`) VALUES
(1, 'Adrian Santiago', '$2b$10$ZsH0fVZEtDL9MUALWW3/Ju1kH5lp7AiPhLX1FNS3u8OxNXh0772Y2', NULL, '2026-04-23 13:25:43', 'Admin', 'stgoadrian24@gmail.com', '04842588'),
(2, 'Lanther Han', '$2b$10$0uNe.3lzvQiIJjpL7e.YyuRuqsPMoYOumfOGGtYil2K7SI5qrf77q', NULL, '2026-04-23 13:59:01', 'user', 'Lanther@gmail.com', '09498425999'),
(3, 'Andrie', '$2b$10$oFpcOkaEKbYs39dh7GRVVuvFkLe8VAByVcvGrPP11m7EWR4XFW9ou', NULL, '2026-04-23 14:16:31', 'user', 'Andrie@gmail.com', '0948842588'),
(4, 'stevan', '$2b$10$fKQmqoO0m5m5uFsWhtmQne6cnfeJVJrimLqTwmuVFaAtH71uoK.am', NULL, '2026-04-24 03:19:54', 'user', 'stevan@gmail.com', '0948842678'),
(5, 'TEST', '$2b$10$hYPFB4NV8vty0VE0iOXvDe2f7d9OdMmWeZtTKwbhjPNQEK698BAVS', NULL, '2026-04-27 02:48:45', 'user', '0949842588@gmail.com', '123123123'),
(6, 'Marcky Balaba', '$2b$10$EtKaWYzPbaLeVpAL5I18k.BH2DIe5lnRaJiqGy9CCa90IK0UjqJai', NULL, '2026-04-27 06:51:35', 'user', 'marcky@gmail.com', '09498422516'),
(7, 'jhon', '$2b$10$pyZpbB3bHWgcBkW..bjPEO611c1Qt6SV8XylY.4k7uXtKC/SfKiXe', NULL, '2026-04-29 16:16:04', 'user', 'jhon@gmail.com', '09498426844'),
(8, 'james', '$2b$10$8pc5k29bPmjyf8OzLFqoyepatT7mWSV/5QznJFOsOEAQtaRPuHvWy', NULL, '2026-04-29 23:55:33', 'user', 'james@gmail.com', '094973365822'),
(9, 'Redmi', '$2b$10$2ZCex..z5U1SENDBZ/pE6.bVxX5V1wjmjaUaTr29a2OsdHSR5C8MS', NULL, '2026-04-30 18:03:17', 'user', 'redmi@gmail.com', '09498425988'),
(10, 'july', '$2b$10$nnUwU5K/0bYEL2Ru0p/3qO6LzJE.4mHVDESYu4iGZZMWaFnImEOwi', NULL, '2026-05-07 00:37:30', 'user', 'july@gmail.com', NULL),
(11, 'jay', '$2b$10$NYhAdNeliXENA.4AIUYkvOavViunRVtmBgZTbnT5WIEr6pNWemcKi', NULL, '2026-05-09 14:46:38', 'user', 'jay@gmail.com', '09498422516'),
(12, 'joy', '$2b$10$F0RkHpzeHbVUw/m1Jfx3G.gkuXaULJD5A7lIws30vuy.mgfUa9mtm', NULL, '2026-05-09 14:48:13', 'user', 'joy@gmail.com', '09498426844'),
(13, 'qwen', '$2b$10$T9jf6zH8MexWceHG.ZL2UeTxC0f3FNkDyZrBze23KsXxbMJJlRrJ.', NULL, '2026-05-09 14:49:34', 'user', 'qwen@gmail.com', '09495533535'),
(14, 'alex abon', '$2b$10$MXnHQ3avRBP6Tml1ciSb/.0d3K9wCkhInhCYsuXV3yWBd9YWykBwK', NULL, '2026-05-13 02:27:50', 'user', 'alexandrieabon12@gmail.com', '09361623333'),
(15, 'dion', '$2b$10$sx2PAQd2kIK4OYTn1/6STeuD2wQuVuvpZ9Bj06tcV/a4lnHEX.bla', NULL, '2026-05-14 00:04:06', 'user', 'dion@gmail.com', '09487538477'),
(19, 'dave', '$2b$10$HwZu2fUaM3zKE9IGxkxqIuaSEyTgO1/I7gLMXJCJwWvJR7BQ3x79.', NULL, '2026-05-14 00:33:29', 'user', 'dave@gmail.com', '09487538477'),
(20, 'jane', '$2b$10$GL6JRXCkvGcsHZCxhchCFOvSBmG3N.tUBO3dRlp6cAne8DgSE1q5q', NULL, '2026-05-16 14:23:57', 'user', 'jane@gmail.com', '09487538477'),
(21, 'Albert', '$2b$10$WNQQJI3X06xseQLtLHS//ulJWR0rdProPgb/3MuuvOFfq23LFlwmS', NULL, '2026-05-20 05:16:32', 'user', 'albertjansantos@gmail.com', '09668562712'),
(22, 'Zed', '$2b$10$JSiSwX4/83qO3OGC7zBHjusJV771rD9rAC8sB4EM2RFEXgKCSEFxS', NULL, '2026-05-20 05:22:00', 'user', 'zed@gmail.com', '09498425988'),
(23, 'Jannery', '$2b$10$CWbavncFhbkPi9mpGnq6w.RObmZywR1PbwJPPLanycQL9uDg.qbVy', NULL, '2026-05-21 05:46:26', 'user', 'jun@gmail.com', '09495533535'),
(24, 'andrieabon', '$2b$10$/Xz4nFeU0Ij767TugB/equCUmWH6UmHzuh/W8RV/M8VgotYqLNv5S', NULL, '2026-05-21 06:53:44', 'user', 'alex@gmail.com', '09451326508');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD PRIMARY KEY (`LID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `tbl_notif`
--
ALTER TABLE `tbl_notif`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD PRIMARY KEY (`transac_id`),
  ADD KEY `trip_id` (`trip_id`);

--
-- Indexes for table `tbl_trip`
--
ALTER TABLE `tbl_trip`
  ADD PRIMARY KEY (`trip_id`),
  ADD KEY `UID` (`UID`),
  ADD KEY `truck_id` (`truck_id`);

--
-- Indexes for table `tbl_truck`
--
ALTER TABLE `tbl_truck`
  ADD PRIMARY KEY (`truck_id`),
  ADD KEY `idx_trip_active` (`is_active`,`on_trip`),
  ADD KEY `idx_tbl_status` (`status`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`UID`),
  ADD KEY `idx_user_email` (`username`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  MODIFY `LID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=271;

--
-- AUTO_INCREMENT for table `tbl_notif`
--
ALTER TABLE `tbl_notif`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  MODIFY `transac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

--
-- AUTO_INCREMENT for table `tbl_trip`
--
ALTER TABLE `tbl_trip`
  MODIFY `trip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

--
-- AUTO_INCREMENT for table `tbl_truck`
--
ALTER TABLE `tbl_truck`
  MODIFY `truck_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD CONSTRAINT `tbl_logs_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `tbl_users` (`UID`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_notif`
--
ALTER TABLE `tbl_notif`
  ADD CONSTRAINT `tbl_notif_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `tbl_users` (`UID`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD CONSTRAINT `tbl_transaction_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `tbl_trip` (`trip_id`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_trip`
--
ALTER TABLE `tbl_trip`
  ADD CONSTRAINT `tbl_trip_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `tbl_users` (`UID`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_trip_ibfk_2` FOREIGN KEY (`truck_id`) REFERENCES `tbl_truck` (`truck_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
