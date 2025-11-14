
export enum BookStatus {
    Available = 'Available',
    CheckedOut = 'Checked Out',
}

export enum Genre {
    Fiction = 'Fiction',
    NonFiction = 'Non-Fiction',
    ScienceFiction = 'Science Fiction',
    Fantasy = 'Fantasy',
    Mystery = 'Mystery',
    Biography = 'Biography',
    History = 'History',
    Other = 'Other',
}

export interface Book {
    id: string;
    title: string;
    author: string;
    genre: Genre;
    status: BookStatus;
    coverImageUrl?: string;
}
