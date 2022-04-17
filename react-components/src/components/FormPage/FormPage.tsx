import React, { createRef, FormEvent } from 'react';
import Card from '../Card/Card';
import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import './FormPage.styles.scss';
import { IState, IUserData, TUserErrors, TUserRefs } from './FormPage.types';

export default class FormPage extends React.Component {
  pageChars: THeaderProps = {
    heading: 'Welcome to the FormPage!',
    leftBtn: 'Home',
    rightBtn: 'About-Us',
    leftPath: '/',
    rightPath: '/about',
  };

  user: TUserRefs = {
    fullName: createRef(),
    male: createRef(),
    female: createRef(),
    file: createRef(),
    html: createRef(),
    css: createRef(),
    js: createRef(),
    birthday: createRef(),
    city: createRef(),
    email: createRef(),
    agreed: createRef(),
  };

  errors: TUserErrors = {
    fullName: false,
    role: false,
    file: false,
    skills: false,
    birthday: false,
    city: false,
    email: false,
    agreed: false,
  };

  state: IState = {
    cards: [],
    validate: false,
    formIsDirty: false,
    formHasBeenTriedToSubmit: false,
    success: false,
  };

  validateFields = (inputType: string) => {
    this.setState({
      validate: true,
      formIsDirty: true,
    });

    switch (inputType) {
      case 'fullName': {
        const nameReg = /^[A-zА-я]{2,}/i;
        const name = this.user.fullName.current?.value as string;
        this.errors.fullName = nameReg.test(name) ? false : true;
        break;
      }
      case 'email': {
        const email = this.user.email.current?.value as string;
        const regEmail = /^[a-zA-Z]{3}[\d\w]{0,12}@[a-z]{2,}.[a-zA-Z]{2,}$/gi;
        this.errors.email = regEmail.test(email) ? false : true;
        break;
      }
      case 'city': {
        const city = (this.user.city.current as unknown as HTMLSelectElement).value;
        this.errors.city = city.length ? false : true;
        break;
      }
      case 'role': {
        const [male, female] = [
          (this.user.male.current as HTMLInputElement).checked,
          (this.user.female.current as HTMLInputElement).checked,
        ];
        this.errors.role = male || female ? false : true;
        break;
      }
      case 'agreed': {
        const agreed = (this.user.agreed.current as HTMLInputElement).checked;
        this.errors.agreed = agreed ? false : true;
        break;
      }
      case 'birthday': {
        const birthday = (this.user.birthday.current as unknown as HTMLSelectElement).value;
        this.errors.birthday = birthday.length ? false : true;
        break;
      }
      case 'file': {
        const element = this.user.file.current as HTMLInputElement;
        this.errors.file = (element.files as FileList).item(0)?.name ? false : true;
        break;
      }
      case 'skills': {
        this.errors.skills = [
          (this.user.html.current as HTMLInputElement).checked,
          (this.user.css.current as HTMLInputElement).checked,
          (this.user.js.current as HTMLInputElement).checked,
        ].filter((skill) => skill).length
          ? false
          : true;
        break;
      }
    }

    this.setState({
      validate: false,
    });
  };

  skillsReducer = (html: boolean, css: boolean, js: boolean) => {
    return {
      html,
      css,
      js,
    };
  };

  roleReducer = (male: boolean, female: boolean) => {
    if (male) {
      return 'male';
    } else if (female) {
      return 'female';
    }

    return 'none';
  };

  clearTheForm = () => {
    Object.values(this.user).forEach((field) => {
      const element = field.current as HTMLInputElement;
      element.value = '';
      element.checked = false;
    });

    setTimeout(() => {
      this.setState({
        formIsDirty: false,
        formHasBeenTriedToSubmit: false,
        success: false,
      });
    }, 1500);
  };

  handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    this.setState({
      validate: true,
      formHasBeenTriedToSubmit: true,
    });

    const { birthday, city, email, female, file, fullName, male, css, html, js } = this.user;

    this.validateFields('fullName');
    this.validateFields('email');
    this.validateFields('role');
    this.validateFields('agreed');
    this.validateFields('city');
    this.validateFields('birthday');
    this.validateFields('file');
    this.validateFields('skills');

    const currentUserData: IUserData = {
      fullName: fullName.current?.value as string,
      role: this.roleReducer(
        (male.current as HTMLInputElement).checked,
        (female.current as HTMLInputElement).checked
      ),
      file: file.current?.value as string,
      skills: this.skillsReducer(
        (html.current as HTMLInputElement).checked,
        (css.current as HTMLInputElement).checked,
        (js.current as HTMLInputElement).checked
      ),
      birthday: birthday.current?.value as string,
      city: city.current?.value as string,
      email: email.current?.value as string,
    };

