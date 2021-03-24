import { ValidationError } from 'yup';

interface Errors{
    [ key: string]: string; 
    // fazendo isso, você garante que em ambos os lados pode se receber qualquer valor( qualquer string )
}

export default function getValidationErrors(err: ValidationError): Errors{
    const validationErrors: Errors = {};

    err.inner.forEach(error => { 
        if (error.path) {
            validationErrors[error.path] = error.message;
        }
    });

    return validationErrors;
}