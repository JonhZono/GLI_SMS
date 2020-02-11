import React from 'react';

const FormField = ({ formData, change, id }) => {
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <input
            className='inputStyleConfig'
            {...formData.config}
            value={formData.value}
            onChange={event => change({ event, id })}
          />
        );
        break;

      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
