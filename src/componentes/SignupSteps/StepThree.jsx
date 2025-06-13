const StepThree = ({ formData, updateForm, back, submit, loading, error }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Etapa 3 - Segurança</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="space-y-4"
      >
        <input
          type="password"
          placeholder="Senha"
          required
          value={formData.password}
          onChange={(e) => updateForm("password", e.target.value)}
          className="input-style"
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          required
          value={formData.confirmPassword}
          onChange={(e) => updateForm("confirmPassword", e.target.value)}
          className="input-style"
        />
        {error && <p className="text-red-400">{error}</p>}
        <div className="flex justify-between">
          <button type="button" onClick={back} className="btn-style">
            Voltar
          </button>
          <button type="submit" disabled={loading} className="btn-style">
            {loading ? "Criando..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default StepThree;
