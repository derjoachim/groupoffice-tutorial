import {BaseEntity, DateTime, EntityID} from "@intermesh/goui";

export interface Artist extends BaseEntity {
	name: string,
	genreId: number,
	photo: string|null,
	createdBy: EntityID,
	modifiedBy: EntityID,
	createdAt: DateTime,
	modifiedAt: DateTime,
	albums: Album[]
}

export interface Album {
	name: string,
	releaseDate: DateTime,
	genreId: EntityID,
	artistId: EntityID
}