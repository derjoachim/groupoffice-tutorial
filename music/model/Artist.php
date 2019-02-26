<?php
namespace go\modules\tutorial\music\model;
						
use go\core\orm\Property;
						
/**
 * Artist model
 *
 * @copyright (c) 2019, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */

class Artist extends Property {
	
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

	/**
	 * 
	 * @var string
	 */							
	public $photo;

	/**
	 * 
	 * @var \go\core\util\DateTime
	 */							
	public $createdAt;

	/**
	 * 
	 * @var \go\core\util\DateTime
	 */							
	public $modifiedAt;

	/**
	 * 
	 * @var int
	 */							
	public $createdBy;

	/**
	 * 
	 * @var int
	 */							
	public $modifiedBy;

	protected static function defineMapping() {
		return parent::defineMapping()
						->addTable("music_artist");
	}

}