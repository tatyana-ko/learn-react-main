import { useState, useEffect } from "react";

export type UserProfile = {
  displayName: string;
  email: string;
  phone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
};

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => Promise<void>;
  initialData: UserProfile;
}

export function UserProfileForm({ onSubmit, initialData }: ProfileFormProps) {
  const [name, setName] = useState(initialData.displayName);
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData.phone);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (name === initialData.displayName && email === initialData.email && phone === initialData.phone) {
      setDisabled(true);
      setErrors({
        name: "",
        email: "",
        phone: "",
      });
      return;
    }
    validate();
  }, [name, email, phone]);

  //validation

  const validate = () => {
    const nameValidate = (name: string) => {
      if (name.length < 3 || name.length > 15) {
        return "Name must be between 3 and 15 characters"
      }
  
      return "";
    };
  
    const emailValidate = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!emailRegex.test(email)) {
        return "Invalid email format"
      }
  
      return "";
    };
  
    const phoneValidate = (phone: string) => {
      const phoneRegex = /^\+1[0-9]{9}$/;
  
      if (!phoneRegex.test(phone)) {
        return "Please enter a valid phone number (example: +1234567890)."
      }
  
      return "";
    };

    const nameError = nameValidate(name);
    const emailError = emailValidate(email);
    const phoneError = phoneValidate(phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    setDisabled(Boolean(nameError) || Boolean(emailError) || Boolean(phoneError));
  };

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    switch (evt.target.name) {
      case "smsNotifications":
        setSmsNotifications((prevState) => !prevState);
        break;

      case "emailNotifications":
        setEmailNotifications((prevState) => !prevState);
        break;

      default:
        return;
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "email":
        setEmail(value);
        break;

      default:
        return;
    }

    validate();
  };

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    onSubmit({
      displayName: name,
      phone,
      email,
      emailNotifications,
      smsNotifications,
    });
    handleResetForm();
  };

  const handleResetForm = () => {
    setName(initialData.displayName);
    setEmail(initialData.email);
    setPhone(initialData.phone);
    setEmailNotifications(initialData.emailNotifications);
    setSmsNotifications(initialData.smsNotifications);
    setDisabled(true);
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmitForm}>
        <div className="form-section">
          <h3>Contact Information</h3>
          <fieldset className="form-field">
            <label htmlFor="displayName">Display name: </label>
            <input
              type="text"
              id="displayName"
              name="name"
              required
              value={name}
              placeholder={initialData.displayName}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              placeholder={initialData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <label htmlFor="tel">Phone number: </label>
            <input
              type="tel"
              id="tel"
              name="phone"
              required
              value={phone}
              placeholder={initialData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </fieldset>
        </div>

        <div className="form-section">
          <h3>Notification Preferences</h3>
          <fieldset className="form-field">
            <label htmlFor="emailNotifications">Mail notifications: 
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={emailNotifications}
              onChange={handleCheckboxChange}
            />
            </label>
            
            <label htmlFor="smsNotifications">Sms notifications: 
            <input
              type="checkbox"
              id="smsNotifications"
              name="smsNotifications"
              checked={smsNotifications}
              onChange={handleCheckboxChange}
            />
            </label>  
          </fieldset>
        </div>

        <div className="form-preview" role="region" aria-label="preview">
          <h3>Preview</h3>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>
            Sms Notifications: {smsNotifications ? "allowed" : "not allowed"}
          </p>
          <p>
            Email Notifications: {emailNotifications ? "allowed" : "not allowed"}
          </p>
        </div>

        <div className="form-actions">
          <button className="button" type="submit" disabled={disabled}>
            Submit
          </button>
          <button className="button" type="button" onClick={handleResetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
