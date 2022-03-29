import React from 'react';
import { Header } from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import './FormPage.styles.scss';

export default class FormPage extends React.Component {
  pageChars: THeaderProps = {
    heading: 'Welcome to the htmlFormPage!',
    leftBtn: 'Home',
    rightBtn: 'About-Us',
    leftPath: '/',
    rightPath: '/about',
  };

  userData = {};

  render() {
    return (
      <>
        <Header pageChars={this.pageChars} />
        <main>
          <div className="row">
            <form className="form col s12">
              <h1 className="form__heading">Please, fill the fields of that form!</h1>

              <div className="row">
                <div className="input-field col s6">
                  <input name="fullname" id="fullname" type="text" className="validate" />
                  <label htmlFor="fullname">Fullname</label>
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <span className="span_margin_right">
                    <label>
                      <input className="with-gap" name="sex" type="radio" value="male" />
                      <span>Male</span>
                    </label>
                  </span>
                  <span>
                    <label>
                      <input className="with-gap" name="sex" type="radio" value="female" />
                      <span>Female</span>
                    </label>
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <input className="input-field" type="file" name="file" />
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <h5>Choose your skills</h5>
                  <span className="span_margin_right">
                    <label>
                      <input type="checkbox" name="department" value="html" />
                      <span>HTML</span>
                    </label>
                  </span>
                  <span className="span_margin_right">
                    <label>
                      <input type="checkbox" name="department" value="css" />
                      <span>CSS</span>
                    </label>
                  </span>
                  <span className="span_margin_right">
                    <label>
                      <input type="checkbox" name="department" value="js" />
                      <span>JS</span>
                    </label>
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input name="birthday" id="date" type="date" className="validate" />
                  <label htmlFor="date">Birthday</label>
                </div>
              </div>

              <div className="row">
                <select placeholder="Your city" className="select col s6" name="city" id="city">
                  <option selected disabled value="">
                    Select your city
                  </option>
                  <option value="Brest">Brest</option>
                  <option value="Vitebsk">Vitebsk</option>
                  <option value="Gomel">Gomel</option>
                  <option value="Grodno">Grodno</option>
                  <option value="Minsk">Minsk</option>
                  <option value="Mogilev">Mogilev</option>
                </select>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input name="email" id="email" type="email" className="validate" />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <div className="switch">
                    <label>
                      <h5>I agree with the terms</h5>
                      Disagree
                      <input type="checkbox" name="terms" />
                      <span className="lever"></span>
                      Agree
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <button type="submit" className="waves-effect waves-light btn">
                    Submit the form!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </>
    );
  }
}
