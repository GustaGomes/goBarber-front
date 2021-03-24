import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
    /* todos os filhos ( abaixo ) também vão ter o tamnho total da tela ( height: 100vh; ) */
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
    /* place-content:center;  o place-content alinha todo conteudo no centro ( tendo o mesmo efeito que o justify - aling-items ) */
    width: 100%;
    max-width: 700px;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
    }

    h1 {
        margin-bottom: 24px;
    }

    button {
        background: #ff9000;
        height: 56px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        color: #312e38;
        width: 100%;
        font-weight: 500;
        margin-top: 16px;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade( 0.2,  '#ff9000')};
            /* o shade vai escurecer 20% da cor do bottão  */
        }
    }

    a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: ${shade( 0.2,  '#f4ede8')};
            /* o shade vai escurecer 20% da cor do bottão  */
        }
    }

    > a {  /* usando o    " > a "  ele vai verificar e colocar estilo somente no link que for fora do form */
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        display: flex;
        align-items: center;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade( 0.2,  '#ff9000')};
        }
    }

`;

export const Background = styled.div`
    flex: 1; /* o flex 1 vai ocupar todo espaco, menos o espaco do content */
    background: url(${signUpBackgroundImg}) no-repeat center;
    background-size:cover; /* esse vai cobrir o tamanho que tem sobrando na tela ( caso a img não tenha o tamanho todo ) */

`;
