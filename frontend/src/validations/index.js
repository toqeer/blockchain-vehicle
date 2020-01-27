// REGISTERATION

export const signUpUser = {
	firstName: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	lastName: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	email: {
		email: true
	},
	title: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	mobilePhone: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	homePhone: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	password: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	gender: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	city: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	country: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	nic: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	region: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	street: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	postalCode: {
		presence: true,
		length: 5
	},

};

export const signUpMake = {
	companyId: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	title: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	mobilePhone: {
		presence: true,
		length: {
			minimum: 1
		}
	},

	password: {
		presence: true,
		length: {
			minimum: 1
		}
	},

	city: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	country: {
		presence: true,
		length: {
			minimum: 1
		}
	},

	region: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	street: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	postalCode: {
		presence: true,
		length: 5
	}
};

export const registerVehicleSchema = {
	vIv: {
		presence: true
	},
	make: {
		presence: true
	},
	modelType: {
		presence: true
	}
	// make: {
	// 	presence: true
	// },
	// make: {
	// 	presence: true
	// },
	// make: {
	// 	presence: true
	// },
	// make: {
	// 	presence: true
	// },
	// make: {
	// 	presence: true
	// },
	// make: {
	// 	presence: true
	// },
};
//sign up takaful

export const signUpTakaful = {

	
	title: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	mobilePhone: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	password: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	city: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	country: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	region: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	street: {
		presence: true,
		length: {
			minimum: 1
		}
	},
	postalCode: {
		presence: true,
		length: 5
	},
	companyId: {
		presence: true,
		length: {
			minimum: 1
		}
	},
};