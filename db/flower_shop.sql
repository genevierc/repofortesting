-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 06:00 PM
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
-- Database: `flower_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartid` int(11) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `product` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `cartorderId` int(10) NOT NULL,
  `customerid` int(10) NOT NULL,
  `stuffedtoys` varchar(255) NOT NULL,
  `special_request` varchar(255) NOT NULL,
  `chocolates` varchar(255) NOT NULL,
  `special_message_opt` varchar(3) NOT NULL,
  `special_message` varchar(255) NOT NULL,
  `special_packaging` varchar(3) NOT NULL,
  `special_packaging_way` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartid`, `image`, `product`, `price`, `quantity`, `cartorderId`, `customerid`, `stuffedtoys`, `special_request`, `chocolates`, `special_message_opt`, `special_message`, `special_packaging`, `special_packaging_way`) VALUES
(1, 'https://simply-blooms.com/wp-content/uploads/2022/10/Blink-1.jpg', 'Butterfly', 164, 3, 0, 0, '', '', '', '', '', '', ''),
(2, 'https://pbs.twimg.com/media/GJrGyK_XEAcK7Hj.jpg', 'Garden', 196, 2, 0, 0, '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `orderid` int(11) NOT NULL,
  `cartorderId` int(10) NOT NULL,
  `orderdate` date NOT NULL,
  `address` varchar(1000) NOT NULL,
  `postalcode` int(11) NOT NULL,
  `totalamount` int(11) NOT NULL,
  `deliverydate` date NOT NULL,
  `customerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`orderid`, `cartorderId`, `orderdate`, `address`, `postalcode`, `totalamount`, `deliverydate`, `customerid`) VALUES
(7, 0, '2024-07-16', 'addredss 1234', 111444, 720, '2024-07-23', 0),
(26, 0, '2024-07-16', 'addredss 12345', 444555, 720, '2024-07-23', 0),
(27, 0, '2024-07-16', 'addredss 12345', 444555, 720, '2024-07-23', 0);

-- --------------------------------------------------------

--
-- Table structure for table `flower`
--

CREATE TABLE `flower` (
  `flower_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `img` varchar(1000) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flower`
--

INSERT INTO `flower` (`flower_id`, `title`, `img`, `description`, `price`) VALUES
(1, 'Butterfly', 'https://simply-blooms.com/wp-content/uploads/2022/10/Blink-1.jpg', 'Purple, pink, white and red flowers wrapped in pink floral wrap', 164),
(2, 'Garden', 'https://pbs.twimg.com/media/GJrGyK_XEAcK7Hj.jpg', 'Flowers of all colours wrapped in a blue floral wrap tied with a pink ribbon', 196),
(3, 'Blue Ribbon', 'https://i.pinimg.com/736x/99/5c/01/995c01c8b16a05d6f26862765cb07add.jpg', 'Blue ribbons made into flowers wrapped in a silverish black floral wrap', 59),
(4, 'Dried Ocean', 'https://windflowerflorist.com/cdn/shop/files/Windflower-Florist-Bubbles_2000x.jpg?v=1718263103', 'Dried and preserved blue and white flowers ', 245),
(5, 'Sun Rise', 'https://giftr.sg/cdn/shop/products/Jul_3mnK1IvdR_1024x1024.jpg?v=1688610290', 'Handmade crochet sunflowers along other yellow and white flowers wrapped in yellow floral wrap', 125),
(6, 'Lego Build', 'https://i.pinimg.com/736x/96/5e/cf/965ecf8f4f1ac351756b2e8d7f3d9e6a.jpg', 'Handmade lego roses with other coloured flowers wrapped in pink floral wrap', 79),
(7, 'daisy', 'https://th.bing.com/th?id=OIP.w60ixicR9L3fqhDnww_RdQHaHN&w=253&h=246&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', 'oopsie daisy', 999);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payingid` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `paymentid` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `method` varchar(100) NOT NULL,
  `paymentdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `reviewid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` varchar(1000) NOT NULL,
  `reviewdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `customerid` int(11) NOT NULL,
  `First Name` varchar(60) NOT NULL,
  `Last` varchar(11) NOT NULL,
  `Gender` varchar(60) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Phone number` int(60) NOT NULL,
  `DOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`customerid`, `First Name`, `Last`, `Gender`, `Email`, `Phone number`, `DOB`) VALUES
(0, 'Julian', 'Chan', 'Male', 'Julian@gmail.com', 59273968, '2004-08-27'),
(2, 'Mary', 'Catty', 'Female', 'Mary@gmail.com', 92057284, '2009-07-05');

-- --------------------------------------------------------

--
-- Table structure for table `tracking`
--

CREATE TABLE `tracking` (
  `trackingid` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `deliveryid` int(11) NOT NULL,
  `deliverydate` date NOT NULL,
  `deliverystatus` varchar(600) NOT NULL,
  `trackingno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tracking`
--

INSERT INTO `tracking` (`trackingid`, `orderid`, `deliveryid`, `deliverydate`, `deliverystatus`, `trackingno`) VALUES
(1, 11111, 22222, '2024-07-23', 'deliverying', 33333);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartid`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `flower`
--
ALTER TABLE `flower`
  ADD PRIMARY KEY (`flower_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payingid`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`reviewid`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`customerid`);

--
-- Indexes for table `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`trackingid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `flower`
--
ALTER TABLE `flower`
  MODIFY `flower_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payingid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `reviewid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `customerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tracking`
--
ALTER TABLE `tracking`
  MODIFY `trackingid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
