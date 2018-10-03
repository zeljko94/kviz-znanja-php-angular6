-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2018 at 05:29 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kvizznanja`
--

-- --------------------------------------------------------

--
-- Table structure for table `kviz`
--

CREATE TABLE `kviz` (
  `ID` int(11) NOT NULL,
  `Naziv` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `kviz`
--

INSERT INTO `kviz` (`ID`, `Naziv`) VALUES
(40, 'Kviz 1'),
(41, 'Kviz 2'),
(42, 'Kviz 3');

-- --------------------------------------------------------

--
-- Table structure for table `kvizpitanje`
--

CREATE TABLE `kvizpitanje` (
  `ID` int(11) NOT NULL,
  `KvizID` int(11) NOT NULL,
  `PitanjeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `kvizpitanje`
--

INSERT INTO `kvizpitanje` (`ID`, `KvizID`, `PitanjeID`) VALUES
(53, 40, 24),
(54, 40, 25),
(55, 40, 26),
(56, 40, 27),
(57, 41, 31),
(58, 41, 32),
(59, 41, 33),
(60, 41, 34),
(61, 41, 35),
(62, 42, 27),
(63, 42, 28),
(64, 42, 29),
(65, 42, 30),
(66, 42, 31),
(67, 42, 32),
(68, 42, 33),
(69, 42, 34),
(70, 42, 35);

-- --------------------------------------------------------

--
-- Table structure for table `odgovor`
--

