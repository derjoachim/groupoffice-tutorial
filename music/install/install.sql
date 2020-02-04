SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Table structure for table `music_album`
--

CREATE TABLE `music_album` (
  `id` int(11) NOT NULL,
  `artistId` int(11) NOT NULL,
  `name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `releaseDate` date NOT NULL,
  `genreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `music_album`
--

INSERT INTO `music_album` (`id`, `artistId`, `name`, `releaseDate`, `genreId`) VALUES
(1, 3, 'The Doors', '1967-01-04', 2),
(1, 3, 'Strange Days', '1967-09-25', 2);

-- --------------------------------------------------------

--
-- Table structure for table `music_artist`
--

CREATE TABLE `music_artist` (
  `id` int(11) NOT NULL,
  `name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` binary(40) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime NOT NULL,
  `createdBy` int(11) NOT NULL,
  `modifiedBy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `music_artist`
--

INSERT INTO `music_artist` (`id`, `name`, `photo`, `createdAt`, `modifiedAt`, `createdBy`, `modifiedBy`) VALUES
(1, 'The Doors', NULL, '2020-02-03 13:05:25', '2020-02-03 13:05:25', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `music_genre`
--

CREATE TABLE `music_genre` (
  `id` int(11) NOT NULL,
  `name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `music_genre`
--

INSERT INTO `music_genre` (`id`, `name`) VALUES
(1, 'Pop'),
(2, 'Rock'),
(3, 'Blues'),
(4, 'Jazz');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `music_album`
--
ALTER TABLE `music_album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artistId` (`artistId`),
  ADD KEY `genreId` (`genreId`);

--
-- Indexes for table `music_artist`
--
ALTER TABLE `music_artist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photo` (`photo`);

--
-- Indexes for table `music_genre`
--
ALTER TABLE `music_genre`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `music_album`
--
ALTER TABLE `music_album`
  ADD CONSTRAINT `music_album_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `music_artist` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `music_album_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `music_genre` (`id`);

--
-- Constraints for table `music_artist`
--
ALTER TABLE `music_artist`
  ADD CONSTRAINT `music_artist_ibfk_1` FOREIGN KEY (`photo`) REFERENCES `core_blob` (`id`);
COMMIT;
