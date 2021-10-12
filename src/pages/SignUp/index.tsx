// eslint-disable-next-line
import React, { useCallback, useRef } from 'react';
import { FiLock, FiArrowLeft, FiMail, FiUser } from 'react-icons/fi';
import { Form }from '@unform/web';
import { FormHandles }from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, AnimationContainer, Content, Background } from './styles';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null); // useRef me da o contato direto as informações do form

    const handleSubmit = useCallback(async (data: object) => {
        try{
            formRef.current?.setErrors({}); 
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(5, 'No mínimo 5 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        } catch(err){
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);   
        }
    }, [ ]);

    return ( 
        <Container>
            <Background />
            <Content>
                    <AnimationContainer>
                    <img src={logoImg} alt="Gobarber" />

                    <Form ref={formRef} onSubmit={ handleSubmit }>

                        <h1> Faça seu cadastro </h1>

                        <Input name="name" icon={FiUser} placeholder="nome"/>   

                        <Input name="email" icon={FiMail} placeholder="E-mail"/>   

                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                        <Button type="submit">Cadastrar</Button>

                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
}



export default SignUp;