import React from "react";
import { Form, Button } from "semantic-ui-react";
import validate, { isEmpty } from "validate.js";
import { signUpTakaful } from "../../validations";
import Loader from "react-loaders";

const genderOptions = [
  { key: "m", value: "MALE", text: "Male" },
  { key: "f", value: "FEMALE", text: "Female" }
];
const SignupTakaful = props => {
  const {
    password,
    title,
    mobilePhone,
    city,
    country,
    region,
    street,
    postalCode,
    handleChange,
    hadleSubmit,
    handleBlur,
    touched,
	companyId,
	loading
  } = props;
  let errors = validate(
    {
      companyId,
      password,
      title,
      mobilePhone,
      city,
      country,
      region,
      street,
      postalCode
    },
    signUpTakaful
  );
  errors = errors ? errors : {};
  const required = !isEmpty(errors);

  return (
    <Form>
      <Form.Field>
        <Form.Field>
          <label>CompanyId</label>
          <Form.Input
            value={companyId}
            name="companyId"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your companyId"
          />
          {touched.companyId && (
            <small className="error">
              {errors.companyId && errors.companyId[0]}
            </small>
          )}
        </Form.Field>
        <Form.Field required>
          <label>Title</label>
          <Form.Input
            value={title}
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your username"
          />
          {touched.title && (
            <small className="error">{errors.title && errors.title[0]}</small>
          )}
        </Form.Field>
        <Form.Field required>
          <label>Mobile Phone</label>
          <Form.Input
            value={mobilePhone}
            name="mobilePhone"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your mobile Phone"
          />
          {touched.mobilePhone && (
            <small className="error">
              {errors.mobilePhone && errors.mobilePhone[0]}
            </small>
          )}
        </Form.Field>

        <Form.Field required>
          <label>Street #</label>
          <Form.Input
            value={street}
            name="street"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your street"
          />
          {touched.street && (
            <small className="error">{errors.street && errors.street[0]}</small>
          )}
        </Form.Field>
        <Form.Field required>
          <label>Zip Code</label>
          <Form.Input
            value={postalCode}
            name="postalCode"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your postal code"
          />
          {touched.postalCode && (
            <small className="error">
              {errors.postalCode && errors.postalCode[0]}
            </small>
          )}
        </Form.Field>
        <Form.Field required>
          <label>City</label>
          <Form.Input
            value={city}
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your city"
          />
          {touched.city && (
            <small className="error">{errors.city && errors.city[0]}</small>
          )}
        </Form.Field>
        <Form.Field required>
          <label>State</label>
          <Form.Input
            value={region}
            name="region"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your region"
          />
          {touched.region && (
            <small className="error">{errors.region && errors.region[0]}</small>
          )}
        </Form.Field>
        <Form.Field required>
          <label>Country</label>
          <Form.Input
            value={country}
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Your country"
          />
          {touched.country && (
            <small className="error">
              {errors.country && errors.country[0]}
            </small>
          )}
        </Form.Field>

        <Form.Field required>
          <label>Password</label>
          <Form.Input
            value={password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your passwoord"
          />
          {touched.password && (
            <small className="error">
              {errors.password && errors.password[0]}
            </small>
          )}
        </Form.Field>

        <Form.Field>
          <Form.Checkbox label="I agree to the terms and conditions and policy." />
        </Form.Field>
        <Button className="signup" onClick={hadleSubmit} disabled={loading || required}>
          
		  {loading ? (
                  <Loader type="ball-pulse" active={loading} />
                ) : (
                  "Create"
                )}
        </Button>
      </Form.Field>
    </Form>
  );
};

export default SignupTakaful;
