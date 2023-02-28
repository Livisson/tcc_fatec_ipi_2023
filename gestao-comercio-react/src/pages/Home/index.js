import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './style.css';
import { FaUser } from 'react-icons/fa';
import LogoCompre from "../../LogoCompre.png"

const Signin = () => {

  const { signin, signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signout();
  }, [signout]);

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!nome | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    //const res = signin(nome, senha);

    signin(nome, senha)
      .then((res) => {
        console.log(res)
        if (res) {
          setError(res);
          return;
        }
        navigate("/despesas");
      })
      .catch((error) => {
        console.log(error.toString())
        setError(error.toString().replace('Error: ', ''));
      });

    /*console.log(res)
    if (res) {
      setError(res);
      return;
    }

    navigate("/despesas");*/

  };
  
  return (
    <C.ContentCapa>
      <C.Container>
        <C.ContentImg>
          <img src={LogoCompre} alt="Logo" />
        </C.ContentImg>
        <C.Content>
        <C.Label>
          LOGIN  
          <FaUser size={16} />
        </C.Label>
          <Input
            type="text"
            placeholder="Digite seu Nome"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" onClick={handleLogin} />
          <C.LabelSignup>
            <C.Strong>
              <Link to="/esqueceuSenha">Esqueceu a senha? Clique aqui!</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.Content>
      </C.Container>
    </C.ContentCapa>
  );
};

export default Signin;