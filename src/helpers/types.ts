// Base Django model interface
interface EntityModel {
    id?: number;
}

export interface UserModel extends EntityModel {
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
    department?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    date_joined?: string;
    last_login?: string;
    role: string; // User role
}

// Compound model
export interface Compound extends EntityModel {
    other_names_input: string;
    name: string;
    pubchem_id?: number;
    bio_activity?: string;
    other_names?: string[];
    subclass: string;
    compound_class: string;
    smiles: string;
}

// Specie model
export interface Species extends EntityModel {
    id?: number;
    name: string;
    recent_name: string;
    kingdom: string;
    family: string;
    trad_uses?: string;
    part_used?: string;
    administration?: string;
    effects?: string;
    notes?: string;
    references: number[] | Reference[];
    compound_codes: string[];
    compounds?: number[] | Compound[];
    sites?: number[] | Site[];
    collection_date?: Date | string;
    storage_locations?: Location[];
    harvest_sites: Location[];
    collection_data?: string[];
}

export interface SearchedSpecies extends Species {
    title: string;
    author?: string;
    year: number;
    doi?: string;
    thesis_level?: string;
    compounds?: Compound[];
    link?: string;
    brief_text?: string;
}

// Reference model
export interface Reference extends EntityModel {
    year: number;
    type: string;
    title: string;
    author: string;
    doi?: string;
    thesis_level?: string;
}

// Location model
export interface Location extends EntityModel {
    continent: string;
    country: string;
    region_state?: string;
    city_town: string;
    name: string;
    place?: string;
    zipCode?: string;
    gps_latitude: number;
    gps_longitude: number;
    voucher_specimen_number?: string;
}

// Site model
export interface Site extends EntityModel {
    location: number | Location;
}

// Herbarium model
export interface Herbarium extends EntityModel {
    location: number | Location;
    voucher_specimen_number: string;
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