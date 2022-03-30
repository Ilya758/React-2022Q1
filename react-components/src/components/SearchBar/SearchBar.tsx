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
      <div style={{ margin: '30px 0' }}>
        <input
          name="text"
          onChange={this.props.handleChange}
          id="text"
          type="text"
          className="input"
          value={this.props.state.input}
        />
      </div>
    );
  }
}
