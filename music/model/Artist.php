<?php

namespace go\modules\tutorial\music\model;

use go\core\jmap\Entity;
use go\core\orm\Filters;
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
										->addTable("music_artist", "artist")
										->addArray('albums', Album::class, ['id' => 'artistId']);
	}

	/**
	 * Defines JMAP filters
	 *
	 * Adds the 'genres' filter which can be an array of genre id's.
	 *
	 * @link https://jmap.io/spec-core.html#/query
	 *
	 * @return Filters
	 */
	protected static function defineFilters() {
		return parent::defineFilters()
										->add('genres', function (\go\core\db\Criteria $criteria, $value, \go\core\orm\Query $query, array $filter) {
											if (!empty($value)) {
												$query->join('music_album', 'album', 'album.artistId = artist.id')
												->groupBy(['artist.id']) // group the results by id to filter out duplicates because of the join
												->where(['album.genreId' => $value]);
											}
										});
	}

}
