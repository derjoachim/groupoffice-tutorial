<?php
namespace go\modules\tutorial\music\model;
						
use go\core\orm\Property;
						
/**
 * Genre model
 *
 * @copyright (c) 2019, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */

class Genre extends Property {
	
	/**
	 * 
	 * @var int
	 */							
	public $id;

	/**
	 * 
	 * @var string
	 */							
	public $name;

	protected static function defineMapping() {
		return parent::defineMapping()
						->addTable("music_genre");
	}

}