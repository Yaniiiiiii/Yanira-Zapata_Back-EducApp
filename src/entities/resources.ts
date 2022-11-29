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
};

export type SubjectI = {
    math: string;
    reading: string;
    science: string;
    writing: string;
    pe: string;
    arts: string;
};

export type GradeI = {
    kinder: string;
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
};

export const resourceSchema = new Schema<ResourceI>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    grade: {
        type: {},
        required: true,
    },
    subject: {
        type: {},
        required: true,
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
