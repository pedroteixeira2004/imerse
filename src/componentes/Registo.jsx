// src/components/RegistrationForm.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Apenas a função de registro
import { doc, setDoc } from "firebase/firestore"; // Funções para Firestore: referência e escrita de documento
import { auth, db } from "../firebase/Inicializacao"; // Importamos auth E db
import { sendEmailVerification } from "firebase/auth";

function RegistrationForm() {
  // Estados para os campos do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [organization, setOrganization] = useState("");

  // Estados para feedback UI
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Para indicar que algo está acontecendo
  const [success, setSuccess] = useState(false); // Para indicar sucesso

  // Handlers para os inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleOccupationChange = (e) => setOccupation(e.target.value);
  const handleOrganizationChange = (e) => setOrganization(e.target.value);

  // Handler para o envio do formulário
  const handleRegistration = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userId = user.uid;

      console.log("Usuário autenticado criado com sucesso! UID:", userId);

      // ✅ Enviar verificação por e-mail
      await sendEmailVerification(user);
      console.log("E-mail de verificação enviado para:", user.email);

      const userDocRef = doc(db, "users", userId);
      const userData = {
        name,
        occupation,
        organization,
        email: user.email,
        createdAt: new Date(),
      };
      await setDoc(userDocRef, userData);

      console.log("Informações do usuário salvas no Firestore com sucesso!");

      setSuccess(true);
      alert(
        "Conta criada com sucesso! Verifique seu e-mail antes de acessar o sistema."
      );
      setEmail("");
      setPassword("");
      setName("");
      setOccupation("");
      setOrganization("");
    } catch (error) {
      console.error("Erro durante o registro:", error);
      let errorMessage = "Ocorreu um erro desconhecido durante o registro.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este e-mail já está em uso por outra conta.";
          break;
        case "auth/invalid-email":
          errorMessage = "O formato do e-mail é inválido.";
          break;
        case "auth/weak-password":
          errorMessage = "A senha deve ter pelo menos 6 caracteres.";
          break;
        default:
          errorMessage = error.message;
          break;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registrar-se</h2>

      <form onSubmit={handleRegistration}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength="6" // Boa prática, alinhado com a mensagem de erro 'auth/weak-password'
          />
        </div>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="occupation">Ocupação:</label>
          <input
            type="text"
            id="occupation"
            value={occupation}
            onChange={handleOccupationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="organization">Organização:</label>
          <input
            type="text"
            id="organization"
            value={organization}
            onChange={handleOrganizationChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Criar Conta"}
        </button>
      </form>

      {/* Exibir status */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>
          Registro bem-sucedido! Você agora está logado.
        </p>
      )}

      {/*
        Observação: Após o registro bem-sucedido com createUserWithEmailAndPassword,
        o usuário é automaticamente logado no Firebase Authentication.
        Seu aplicativo precisará de uma lógica para detectar essa mudança
        (usando onAuthStateChanged) e atualizar a UI ou redirecionar o usuário.
      */}
    </div>
  );
}

export default RegistrationForm;
