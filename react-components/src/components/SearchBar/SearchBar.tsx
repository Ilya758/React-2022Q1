import React, { SyntheticEvent } from 'react';

export class SearchBar extends React.Component {
  state = {
    input: '',
  };

  componentDidMount() {
    this.setState({
      input: this.pull(),
    });
    console.log(this.pull());
  }

  componentWillUnmount() {
    this.commit<string>('input', this.state.input);
  }

  private pull = (): string | null => {
    return JSON.parse(localStorage.getItem('input') as string) || 'Empty string!';
  };

  private commit = <T,>(item: string, data: T): void => {
    localStorage.setItem(item, JSON.stringify(data));
  };

  private handleChange = (e: SyntheticEvent): void => {
    this.setState({
      input: (e.target as HTMLInputElement).value,
    });
  };

  render() {
    return (
      <div style={{ marginTop: '120px' }} className="row">
        <div className="input-field col s12">
          <input
            onChange={this.handleChange}
            id="text"
            type="text"
            className="validate"
            value={this.state.input}
          />
        </div>
      </div>
    );
  }
}
