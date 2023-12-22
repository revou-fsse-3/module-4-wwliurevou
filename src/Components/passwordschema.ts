
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),

});

