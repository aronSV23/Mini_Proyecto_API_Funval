-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2024 at 08:44 AM
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
-- Database: `funval_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `correo_electronico` varchar(250) NOT NULL,
  `dni` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `apellidos`, `direccion`, `correo_electronico`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(1, 'Mick', 'Hans', '048 Acker Drive', 'mhans0@g.co', 1714393, 29, '2024-03-01', '614-563-6511'),
(2, 'Delbert', 'Gagie', '5 Fisk Junction', 'dgagie1@elpais.com', 7456806, 28, '2023-05-21', '780-127-0517'),
(3, 'Fawnia', 'Somerlie', '76981 Cascade Drive', 'fsomerlie2@utexas.edu', 7500548, 85, '2023-12-21', '579-229-5369'),
(4, 'Heinrik', 'Lorincz', '592 Manitowish Street', 'hlorincz3@4shared.com', 1452805, 24, '2023-07-07', '775-491-0955'),
(5, 'Maximilian', 'Bonsale', '922 Sunbrook Street', 'mbonsale4@businesswire.com', 3881783, 47, '2024-01-20', '770-953-1690'),
(6, 'Emelen', 'Tedahl', '1203 Fairview Trail', 'etedahl5@surveymonkey.com', 6299926, 23, '2023-07-12', '614-905-8494'),
(7, 'Maurita', 'Dicty', '78 Nelson Trail', 'mdicty6@reuters.com', 6175471, 37, '2023-03-30', '750-937-9167'),
(8, 'Carly', 'Keirl', '9 Dixon Circle', 'ckeirl7@bing.com', 7336362, 34, '2023-07-03', '206-519-6808'),
(9, 'Peggy', 'Castellani', '7742 Arizona Crossing', 'pcastellani8@boston.com', 6687379, 20, '2024-02-16', '168-636-6821'),
(10, 'Porter', 'Newman', '1 Johnson Drive', 'pnewman9@alibaba.com', 7360443, 97, '2024-02-18', '958-556-2729'),
(11, 'Glory', 'McIlwrick', '5089 American Hill', 'gmcilwricka@washingtonpost.com', 3012655, 18, '2023-08-21', '257-697-3333'),
(12, 'Marlin', 'Tumpane', '953 Center Trail', 'mtumpaneb@umich.edu', 4609554, 39, '2023-06-09', '816-557-6240'),
(13, 'Deerdre', 'Fynan', '546 Esch Center', 'dfynanc@simplemachines.org', 1857907, 56, '2023-12-05', '798-419-4818'),
(14, 'Mari', 'Storck', '3996 Sage Trail', 'mstorckd@uiuc.edu', 7571114, 75, '2023-05-25', '674-604-3314'),
(15, 'Mira', 'Eouzan', '48 Maple Wood Drive', 'meouzane@over-blog.com', 4953092, 27, '2023-09-23', '805-826-5005');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
