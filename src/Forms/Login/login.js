import React from 'react';
import Input from '../../component/Input.js';
import '../../assets/styles/form.css';
import style from '../../assets/styles/Login.module.scss';
import Title from '../../component/title.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config-firebase/firebase.js';
import { GlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import Error from '../../component/error.js';
import TextKeyboard from '../../component/Textkeyboard.js';
import useFormValidation from '../../Hooks/useFormValidation.js';
import MainLogin from './MainLogin.js';

function Login() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState(false);
  const [showNameKeyboard, setShowNameKeyboard] = React.useState(false);
  const [showEmailKeyboard, setShowEmailKeyboard] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [showPasswordlKeyboard, setShowPasswordKeyboard] =
    React.useState(false);
  const global = React.useContext(GlobalContext);
  const { form, setForm, error, handleChange, handleBlur, clientFinded } =
    useFormValidation({
      email: '',
      password: '',
    });

  const handleFocus = (e) => {
    const { id, value } = e.target;
    if (id === 'password') {
      setShowPasswordKeyboard(true);
      setShowEmailKeyboard(false);
    } else if (id === 'email') {
      setShowPasswordKeyboard(false);
      setShowEmailKeyboard(true);
    }
  };
  const addCharacter = (char, id) => {
    if (char === 'clearField') {
      // Limpar o campo CPF
      setForm((prev) => ({ ...prev, id: '' }));

      // Criar e passar o evento sintético para handleChange com o campo vazio
      const syntheticEvent = {
        target: {
          id: id,
          value: '', // Campo vazio
        },
      };
      handleChange(syntheticEvent); // Disparar o handleChange com o campo limpo
      return; // Evitar adicionar mais caracteres após limpar o campo
    }

    if (char === 'Bcksp') {
      // Limpar o campo CPF
      setForm((prev) => ({
        ...prev,
        [id]: prev[id].slice(0, -1), // Remove a última letra
      }));

      // Criar e passar o evento sintético para handleChange com o campo vazio
      const syntheticEvent = {
        target: {
          id: id,
          value: form[id].slice(0, -1), // Campo vazio
        },
      };
      handleChange(syntheticEvent); // Disparar o handleChange com o campo limpo
      return; // Evitar adicionar mais caracteres após limpar o campo
    }

    let newValue = '';
    // Adicionar o novo caractere ao valor atual do CPF
    if (id === 'password') {
      newValue = form.password + char;
    } else if (id === 'email') {
      newValue = form.email + char;
    }

    // Criar e passar o evento sintético para handleChange com o novo valor
    const syntheticEvent = {
      target: {
        id: id,
        value: newValue,
      },
    };

    handleChange(syntheticEvent);
  };

  const closeKeyboard = (Value, id) => {
    if (id === 'password') {
      showPasswordlKeyboard(false);
      const syntheticEvent = {
        target: {
          id: 'password',
          value: Value,
        },
      };
      handleBlur(syntheticEvent);
    }

    if (id === 'email') {
      showEmailKeyboard(false);
      const syntheticEvent = {
        target: {
          id: 'email',
          value: Value,
        },
      };
      handleBlur(syntheticEvent);
    }
  };

  // function handleChange({ target }) {
  //   const { id, value } = target;
  //   setForm({ ...form, [id]: value, [id]: value });
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      localStorage.setItem('token', JSON.stringify(user.accessToken));
      navigate('/admin');

      //navigate("/admin");
    } catch (error) {
      setErrorMessage(true);
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 p-3 bg-body-tertiar">
      <div className={style.containerCloseBtn}>
        <button onClick={() => navigate('/')}>X</button>
      </div>
      <Title mainTitle="Login Administrador" />
      {errorMessage && (
        <Error
          setErrorPopup={setErrorMessage}
          error={{ login: 'Sua senha ou email estão incorretos' }}
        />
      )}
      <div className={style.MainloginContainer}>
        {register && (
          <MainLogin
            setErrorPopup={setRegister}
            error={{ register: 'Você precisa registrar uma conta' }}
            setClose={setRegister}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="m-1">
        <Input
          id="email"
          label="email"
          autoComplete="off"
          value={form.email}
          type="email"
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {showEmailKeyboard && global.isToten && (
          <TextKeyboard
            addCharacter={addCharacter}
            id="email"
            closeKeyboard={() => closeKeyboard(form.email, 'email')}
          />
        )}

        <Input
          id="password"
          autoComplete="off"
          label="Password"
          value={form.password}
          type="password"
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {showPasswordlKeyboard && global.isToten && (
          <TextKeyboard
            addCharacter={addCharacter}
            id="password"
            closeKeyboard={() => closeKeyboard(form.password, 'password')}
          />
        )}

        <button className="btn btn-primary">Enviar</button>
      </form>
      <div className={style.registerContainer}>
        <p>Não tem uma conta? </p>
        <button onClick={() => setRegister(true)}>Registrar</button>
      </div>
    </div>
  );
}

export default Login;
