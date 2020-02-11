export const updates = (element, formData, formName) => {
  let newFormData = { ...formData };
  let newElement = { ...newFormData[element.id] };

  newElement.value = element.event.target.value;
  newFormData[element.id] = newElement;

  return newFormData;
};
export const generateFormData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value;
  }
  return dataToSubmit;
};

export const populateFormField = (formData, arrayData = [], field) => {
  let newArray = [];
  let newFormData = { ...formData };

  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });

  newFormData[field].config.options = newArray;
  
  return newFormData;
};

export const populateFields = (formData, fields) => {
  for (let key in formData) {

    formData[key].value = fields[key];

  }
  return formData;
};
