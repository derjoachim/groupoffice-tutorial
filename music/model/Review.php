<?php


namespace go\modules\tutorial\music\model;

use go\core\acl\model\AclOwnerEntity;
use go\core\orm\Query;

class Review extends AclOwnerEntity
{
	/** @var int */
	public $id;
	/** @var int */
	public $aclId;
	/** @var int */
	public $createdBy;
	/** @var int */
	public $albumId;
	/** @var int */
	public $modifiedBy;
	/** @var int */
	public $rating;
	/** @var string */
	public $title;
	/** @var string */
	public $body;
	/** @var string */
	public $albumtitle;

	protected static function defineMapping()
	{
		return parent::defineMapping()
			->addTable('music_review')
			->setQuery((new Query())->select('a.name AS albumtitle')
				->join('music_album', 'a','a.id=music_review.albumId'));
	}

	protected static function defineFilters()
	{
		return parent::defineFilters()
			->add('albumId', function (\go\core\db\Criteria $criteria, $value, \go\core\orm\Query $query, array $filter) {
				if (!empty($value)) {
					$query->where(['music_review.albumId' => $value]);
				}
			});

	}


}