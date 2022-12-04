import { model, Schema, Types } from 'mongoose';

export type ProtoResourceI = {
    title?: string;
    subject?: SubjectI;
    grade?: GradeI;
    description?: string;
    pages?: string;
    price?: number;
    format?: string;
    owner?: Types.ObjectId;
};

export type ResourceI = {
    title: string;
    subject: SubjectI;
    grade: GradeI;
    description: string;
    pages: string;
    price?: number;
    format: string;
    owner: Types.ObjectId;
    id: Types.ObjectId;
};

export type SubjectI =
    | 'math'
    | 'reading'
    | 'science'
    | 'writing'
    | 'pe'
    | 'arts';

export type GradeI =
    | 'kinder'
    | 'first'
    | 'second'
    | 'third'
    | 'fourth'
    | 'fifth'
    | 'sixth';

enum EnumSubject {
    math = 'math',
    reading = 'reading',
    science = 'science',
    writing = 'writing',
    pe = 'pe',
    arts = 'arts',
}

enum EnumGrade {
    kinder = 'kinder',
    first = 'first',
    second = 'second',
    third = 'third',
    forth = 'forth',
    fifth = 'fifth',
    sixth = 'sixth',
}

export const resourceSchema = new Schema<ResourceI>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    grade: {
        type: String,
        required: true,
        enum: Object.values(EnumGrade),
    },
    subject: {
        type: String,
        required: true,
        enum: Object.values(EnumSubject),
    },
    description: String,
    pages: String,
    price: Number,
    format: {
        type: String,
        set: (title: string) => `${URL}/${title}`,
    },
    owner: {
        name: String,
        email: String,
        role: String,
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

resourceSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});
export const ResourceModel = model<ResourceI>(
    'resource',
    resourceSchema,
    'resources'
);
