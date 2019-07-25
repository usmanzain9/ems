const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  fnameField: Joi.string()
    .min(3)
    .max(30)
    .required()
    .label("First Name"),
  lnameField: Joi.string()
    .min(3)
    .max(30)
    .required()
    .label("Last Name"),
  addressField: Joi.string()
    .required()
    .label("Address"),
  phoneField: Joi.number()
    .integer()
    .label("Phone number")
    .min(10000000000)
    .max(99999999999),

  cnicField: Joi.number()
    .integer()
    .positive()
    .allow(0)
    .min(1000000000000)
    .max(9999999999999)
    .label("CNIC")
    .required(),
  wageField: Joi.number()
    .integer()
    .positive()
    .required()
    .label("Wage")
});

const schema2 = Joi.object().keys({
  loanField: Joi.number()
    .integer()
    .positive()
    .required()
    .label("Loan amount")
});

export function validate(data) {
  const error = Joi.validate(
    {
      fnameField: data.fName,
      lnameField: data.lName,
      addressField: data.address,
      phoneField: data.phone,
      cnicField: data.cnic,
      wageField: data.wage
    },
    schema,
    { abortEarly: false }
  );
  return error;
}

export function validateLoad(data) {
  const error = Joi.validate(
    {
      loanField: data
    },
    schema2
  );
  return error;
}
