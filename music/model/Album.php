<?php
namespace go\modules\tutorial\music\model;
						
use go\core\orm\Mapping;
use go\core\orm\Property;
						
/**
 * Album model
 *
 * @copyright (c) 2019-2024, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author Joachim van de Haterd <jvdhaterd@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */

final class Album extends Property {
	
	/**
	 * 
	 * @var int
	 */							
	public $id;

	/**
	 * 
	 * @var int
	 */							
	public $artistId;

	/**
	 * 
	 * @var string
	 */							
	public $name;

	/**
	 * 
	 * @var \go\core\util\DateTime
	 */							
	public $releaseDate;

	/**
	 * 
	 * @var int
	 */							
	public $genreId;

	protected static function defineMapping(): Mapping {
		return parent::defineMapping()
						->addTable("tutorial_music_album", "album");
	}

}