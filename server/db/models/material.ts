import mongoose from 'mongoose'

const { Schema } = mongoose

interface IMaterial {
    title: string // Title of the material
    description: string // Description of the material
    price: number // Price of the material
    author: mongoose.Types.ObjectId // ID of the user who uploaded the material
    purchasers: mongoose.Types.ObjectId[] // Array of user IDs that have purchased the material
    file: string // ID of the file in the blob-storage database
    type: 'book' | 'article' | 'presentation' | 'exercises' // Type of the file
}

interface MaterialDoc extends mongoose.Document {
    title: string
    description: string
    price: number
    author: mongoose.Types.ObjectId
    purchasers: mongoose.Types.ObjectId[]
    file: string
    type: 'book' | 'article' | 'presentation' | 'exercises'
}

interface MaterialModelInterface extends mongoose.Model<MaterialDoc> {
    build(attr: IMaterial): MaterialDoc
}

const materialSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 140,
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    purchasers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    },
    file: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: {
            values: ['book', 'article', 'presentation', 'exercises'],
            message: '{VALUE} is not supported',
        },
        required: true,
    },
})

const validateAuthorAmongPurchasers = async function (this: MaterialDoc) {
    const isAuthorAmongPurchasers = this.purchasers.includes(this.author)

    if (isAuthorAmongPurchasers) {
        throw new Error('Author cannot be among the purchasers')
    }
}

materialSchema.pre('save', validateAuthorAmongPurchasers)

materialSchema.statics.build = (material: IMaterial) => {
    return new Material(material)
}

const Material = mongoose.model<MaterialDoc, MaterialModelInterface>(
    'Material',
    materialSchema
)

export { Material }
