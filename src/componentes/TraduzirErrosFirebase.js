// firebaseErrorMessages.js
export const traduzirErroFirebase = (codigo) => {
  switch (codigo) {
    case "auth/invalid-email":
      return "The e-mail is invalid.";
    case "auth/user-not-found":
      return "User not found. Please verify your email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too much requests. Please try again later.";
    case "auth/network-request-failed":
      return "Internet error, please verify your connection.";
    case "auth/internal-error":
      return "Internal Error. Please try again later.";
    case "auth/weak-password":
      return "Password must have at least 6 characters.";
    default:
      return "Email or password is incorrect. Please try again.";
  }
};
