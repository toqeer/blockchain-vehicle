import React from "react";
import { Form, Button } from "semantic-ui-react";
import validate, { isEmpty } from "validate.js";
import { signUpMake } from "../../validations";
import Loader from "react-loaders";

const ManufacturerSignUp = props => {
  const {
    title,
    companyId,
    mobilePhone,
    street,
    country,
    city,
    region,
    postalCode,
    password,
    hadleSubmit,
    handleChange,
    touched,
    handleBlur,
    loading
  } = props;
  let errors = validate(
    {
      title,
      companyId,
      mobilePhone,
      street,
      country,
      city,
      region,
      postalCode,
      password
    },
    signUpMake
  );
  errors = errors ? errors : {};

  const required = !isEmpty(errors);
  return (
    <Form>
      <Form.Field>
        <label>Title</label>
        <Form.Input
          placeholder="Enter your Title"
          value={title}
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.title && (
          <small className="error">{errors.title && errors.title[0]}</small>
        )}
      </Form.Field>
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
      <Form.Field>
        <label>Mobile Phone</label>
        <Form.Input
          value={mobilePhone}
          name="mobilePhone"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Mobile Phone"
        />
        {touched.mobilePhone && (
          <small className="error">
            {errors.mobilePhone && errors.mobilePhone[0]}
          </small>
        )}
      </Form.Field>

      <Form.Field>
        <label>Street #</label>
        <Form.Input
          value={street}
          name="street"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Street #"
        />
        {touched.street && (
          <small className="error">{errors.street && errors.street[0]}</small>
        )}
      </Form.Field>
      <Form.Field>
        <label>Zip Code</label>
        <Form.Input
          value={postalCode}
          name="postalCode"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Zip Code"
        />
        {touched.postalCode && (
          <small className="error">
            {errors.postalCode && errors.postalCode[0]}
          </small>
        )}
      </Form.Field>
      <Form.Field>
        <label>City</label>
        <Form.Input
          value={city}
          name="city"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your City"
        />
        {touched.city && (
          <small className="error">{errors.city && errors.city[0]}</small>
        )}
      </Form.Field>
      <Form.Field>
        <label>State</label>
        <Form.Input
          value={region}
          name="region"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your State"
        />
        {touched.region && (
          <small className="error">{errors.region && errors.region[0]}</small>
        )}
      </Form.Field>
      <Form.Field>
        <label>Country</label>
        <Form.Input
          value={country}
          name="country"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Country"
        />
        {touched.country && (
          <small className="error">{errors.country && errors.country[0]}</small>
        )}
      </Form.Field>

      <Form.Field>
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
      <Button
        className="signup"
        onClick={hadleSubmit}
        disabled={!isEmpty(errors)}
      >
        {loading ? (
                  <Loader type="ball-pulse" active={loading} />
                ) : (
                  "Create"
                )}
      </Button>
    </Form>
  );
};

export default ManufacturerSignUp;
