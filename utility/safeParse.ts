import {z} from "zod";

export const safeParse = <Schema extends z.ZodTypeAny>(schema: Schema, data: unknown): z.infer<Schema> | null => {
    const result = schema.safeParse(data);
    if (result.success === false) {
        console.log(result.error)
        return null;
    }
    return result.data;
}

const deepCopy = <T>(a: T): T => {
    return JSON.parse(JSON.stringify(a))
}





// type ToDo = {
//     title: string,
//     description: string,
// }

// type Response<Type> = {
//     statusCode: number,
//     isPending: boolean,
//     data: Type
// }

// const getToDo: Response<ToDo[]> = {
//     statusCode: 200,
//     isPending: false,
//     data: []
// }

// const PostResponse: Response<null> = {
//     statusCode: 200,
//     isPending: false,
//     data: null
// }

// const loginResponse: Response<string>  = {
//     statusCode: 200,
//     isPending: false,
//     data: "randomstring"
// } 

// // export const ZodSafeParse = (zodType: any, object: object | unknown, status: number, res: Response) => {
// //     const result = zodType.safeParse(object);
// //     if (result.success === false) {
// //         return res.status(status).json({error: result.error});
// //     }
// //     return result.data;
// // }