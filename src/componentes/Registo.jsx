// src/components/RegistrationForm.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Apenas a função de registro
import { doc, setDoc } from "firebase/firestore"; // Funções para Firestore: referência e escrita de documento
import { auth, db } from "../firebase/Inicializacao"; // Importamos auth E db

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
    e.preventDefault(); // Evita o recarregamento da página
    setError(null); // Limpa erros anteriores
    setSuccess(false); // Limpa status de sucesso anterior
    setLoading(true); // Começa o indicador de carregamento

    try {
      // PASSO 1: Criar o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // Obtém o objeto do usuário recém-criado
      const userId = user.uid; // Obtém o UID único do usuário

      console.log("Usuário autenticado criado com sucesso! UID:", userId);

      // PASSO 2: Salvar as informações adicionais no Firestore
      // Criamos uma referência para o documento na coleção 'users'
      // usando o UID do usuário como o ID do documento.
      const userDocRef = doc(db, "users", userId);

      // Dados a serem salvos no Firestore
      const userData = {
        name: name,
        occupation: occupation,
        organization: organization,
        email: user.email, // Opcional: salvar o email também no Firestore
        createdAt: new Date(), // Opcional: adicionar timestamp de criação
      };

      // Usamos setDoc para criar (ou sobrescrever) o documento
      await setDoc(userDocRef, userData);

      console.log("Informações do usuário salvas no Firestore com sucesso!");

      // Se tudo deu certo
      setSuccess(true);
      // Limpar o formulário após o sucesso (opcional)
      setEmail("");
      setPassword("");
      setName("");
      setOccupation("");
      setOrganization("");
    } catch (error) {
      // Tratamento de erros
      console.error("Erro durante o registro:", error);
      let errorMessage = "Ocorreu um erro desconhecido durante o registro.";

      // Mapear códigos de erro comuns do Firebase Auth
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
        // Adicione outros casos de erro do Auth ou Firestore se necessário
        default:
          // Se for um erro do Firestore ou outro, mostre a mensagem padrão
          errorMessage = error.message;
          break;
      }
      setError(errorMessage);
    } finally {
      // Isso executa independentemente de sucesso ou erro
      setLoading(false); // Remove o indicador de carregamento
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
