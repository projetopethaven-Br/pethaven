import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import {
  EmailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
  LoginRounded,
  PetsRounded,
  CalendarMonthRounded,
  VaccinesRounded,
  RestaurantRounded
} from "@mui/icons-material";

import Logo from "../../components/Logo/Logo";
import "./Login.css";

/*
  ARQUIVO INICIAL GERADO PARA O PETHAVEN.

  IMPORTANTE:
  Este arquivo foi preparado para ser substituído pelo componente atual.
  Mantive a estrutura simples para evitar dependências desconhecidas
  do restante do projeto (hooks, auth, rotas etc.).

  A integração da autenticação deve ser ligada à função handleLogin().
*/

export default function Login(){
  const navigate = useNavigate();
  const [email,setEmail]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [showPassword,setShowPassword]=React.useState(false);
  const [remember,setRemember]=React.useState(true);
 const [error, setError] = React.useState("");

const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
console.log("Usuário logado:", auth.currentUser);
        navigate("/dashboard");

    } catch (err) {

        console.error(err);

        setError("E-mail ou senha inválidos.");

    }
};

  return(
<div className="login-page">

<div className="login-presentation">

<div className="login-presentation__glow login-presentation__glow--top"/>
<div className="login-presentation__glow login-presentation__glow--bottom"/>

<div className="login-presentation__content">

<Logo width={340}/>

<div className="login-presentation__message">

<div className="login-presentation__badge">
Plataforma SaaS para Hotéis e Creches Pet
</div>

<h1>A infraestrutura digital da vida do pet.</h1>

<p>
Centralize check-ins, hospedagens, alimentação, medicamentos,
vacinas e comunicação com os tutores em uma única plataforma.
</p>

<ul className="login-benefits">
<li><PetsRounded fontSize="small"/> Cadastro inteligente</li>
<li><CalendarMonthRounded fontSize="small"/> Agenda integrada</li>
<li><VaccinesRounded fontSize="small"/> Controle de vacinas</li>
<li><RestaurantRounded fontSize="small"/> Alimentação e medicação</li>
</ul>

</div>

<div className="login-presentation__preview">
<strong>Dashboard Preview</strong>
</div>

<div className="login-presentation__footer">
© 2026 PetHaven
</div>

</div>

</div>

<div className="login-access">

<Card className="login-card">
<CardContent>

<div className="login-card__icon">
<LoginRounded/>
</div>

<div className="login-card__heading">
<Typography variant="h4">Bem-vindo</Typography>
<Typography>
Entre com suas credenciais para acessar o sistema.
</Typography>
</div>

{error && <Alert severity="error">{error}</Alert>}

<Box component="form" className="login-form" onSubmit={handleLogin}>

<TextField
label="E-mail"
value={email}
onChange={(e)=>setEmail(e.target.value)}
InputProps={{
startAdornment:<InputAdornment position="start"><EmailRounded/></InputAdornment>
}}
/>

<TextField
label="Senha"
type={showPassword?"text":"password"}
value={password}
onChange={(e)=>setPassword(e.target.value)}
InputProps={{
startAdornment:<InputAdornment position="start"><LockRounded/></InputAdornment>,
endAdornment:
<InputAdornment position="end">
<IconButton onClick={()=>setShowPassword(!showPassword)}>
{showPassword?<VisibilityOff/>:<Visibility/>}
</IconButton>
</InputAdornment>
}}
/>

<FormControlLabel
control={
<Checkbox
checked={remember}
onChange={(e)=>setRemember(e.target.checked)}
/>
}
label="Lembrar de mim"
/>

<Button
type="submit"
variant="contained"
size="large"
className="login-form__submit">
Entrar
</Button>

</Box>

</CardContent>
</Card>

</div>

</div>
  );
}