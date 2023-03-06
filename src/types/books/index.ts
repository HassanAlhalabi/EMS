
export interface NewBook {
    nameAr: string,
    nameEn: string,
    authorNameAr: string,
    authorNameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    cover: string,
    categories: string[]
}

export interface Book {
    id: string,
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    imagePath: string,
    subCategories: string[],
    superCategoryId: string
}

export interface BookCategory {
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
    image: string,
    superCategoryId: string | null
}