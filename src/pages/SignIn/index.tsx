import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail, } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, AnimationContainer,  Content, Background } from './styles';
import { Link } from 'react-router-dom';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null); // useRef me da o contato direto as informações do form

    const { signIn } = useAuth()
    const { addToast } = useToast()

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try{
                formRef.current?.setErrors({}); 

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch(err){
                if(err instanceof Yup.ValidationError){
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors); 
                    return;
                }
                // disparar toast
                addToast({
                    type: 'error',
                    title: 'Erro na Autenticação',
                    description: 'Ocorreu um erro o fazer login, cheque as credenciais'
                });
            }
    }, 
        [ signIn, addToast ]
    );

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Gobarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>

                        <h1> Faça seu logon </h1>

                        <Input 
                            name="email" 
                            icon={FiMail} 
                            placeholder="E-mail"
                        />   

                        <Input 
                            name="password"  
                            icon={FiLock} 
                            type="password" 
                            placeholder="Senha" />

                        <Button type="submit">Entrar</Button>

                        <a href="forgot"> Esqueci minha senha </a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta 
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
}

export default SignIn;