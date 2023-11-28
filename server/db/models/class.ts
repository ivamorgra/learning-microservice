import mongoose from 'mongoose'

const { Schema } = mongoose

interface IClass {
    title: string //Title of the class
    description: string //Description of the class
    order: number //If is the first class of the course, or the second...
    file: string //ID of the file in the blob-storage database
}

interface ClassDoc extends mongoose.Document {
    title: string
    description: string
    order: number
    file: string
}

interface ClassModelInterface extends mongoose.Model<ClassDoc> {
    build(attr: IClass): ClassDoc
}

const classSchema = new Schema({
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
        maxLength: 520,
    },
    order: {
        type: Number,
        required: true,
        min: 1,
    },
    file: {
        type: String,
        required: true,
    },
});

classSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    },
})

classSchema.statics.build = (classData: IClass) => {
    return new Class(classData)
}

const Class = mongoose.model<ClassDoc, ClassModelInterface>(
    'Class',
    classSchema)

export { Class };