CREATE TABLE `odgovor` (
  `ID` int(11) NOT NULL,
  `Text` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `IsTocan` tinyint(1) DEFAULT NULL,
  `PitanjeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `odgovor`
--

INSERT INTO `odgovor` (`ID`, `Text`, `IsTocan`, `PitanjeID`) VALUES
(65, 'zelene', 0, 23),
(66, 'crvene', 0, 23),
(67, 'plave', 1, 23),
(68, 'žute', 0, 23),
(69, 'Brač', 1, 24),
(70, 'Vis', 0, 24),
(71, 'Krk', 0, 24),
(72, 'Pag', 0, 24),
(73, 'u New Yorku', 1, 25),
(74, 'u Washingtonu', 0, 25),
(75, 'u Chicagu', 0, 25),
(76, 'u Bruxellesu', 0, 25),
(77, 'Austrija', 1, 26),
(78, 'Slovenija', 0, 26),
(79, 'Mađarska', 0, 26),
(80, 'Bosna i Hercegovina', 0, 26),
(81, 'Zemljotres', 0, 27),
(82, 'Požar', 0, 27),
(83, 'Glad', 1, 27),
(84, 'Poplava', 0, 27),
(85, 'Žuta', 0, 28),
(86, 'Crna', 0, 28),
(87, 'Crvena', 0, 28),
(88, 'Zelena', 1, 28),
(89, '10', 0, 29),
(90, '8', 0, 29),
(91, '6', 1, 29),
(92, '4', 0, 29),
(93, 'Roda', 0, 30),
(94, 'Lasta', 1, 30),
(95, 'Patka', 0, 30),
(96, 'Guska', 0, 30),
(97, 'Berlinski zid', 1, 31),
(98, 'Zid plača', 0, 31),
(99, 'Kineski zid', 0, 31),
(100, 'Zid srama', 0, 31),
(101, 'Paluba', 0, 32),
(102, 'Kabina', 1, 32),
(103, 'Krma', 0, 32),
(104, 'Stiva', 0, 32),
(105, 'Batman', 1, 33),
(106, 'Superman', 0, 33),
(107, 'Spiderman', 0, 33),
(108, 'Actionman', 0, 33),
(109, 'Dubrovniku', 1, 34),
(110, 'Splitu', 0, 34),
(111, 'Zadru', 0, 34),
(112, 'Trogiru', 0, 34),
(113, 'Vrabac', 0, 35),
(114, 'Orao', 0, 35),
(115, 'Golub', 0, 35),
(116, 'Slavuj', 1, 35);

-- --------------------------------------------------------

--
-- Table structure for table `pitanje`
--

CREATE TABLE `pitanje` (
  `ID` int(11) NOT NULL,
  `Text` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `pitanje`
--

INSERT INTO `pitanje` (`ID`, `Text`) VALUES
(23, 'Koje su boje štrumpfovi?'),
(24, 'Koji je najviši hrvatski otok?'),
(25, 'Gdje je sjedište OUN-a?'),
(26, 'Koja od navedenih država ne graniči sa Hrvatskom?'),
(27, 'Što nije elementarna nepogoda?'),
(28, 'Koja se boja ne nalazi na zastavi Ferrarija?'),
(29, 'Koliko se ukupno zvijezda nalazi na zastavi Australije?'),
(30, 'Koja \"jedna\" ne čini proljeće?'),
(31, 'Koji je zid izgrađen 1961. godine?'),
(32, 'Koji je uobičajeni naziv za sobu na brodu?'),
(33, '\"Dobročinitelj\" iz Gothama je...'),
(34, 'U kojem si hrvatskom gradu ako šetaš Stradunom?'),
(35, 'Koja se ptica nalazi na kovanici od 1 kune?');

-- --------------------------------------------------------

--
-- Table structure for table `rezultat`
--

CREATE TABLE `rezultat` (
  `ID` int(11) NOT NULL,
  `OstvarenihBodova` int(11) DEFAULT NULL,
  `MaxBodova` int(11) DEFAULT NULL,
  `Datum` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Postotak` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `KvizID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `rezultat`
--

INSERT INTO `rezultat` (`ID`, `OstvarenihBodova`, `MaxBodova`, `Datum`, `Postotak`, `UserID`, `KvizID`) VALUES
(6, 2, 4, '22/5/2018', 50, 2, 40),
(7, 2, 5, '22/5/2018', 40, 2, 41),
(8, 2, 9, '22/5/2018', 22, 2, 42),
(9, 1, 4, '22/5/2018', 25, 1, 40),
(10, 8, 9, '22/5/2018', 88, 1, 42);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Ime` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Prezime` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Privilegije` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Ime`, `Prezime`, `Email`, `Password`, `Privilegije`) VALUES
(1, 'korisnik', 'korisnik', 'korisnik@gmail.com', 'asd', 'korisnik'),
(2, 'admin', 'admin', 'admin@gmail.com', 'asd', 'admin'),
(4, 'Test', 'TestPrezime', 'test@gmail.com', 'asd', 'korisnik');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kviz`
--
ALTER TABLE `kviz`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `kvizpitanje`
--
ALTER TABLE `kvizpitanje`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_kvizpitanje_kviz` (`KvizID`),
  ADD KEY `fk_kvizpitanje_pitanje` (`PitanjeID`);

--
-- Indexes for table `odgovor`
--
ALTER TABLE `odgovor`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_odgovor_pitanje` (`PitanjeID`);

--
-- Indexes for table `pitanje`
--
ALTER TABLE `pitanje`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `rezultat`
--
ALTER TABLE `rezultat`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_rezultat_user` (`UserID`),
  ADD KEY `fk_rezultat_kviz` (`KvizID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kviz`
--
ALTER TABLE `kviz`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `kvizpitanje`
--
ALTER TABLE `kvizpitanje`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `odgovor`
--
ALTER TABLE `odgovor`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `pitanje`
--
ALTER TABLE `pitanje`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `rezultat`
--
ALTER TABLE `rezultat`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kvizpitanje`
--
ALTER TABLE `kvizpitanje`
  ADD CONSTRAINT `fk_kvizpitanje_kviz` FOREIGN KEY (`KvizID`) REFERENCES `kviz` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kvizpitanje_pitanje` FOREIGN KEY (`PitanjeID`) REFERENCES `pitanje` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `odgovor`
--
ALTER TABLE `odgovor`
  ADD CONSTRAINT `fk_odgovor_pitanje` FOREIGN KEY (`PitanjeID`) REFERENCES `pitanje` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pitanjeID` FOREIGN KEY (`PitanjeID`) REFERENCES `pitanje` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rezultat`
--
ALTER TABLE `rezultat`
  ADD CONSTRAINT `fk_rezultat_kviz` FOREIGN KEY (`KvizID`) REFERENCES `kviz` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rezultat_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
