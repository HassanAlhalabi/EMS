
export interface NewBook {
    nameAr: string,
    nameEn: string,
    authorNameAr: string,
    authorNameEn: string,
    descriptionAr: string | null,
    descriptionEn: string | null,
    cover: string | null | File,
    categoryIds: {label: string, value: string}[],
    updateImage?: boolean,
    attachment: File | null,
    imagePath: string
}

export interface FullBook {
    attachment: File | null;
    authorNameAr: string,
    authorNameEn: string,
    categories: {id: string, name: string}[],
    cover: null | File;
    descriptionAr: string | null,
    descriptionEn: string | null,
    id: string,
    isActive: boolean
    nameAr: string,
    nameEn: string,
    thumbnail: string | null;
}

export interface Book {
    id: string,
    name: string,
    description: string,
    cover: string,
    authorName: string,
    isActive: boolean
}

export interface BookCategory {
    id: string
    name: string,
    imagePath: string,
}

export interface BookFullCategory {
    id: string
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    imagePath: string,
    subCategories: string[],
    superCategoryId: string
}

export interface NewBookCategory {
    nameAr: string,
    nameEn: string,
    image?: File | null,
    superCategoryId: string,
    imagePath?: string
    updateImage?: boolean
}