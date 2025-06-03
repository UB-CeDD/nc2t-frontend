// Base Django model interface
interface EntityModel {
    id: number;
}

// Compound model
export interface Compound extends EntityModel {
    name?: string;
    subclass: string;
    compound_class: string;
    smiles: string
}

// Reference model
export interface Reference extends EntityModel {
    type: string;
    title: string;
    author: string;
    thesis_level?: string;
}

// Species model
export interface Species extends EntityModel {
    compound_code: number;
    ref: number | Reference;
    collection_data: string;
    compounds: number[] | Compound[];
}

// Location model
export interface Location extends EntityModel {
    continent: string;
    country: string;
    region_state: string;
    city_town: string;
    place: string;
    gps_latitude: number;
    gps_longitude: number;
}

// Site model
export interface Site extends EntityModel {
    location: number | Location;
}

// Herbarium model
export interface Herbarium extends EntityModel {
    location: number | Location;
}

// Filter types
export interface SpeciesFilters {
    compound_code?: string;
    ref?: string;
}

// Form data types
export interface SpeciesFormData {
    compound_code: string;
    ref: string;
    collection_data: string;
    compounds: number[];
}