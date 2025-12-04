import React from 'react';
import { useCreateUsersForm } from './useCreateUsersForm';
import CreateUsersFormView from './CreateUsersFormView';

export default function CreateUsersForm({ onSubmit }) {
  const {
    activeStep,
    formData,
    errors,
    touched,
    loading,
    submitSuccess,
    submitError,
    onInputChange,
    onSelectChange,
    onCheckboxChange,
    onNext,
    onBack,
    handleFormSubmit,
    onReset,
    getJerarquiasPorCategoria,
  } = useCreateUsersForm(onSubmit);

  return (
    <CreateUsersFormView
      activeStep={activeStep}
      formData={formData}
      errors={errors}
      touched={touched}
      loading={loading}
      submitSuccess={submitSuccess}
      submitError={submitError}
      onInputChange={onInputChange}
      onSelectChange={onSelectChange}
      onCheckboxChange={onCheckboxChange}
      onNext={onNext}
      onBack={onBack}
      onSubmit={handleFormSubmit}
      onReset={onReset}
      getJerarquiasPorCategoria={getJerarquiasPorCategoria}
    />
  );
}