import { User } from './models/user'
import { Material } from './models/material'
import { Class } from './models/class'

import mongoose from 'mongoose'


const authorId1 = new mongoose.Types.ObjectId('60d5ecb44b930ac130e82d7e')
const authorId2 = new mongoose.Types.ObjectId()
const authorId3 = new mongoose.Types.ObjectId()
const authorId4 = new mongoose.Types.ObjectId()
const authorId5 = new mongoose.Types.ObjectId()

function populateUsers() {
    User.build({
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123',
    }).save()

    User.build({
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123',
    }).save()
}

function populateMaterial() {
    Material.build({
        title: 'Ejercicios de Python',
        description: 'Ejercicios para practicar Python básico',
        price: 0,
        author: authorId1,
        purchasers: [authorId2, authorId3],
        file: 'fileId',
        type: 'book',
    }).save()

    Material.build({
        title: 'Ejercicios de Java',
        description: 'Ejercicios para practicar Java avanzado',
        price: 0,
        author: authorId2,
        purchasers: [authorId1, authorId4],
        file: 'fileId2',
        type: 'exercises',
    }).save()

    Material.build({
        title: 'Cómo aprender JavaScript en 10 días',
        description: '¿Quieres aprender JavaScript? ¡Este es tu libro!',
        price: 50.5,
        author: authorId3,
        purchasers: [authorId2, authorId1],
        file: 'fileId47',
        type: 'book',
    }).save()

    Material.build({
        title: 'Computación cuántica - Un mundo nuevo',
        description: 'Introducción a la computación cuántica',
        price: 29.9,
        author: authorId4,
        purchasers: [authorId2, authorId3],
        file: 'fileId',
        type: 'book',
    }).save()

    Material.build({
        title: 'Ejercicios de C',
        description: 'Ejercicios para practicar C',
        price: 0,
        author: authorId5,
        purchasers: [authorId4],
        file: 'fileId',
        type: 'exercises',
    }).save()

    Material.build({
        title: 'Computación cuántica - segunda parte',
        description: 'Puertas lógicas e IA',
        price: 39.99,
        author: authorId1,
        purchasers: [authorId2, authorId3, authorId4],
        file: 'fileId',
        type: 'book',
    }).save()
}

function populateClass(){
    Class.build({
        title: 'Clase 1',
        description: 'Datos no estructurados',
        order: 1,
        file: 'fileId',
    }).save()

    Class.build({
        title: 'Clase 2',
        description: 'Los datalakes',
        order: 2,
        file: 'fileId',
    }).save()
}

async function populateDB() {
    console.log('Populating DB...')

    if (process.env.NODE_ENV !== 'production') {
        User.collection.countDocuments().then((count) => {
            if (count === 0) {
                populateUsers()
            }
        })
        Material.collection.countDocuments().then((count) => {
            if (count === 0) {
                populateMaterial()
            }
        })
        Class.collection.countDocuments().then((count) => {
            if (count === 0) {
                populateClass()
            }
        })
    }

    console.log('Populated!')
}

export default populateDB
