import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { NotificationPreferencesProps, NotificationPreferencesForm } from '../types/NotificationPreferences';

const initial: NotificationPreferencesForm = {
  email: "",
  frequency: 'daily',
  time: '12:00',
  categories: [],
  maxNotifications: 1,
};

const NotificationPreferencesSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  frequency: Yup.string().required(),
  time: Yup
    .string()
    .matches(
      /^([0-9]{2}):([0-9]{2})$/, "Incorrect time format")
    .test("time-range", "The time must be between 09:00 and 21:00.", (value) => {
      if (!value) return false;

      const [hours] = value.split(":").map(Number);

      return (hours >= 9 && hours <= 21);
    }),
  categories: Yup.array().min(1, "You must select at least one category to subscribe to."),
  maxNotifications: Yup.number().min(1).max(10),
})

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ onSubmit }) => {
  const handleSubmitForm = (values: NotificationPreferencesForm, { resetForm}: FormikHelpers<NotificationPreferencesForm> ) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <>
      <h2>Notification Preferences</h2>
      <Formik initialValues={initial} onSubmit={handleSubmitForm} validationSchema={NotificationPreferencesSchema}>
        {({ errors, touched, isValid, dirty }) => (
          <Form className='notification-form'>
            <label> Email for notifications:
              <Field name="email" type="email" placeholder="example@gmail.com" />
              {errors.email && touched.email ? (
                <div className='error'>{errors.email}</div>
              ) : null}
            </label>

            <label> Notification:
              <Field as="select" name="frequency">
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
              </Field>
            </label>

            <label> Time for notifications:
              <Field type="time" name="time" min="09:00" max="21:00" />
              {errors.time && touched.time ? (
                <div className='error'>{errors.time}</div>
              ) : null}
            </label>

            <p> Categories you want to subscribe:
              <label>News: <Field type="checkbox" value="news" name="categories" /></label>
              <label>Updates: <Field type="checkbox" value="updates" name="categories" /></label>
              <label>Marketing: <Field type="checkbox" value="marketing" name="categories" /></label>
              <label>Security: <Field type="checkbox" value="security" name="categories" /></label>
            </p>
            {errors.categories && touched.categories ? (
              <div className='error'>{errors.categories}</div>
            ) : null}

            <label>
              <Field type="number" name="maxNotifications" min="1" max="10" />
            </label>

            <button type="submit" disabled={!isValid || !dirty} >Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};