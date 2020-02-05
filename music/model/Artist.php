<?php
namespace go\modules\tutorial\music\model;
						
use go\core\jmap\Entity;
use go\core\orm\CustomFieldsTrait;

/**
 * Artist model
 *
 * @copyright (c) 2020, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class Artist extends Entity {
	use CustomFieldsTrait;

	/** @var int  */							
	public $id;

	/** @var string  */							
	public $name;

	/** @var string  */							
	public $photo;

	/** @var \go\core\util\DateTime  */							
	public $createdAt;

	/** @var \go\core\util\DateTime  */							
	public $modifiedAt;

	/** @var int  */							
	public $createdBy;

	/** @var int  */							
	public $modifiedBy;
	
	/** @var Album[] */
	public $albums;

	protected static function defineMapping() {
		return parent::defineMapping()
						->addTable("music_artist", "artist")
						->addArray('albums', Album::class, ['id' => 'artistId']);
	}

	/**
	 * This function returns the columns to search when using the "text" filter.
	 */
	public static function textFilterColumns() {
		return ['name'];
	}


	/**
	 * Define JMAP filters
	 *
	 * Add the 'genres' filter which can be an array of genre IDs
	 * @return \go\core\orm\Filters
	 * @throws \Exception
	 */
	protected static function defineFilters()
	{
		return parent::defineFilters()
			->add('genres', function(\go\core\db\Criteria $criteria, $value,  \go\core\orm\Query $query, array $filter){
				if(!empty($value)) {
					$query->join('music_album', 'album', 'album.artistId = artist.id')
						->groupBy(['artist.id'])
						->where(['album.genreId' => $value]);
				}
			});
	}
}