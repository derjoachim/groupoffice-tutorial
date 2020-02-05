<?php

$updates = [];

$updates['202002041445'][] = <<<'EOT'
CREATE TABLE IF NOT EXISTS `music_artist_custom_fields`
	( id INT(11) NOT NULL PRIMARY KEY, 
	CONSTRAINT `music_artist_custom_fields_ibfk_1` FOREIGN KEY(id) REFERENCES music_artist (id) 
	ON DELETE CASCADE ON UPDATE RESTRICT ) ENGINE = INNODB;
EOT;
