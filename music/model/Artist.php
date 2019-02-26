<?php

namespace go\modules\tutorial\music\model;

use go\core\jmap\Entity;
use go\core\util\DateTime;

/**
 * Artist model
 *
 * @copyright (c) 2019, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class Artist extends Entity {

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
	 * @var DateTime
	 */
	public $createdAt;

	/**
	 * 
	 * @var DateTime
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

	/**
	 * The albums created by the artist
	 *
	 * @var Album[]
	 */
	public $albums;

	protected static function defineMapping() {
		return parent::defineMapping()
						->addTable("music_artist")
						->addRelation('albums', Album::class, ['id' => 'artistId']);
	}

}
