export interface Model_GoogleMapPlace {
    address_components: {
        long_name: string;
        short_name: string;
        types: string[];
    }[];
    adr_address: string;
    business_status: string;
    current_opening_hours: {
        open_now: boolean;
        periods: {
            close: {
                date: string;
                day: number;
                time: string;
            };
            open: {
                date: string;
                day: number;
                time: string;
            };
        }[];
        weekday_text: string[];
    };
    formatted_address: string;
    formatted_phone_number: string;
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        };
        viewport: {
            south: number;
            west: number;
            north: number;
            east: number;
        };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    international_phone_number: string;
    name: string;
    opening_hours: {
        open_now: boolean;
        periods: {
            close: {
                day: number;
                time: string;
                hours: number;
                minutes: number;
                nextDate: number;
            };
            open: {
                day: number;
                time: string;
                hours: number;
                minutes: number;
                nextDate: number;
            };
        }[];
        weekday_text: string[];
    };
    photos: {
        height: number;
        html_attributions: string[];
        width: 1980;
    }[];
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    rating: number;
    reference: string;
    reviews: {
        author_name: string;
        author_url: string;
        language: string;
        profile_photo_url: string;
        rating: number;
        relative_time_description: string;
        text: string;
        time: number;
    }[];
    types: string[];
    url: string;
    user_ratings_total: number;
    utc_offset: number;
    vicinity: string;
    website: string;
    utc_offset_minutes: number;
}
