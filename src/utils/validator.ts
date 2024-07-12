import CustomError from "./customError";

export const validate = async (schema, data) => {
    const { error } = schema.validate(data);

    if (error) {
        const message = error.details.map(i => i.message).join(',');
        throw new CustomError(message, 422);
    }

    return true;
}