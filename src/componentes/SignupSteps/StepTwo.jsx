const StepTwo = ({ formData, updateForm, next, back }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Etapa 2 - Dados Profissionais</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="space-y-4"
      >
        <select
          value={formData.occupation}
          onChange={(e) => updateForm("occupation", e.target.value)}
          required
          className="input-style"
        >
          <option value="">Selecione a profissão</option>
          <option value="Estudante">Estudante</option>
          <option value="Professor">Professor</option>
          <option value="Investigador">Investigador</option>
        </select>
        <input
          type="text"
          placeholder="Organização"
          required
          value={formData.organization}
          onChange={(e) => updateForm("organization", e.target.value)}
          className="input-style"
        />
        <div className="flex justify-between">
          <button type="button" onClick={back} className="btn-style">
            Voltar
          </button>
          <button type="submit" className="btn-style">
            Próximo
          </button>
        </div>
      </form>
    </div>
  );
};
export default StepTwo;
