import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import validate, { isEmpty } from 'validate.js';
import { signUpUser } from '../../validations';
import Loader from "react-loaders";

const genderOptions = [ { key: 'm', value: 'MALE', text: 'Male' }, { key: 'f', value: 'FEMALE', text: 'Female' } ];
const UserSignup = (props) => {
	const {
		email,
		password,
		title,
		firstName,
		lastName,
		nic,
		gender,
		mobilePhone,
		homePhone,
		city,
		country,
		region,
		street,
		postalCode,
		handleChange,
		hadleSubmit,
		handleBlur,
		touched,
		loading
	} = props;
	let errors = validate(
		{
			email,
			password,
			title,
			firstName,
			lastName,
			nic,
			gender,
			mobilePhone,
			homePhone,
			city,
			country,
			region,
			street,
			postalCode
		},
		signUpUser
	);
	errors = errors ? errors : {};
	const required = !isEmpty(errors);

	return (
		<Form>
			<Form.Field>
				<Form.Field required>
					<label>First Name</label>
					<Form.Input
						placeholder="Enter your first name"
						value={firstName}
						name="firstName"
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{touched.firstName && <small className="error">{errors.firstName && errors.firstName[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>Last Name</label>
					<Form.Input
						value={lastName}
						name="lastName"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your last name"
					/>
					{touched.lastName && <small className="error">{errors.lastName && errors.lastName[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>Email</label>
					<Form.Input
						value={email}
						name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your email"
					/>
					{touched.email && <small className="error">{errors.email && errors.email[0]}</small>}
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
					{touched.title && <small className="error">{errors.title && errors.title[0]}</small>}
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
						<small className="error">{errors.mobilePhone && errors.mobilePhone[0]}</small>
					)}
				</Form.Field>
				<Form.Field required>
					<label>Home Phone</label>
					<Form.Input
						value={homePhone}
						name="homePhone"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your Home Phone"
					/>
					{touched.homePhone && <small className="error">{errors.homePhone && errors.homePhone[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>CNIC / ID</label>
					<Form.Input
						value={nic}
						name="nic"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your ID number"
					/>
					{touched.nic && <small className="error">{errors.nic && errors.nic[0]}</small>}
				</Form.Field>
				<Form.Field>
					<label>Gender</label>
					<Form.Select
						// value={gender}
						options={genderOptions}
						name="gender"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your ID number"
					/>
					{touched.gender && <small className="error">{errors.gender && errors.gender[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>Street #</label>
					<Form.Input
						value={street}
						name="street"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your ID number"
					/>
					{touched.street && <small className="error">{errors.street && errors.street[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>Zip Code</label>
					<Form.Input
						value={postalCode}
						name="postalCode"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your ID number"
					/>
					{touched.postalCode && <small className="error">{errors.postalCode && errors.postalCode[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>City</label>
					<Form.Input
						value={city}
						name="city"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your ID number"
					/>
					{touched.city && <small className="error">{errors.city && errors.city[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>State</label>
					<Form.Input
						value={region}
						name="region"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your ID number"
					/>
					{touched.region && <small className="error">{errors.region && errors.region[0]}</small>}
				</Form.Field>
				<Form.Field required>
					<label>Country</label>
					<Form.Input
						value={country}
						name="country"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your ID number"
					/>
					{touched.country && <small className="error">{errors.country && errors.country[0]}</small>}
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
					{touched.password && <small className="error">{errors.password && errors.password[0]}</small>}
				</Form.Field>

				<Form.Field>
					<Form.Checkbox label="I agree to the terms and conditions and policy." />
				</Form.Field>
				<Button className="signup" onClick={hadleSubmit} disabled={required}>
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

export default UserSignup;