    this.handleValidate(currentUserData);
  };

  possibleErrorIsExists = () => {
    return Object.values(this.errors).find((posErr) => posErr) ? true : false;
  };

  handleValidate = (userData: IUserData) => {
    const possibleErrorIsExists = this.possibleErrorIsExists();

    this.setState({
      validate: false,
    });

    if (possibleErrorIsExists) {
      return;
    }

    this.setState({
      cards: [...this.state.cards, userData],
    });

    this.setSuccessfulState();
    this.clearTheForm();
  };

  setFormState = (): boolean => {
    this.setState({
      formIsDirty: true,
    });

    return true;
  };

  setSuccessfulState = (): void => {
    this.setState({
      success: true,
    });

    setTimeout(() => {
      this.setState({
        success: false,
      });
    }, 750);
  };

  render() {
    return (
      <>
        <Header pageChars={this.pageChars} />
        <main>
          <form className="form">
            <h1 className="form__heading">Your personal form</h1>
            <div className="input__container">
              <span className="field__heading">Type your fullname: </span>
              <input
                onChange={() => {
                  this.setFormState() &&
                    this.state.formHasBeenTriedToSubmit &&
                    this.validateFields('fullName');
                }}
                className="input"
                ref={this.user.fullName}
                placeholder="Fullname"
                name="fullName"
                id="fullname"
                type="text"
              />
              {this.errors.fullName && (
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
                    onChange={() => {
                      this.setFormState() &&
                        this.state.formHasBeenTriedToSubmit &&
                        this.validateFields('role');
                    }}
                    ref={this.user.male}
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
                    onChange={() => {
                      this.setFormState() &&
                        this.state.formHasBeenTriedToSubmit &&
                        this.validateFields('role');
                    }}
                    ref={this.user.female}
                    className="with-gap"
                    name="role"
                    type="radio"
                    value="female"
                  />
                  <span>Female</span>
                </label>
              </span>
              {this.errors.role && (
                <p className="error">Please, consider that you should choose a role</p>
              )}
            </div>
            <div>
              <label className="field__heading" htmlFor="file">
                Place your file
              </label>
              <input
                onChange={() => {
                  this.setFormState() &&
                    this.state.formHasBeenTriedToSubmit &&
                    this.validateFields('file');
                }}
                ref={this.user.file}
                className="input"
                type="file"
                name="file"
              />
              {this.errors.file && (
                <p className="error">Please, download here your personal file</p>
              )}
            </div>
            <div>
              <span className="field__heading">Choose your skills: </span>
              <span className="span_margin_right">
                <label>
                  <input
                    onChange={() => {
                      this.setFormState() &&
                        this.state.formHasBeenTriedToSubmit &&
                        this.validateFields('skills');
                    }}
                    className="checkbox_type_skills"
                    ref={this.user.html}
                    type="checkbox"
                    name="department"
                    value="html"
                  />
                  <span>HTML</span>
                </label>
              </span>
              <span className="span_margin_right">
                <label>
                  <input
                    onChange={() => {
                      this.setFormState() &&
                        this.state.formHasBeenTriedToSubmit &&
                        this.validateFields('skills');
                    }}
                    className="checkbox_type_skills"
                    ref={this.user.css}
                    type="checkbox"
                    name="department"
                    value="css"
                  />
                  <span>CSS</span>
                </label>
              </span>
              <span className="span_margin_right">
                <label>
                  <input
                    onChange={() => {
                      this.setFormState() &&
                        this.state.formHasBeenTriedToSubmit &&
                        this.validateFields('skills');
                    }}
                    className="checkbox_type_skills"
                    ref={this.user.js}
                    type="checkbox"
                    name="department"
                    value="js"
                  />
                  <span>JS</span>
                </label>
              </span>
              {this.errors.skills && <p className="error">Please, choose your personal skills</p>}
            </div>
            <div className="input__container">
              <label className="field__heading" htmlFor="date">
                Choose your birthday:
              </label>
              <input
                onChange={() => {
                  this.setFormState() &&
                    this.state.formHasBeenTriedToSubmit &&
                    this.validateFields('birthday');
                }}
                className="input"
                ref={this.user.birthday}
                name="birthday"
                id="date"
                type="date"
              />
              {this.errors.birthday && <p className="error">Please, type your birthday</p>}
            </div>
            <div className="input__container">
              <label className="field__heading" htmlFor="city">
                Choose your city:
              </label>
              <select
                onChange={() => {
                  this.setFormState() &&
                    this.state.formHasBeenTriedToSubmit &&
                    this.validateFields('city');
                }}
                className="input select"
                ref={this.user.city}
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
              {this.errors.city && <p className="error">Please, enter your city</p>}
            </div>
            <div>
              <span className="field__heading">Type your email: </span>
              <input
                onChange={() => {
                  this.setFormState() &&
                    this.state.formHasBeenTriedToSubmit &&
                    this.validateFields('email');
                }}
                className="input"
                ref={this.user.email}
                placeholder="Email"
                name="email"
                id="email"
                type="email"
              />
              {this.errors.email && (
                <p className="error">Please, be sure you enter a correct email-address</p>
              )}
            </div>
            <div>
              <label className="input__container">
                <span className="field__heading">I agree with the terms</span>
                Disagree
                <input
                  onChange={() => {
                    this.setFormState() &&
                      this.state.formHasBeenTriedToSubmit &&
                      this.validateFields('agreed');
                  }}
                  className="slider__input"
                  ref={this.user.agreed}
                  type="checkbox"
                  name="terms"
                />
                <span className="slider">
                  <span className="thumb"></span>
                </span>
                Agree
              </label>
              {this.errors.agreed && (
                <p className="error">Please, confirm that you have been agreed with the terms</p>
              )}
            </div>
            <div>
              <button
                disabled={!this.state.formIsDirty || this.possibleErrorIsExists()}
                onClick={this.handleSubmit}
                className="button_type_submit"
              >
                Submit the form!
              </button>
            </div>
          </form>
        </main>

        <p className={this.state.success ? 'success' : 'disabled'}>
          Your data has been submitted successfully!
        </p>

        <ul className="list cards__list">
          {this.state.cards.map((card, nd) => {
            return <Card key={nd} {...card} />;
          })}
        </ul>
      </>
    );
  }
}
