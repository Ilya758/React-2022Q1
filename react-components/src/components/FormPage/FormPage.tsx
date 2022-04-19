import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Card from '../Card/Card';
import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import './FormPage.styles.scss';
import { TUser } from './FormPage.types';

const FormPage = () => {
  const pageChars: THeaderProps = {
    heading: 'Welcome to the FormPage!',
    leftBtn: 'Home',
    rightBtn: 'About-Us',
    leftPath: '/',
    rightPath: '/about',
  };

  const [cards, setCards] = useState<TUser[]>([]);
  const [success, setSuccess] = useState(false);

  const userInputs = {
    fullName: '',
    role: '',
    file: '',
    skills: [],
    birthday: '',
    city: '',
    email: '',
    agreed: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isValid, isDirty, isSubmitted, submitCount },
  } = useForm<TUser>({
    defaultValues: userInputs,
  });

  const onSubmit: SubmitHandler<TUser> = (userData: TUser) => {
    setCards([...cards, userData]);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 750);

    reset();
    clearErrors();
  };

  const regEmail = /^[a-zA-Z.]{3}\.?[\d\w\.]{0,12}@[a-z]{2,}.[a-zA-Z]{2,}$/gi;

  const isTodayTheDayBefore = (date: string) => Date.now() > new Date(date).getTime();

  return (
    <>
      <Header pageChars={pageChars} />
      <main>
        <form className="form">
          <h1 className="form__heading">Your personal form</h1>
          <div className="input__container">
            <span className="field__heading">Type your fullname: </span>
            <input
              defaultValue=""
              {...register('fullName', { required: true, minLength: 2 })}
              className="input"
              placeholder="Fullname"
              type="text"
            />
            {errors.fullName && (
              <p className="error">
                Please, consider that your name should have at least 2 symbols
              </p>
            )}
          </div>

          <div>
            <span className="field__heading">Choose your gender: </span>
            <span className="span_margin_right">
              <label>
                <input
                  defaultChecked={false}
                  {...register('role', { required: true })}
                  className="with-gap"
                  name="role"
                  type="radio"
                  value="male"
                />
                <span>Male</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  defaultChecked={false}
                  {...register('role', { required: true })}
                  className="with-gap"
                  name="role"
                  type="radio"
                  value="female"
                />
                <span>Female</span>
              </label>
            </span>
            {errors.role && <p className="error">Please, consider that you should choose a role</p>}
          </div>

          <div>
            <label className="field__heading" htmlFor="file">
              Place your file
            </label>
            <input
              defaultValue=""
              {...register('file', { required: true })}
              className="input"
              type="file"
              name="file"
            />
            {errors.file && <p className="error">Please, download here your personal file</p>}
          </div>

          <div>
            <span className="field__heading">Choose your skills: </span>
            <span className="span_margin_right">
              <label>
                <input
                  className="checkbox_type_skills"
                  defaultChecked={false}
                  {...register('skills', { required: true })}
                  type="checkbox"
                  name="skills"
                  value="html"
                />
                <span>HTML</span>
              </label>
            </span>
            <span className="span_margin_right">
              <label>
                <input
                  defaultChecked={false}
                  {...register('skills', { required: true })}
                  className="checkbox_type_skills"
                  type="checkbox"
                  name="skills"
                  value="css"
                />
                <span>CSS</span>
              </label>
            </span>
            <span className="span_margin_right">
              <label>
                <input
                  defaultChecked={false}
                  {...register('skills', { required: true })}
                  className="checkbox_type_skills"
                  type="checkbox"
                  name="skills"
                  value="js"
                />
                <span>JS</span>
              </label>
            </span>
            {errors.skills && <p className="error">Please, choose your personal skills</p>}
          </div>

          <div className="input__container">
            <label className="field__heading" htmlFor="date">
              Choose your birthday:
            </label>
            <input
              defaultValue=""
              {...register('birthday', { validate: isTodayTheDayBefore, required: true })}
              className="input"
              id="date"
              type="date"
            />
            {errors.birthday && <p className="error">Please, type your birthday correctly!</p>}
          </div>

          <div className="input__container">
            <label className="field__heading" htmlFor="city">
              Choose your city:
            </label>
            <select
              {...register('city', { required: true })}
              className="input select"
              placeholder="Your city"
              name="city"
              id="city"
              defaultValue=""
            >
              <option value="" disabled>
                Select your city
              </option>
              <option value="Brest">Brest</option>
              <option value="Vitebsk">Vitebsk</option>
              <option value="Gomel">Gomel</option>
              <option value="Grodno">Grodno</option>
              <option value="Minsk">Minsk</option>
              <option value="Mogilev">Mogilev</option>
            </select>
            {errors.city && <p className="error">Please, enter your city</p>}
          </div>

          <div>
            <span className="field__heading">Type your email: </span>
            <input
              defaultValue=""
              {...register('email', { pattern: regEmail, required: true })}
              className="input"
              placeholder="Email"
              type="email"
            />
            {errors.email && (
              <p className="error">Please, be sure you enter a correct email-address</p>
            )}
          </div>

          <div>
            <label className="input__container">
              <span className="field__heading">I agree with the terms</span>
              Disagree
              <input
                defaultValue=""
                {...register('agreed', { required: true })}
                className="slider__input"
                type="checkbox"
              />
              <span className="slider">
                <span className="thumb"></span>
              </span>
              Agree
            </label>
            {errors.agreed && (
              <p className="error">Please, confirm that you have been agreed with the terms</p>
            )}
          </div>

          <div>
            <button
              disabled={
                (!isDirty && !isSubmitted) ||
                (isDirty && !isValid && isSubmitted) ||
                (!!submitCount && !isValid)
              }
              onClick={handleSubmit(onSubmit)}
              className="button_type_submit"
            >
              Submit the form!
            </button>
          </div>
        </form>
      </main>

      <p className={success ? 'success' : 'disabled'}>Your data has been submitted successfully!</p>

      <ul className="list cards__list">
        {cards.map((card, nd) => {
          return <Card key={nd} {...card} />;
        })}
      </ul>
    </>
  );
};

export default FormPage;
