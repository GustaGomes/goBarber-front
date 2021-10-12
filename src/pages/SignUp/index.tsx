// eslint-disable-next-line
import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLock, FiArrowLeft, FiMail, FiUser } from 'react-icons/fi';
import { Form }from '@unform/web';
import { FormHandles }from '@unform/core';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.svg';


import { Container, AnimationContainer, Content, Background } from './styles';

interface SignUpFormData {
    name: string,
    email: string,
    password: string,
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null); // useRef me da o contato direto as informações do form
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
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

            await api.post('/users', data);

            history.push('/');

            addToast({
                type:'success',
                title:'Cadastro realizado com sucesso!',
                description:'Você ja pode fazer seu logon',
            })

        } catch(err){
                if(err instanceof Yup.ValidationError){
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors); 
                    return;
                }
                // disparar toast
                addToast({
                    type: 'error',
                    title: 'Erro no Cadastro',
                    description: 'Ocorreu um erro o fazer cadastro, cheque as credenciais'
                });
            }
    }, [ addToast, history ]);

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