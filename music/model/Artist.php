<?php

namespace go\modules\tutorial\music\model;

use go\core\jmap\Entity;
use go\core\orm\Filters;
use go\core\orm\Mapping;
use go\core\util\DateTime;

/**
 * Artist model
 *
 * @copyright (c) 2019-2024, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author Joachim van de Haterd <jvdhaterd@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
final class Artist extends Entity
{

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

	protected static function defineMapping(): Mapping
	{
		return parent::defineMapping()
			->addTable("tutorial_music_artist", "artist")
			->addArray('albums', Album::class, ['id' => 'artistId']);
	}

	/**
	 * This function returns the columns to search when using the "text" filter.
	 */
	public static function textFilterColumns(): array
	{
		return ['name'];
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
	protected static function defineFilters(): Filters
	{
		return parent::defineFilters()
			->add('genres', function (\go\core\db\Criteria $criteria, $value, \go\core\orm\Query $query, array $filter) {
				if (!empty($value)) {
					$query->join('tutorial_music_album', 'album', 'album.artistId = artist.id')
						->groupBy(['artist.id']) // group the results by id to filter out duplicates because of the join
						->where(['album.genreId' => $value]);
				}
			});
	}

}
