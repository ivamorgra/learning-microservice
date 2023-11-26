interface FormInputs {
    email: string
    password: string
}

interface MaterialInputs {
    title: string
    description: string
    price: number
    purchasers: mongoose.Types.ObjectId[]
    file: string
    type: 'book' | 'article' | 'presentation' | 'exercises'
}
