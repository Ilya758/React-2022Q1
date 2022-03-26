import React from 'react';
import { TAppProps } from '../../App.types';
export class SearchBar extends React.Component<TAppProps> {
  constructor(props: TAppProps) {
    super(props);
  }

  componentWillUnmount() {
    this.props.commit();
  }

  render() {
    return (
      <div style={{ marginTop: '120px' }} className="row">
        <div className="input-field col s12">
          <input
            name="text"
            onChange={this.props.handleChange}
            id="text"
            type="text"
            className="validate"
            value={this.props.state.input}
          />
        </div>
      </div>
    );
  }
}
