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
    password: string; // Password field
    groups?: number[]; // Array of group IDs        
    user_permissions?: number[]; // Array of permission IDs
}

// Compound model
export interface Compound extends EntityModel {
    // name?: string;
    subclass: string;
    compound_class: string;
    smiles: string
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
    name: string;
    place: string;
    zipCode: string;
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