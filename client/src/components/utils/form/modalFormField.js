import React from 'react';

const ModalFormField = ({ formData, change, id }) => {
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <input
            className='input'
            {...formData.config}
            value={formData.value}
            onChange={event => change({ event, id })}
          />
        );
        break;

      case 'select':
        formTemplate = (
          <div className='control'>
            <div className='select'>
              <select
                value={formData.value}
                onChange={event => change({ event, id })}
              >
                <option value=''>Select Privilege</option>
                {formData.config.options.map(item => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
        break;

      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default ModalFormField;
