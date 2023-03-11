
export interface NewBook {
    nameAr: string,
    nameEn: string,
    authorNameAr: string,
    authorNameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    cover: File | null,
    categoryId: string[]
}

export interface FullBook {
    id: string,
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    imagePath: string,
    subCategories: string[],
    superCategoryId: string
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
    image: File | null,
    superCategoryId: string
}