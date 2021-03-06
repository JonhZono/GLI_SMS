import React from 'react';

const DueFeeFormField = ({ formData, change, id }) => {
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
      case 'textarea':
        formTemplate = (
          <div className='field is-horizontal'>
            {formData.showLabel ? (
              <div
                className='field-label is-normal'
                style={{
                  textAlign: 'left',
                  marginTop: '0.2rem',
                  color: '#004973'
                }}
              >
                <label>
                  <i className='fas fa-star-half-alt' />
                  &nbsp;&nbsp;{formData.config.label}
                </label>
              </div>
            ) : null}
            <div className='control'>
              <textarea
                className='textarea'
                {...formData.config}
                value={formData.value}
                onChange={event => change({ event, id })}
              />
            </div>
          </div>
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
                <option value=''>Select Month</option>
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

export default DueFeeFormField;
