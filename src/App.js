import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  state = {
    maxNo: 3,
    boards: [
      {
        brdno: 1,
        brdwriter: '이규하',
        brdtitle: 'If you intend to live then you die',
        brddate: new Date()
      },
      {
        brdno: 2,
        brdwriter: '함시연',
        brdtitle: 'Founder for two countries',
        brddate: new Date()
      }
    ]
  }

  // handleSaveData = (data) => {
  //   this.setState({
  //     maxNo: this.state.maxNo+1,
  //     boards: this.state.boards.concat({ brdno: this.state.maxNo, brddate: new Date(), ...data })
  //   });
  // }
  handleSaveData = (data) => {
    let boards = this.state.boards;
    if (data.brdnno === null || data.brdno === '' || data.brdno === undefined) {
      this.setState({
        maxNo: this.state.maxNo+1,
          boards: boards.concat({brdno: this.state.maxNo, brddate: new Date(), brdwriter: data.brdwriter, brdtitle: data.brdtitle })
      });
    } 
    else {
      this.setState({
        boards: boards.map(row => data.brdno === row.brdno ? { ...data }: row)
      })
    }
  }

  handleRemove = (brdno) => {
    this.setState({
      boards: this.state.boards.filter(row => row.brdno !== brdno)
    })
  }

  handleSelectRow = (row) => {
    this.child.current.handleSelectRow(row);
  }

  render() {
    const { boards } = this.state;
    
    return (
      <div>
        <BoardForm onSaveData={this.handleSaveData} ref={this.child}/>
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
              { 
                boards.map(row => (
                  <BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow}/>
                ))
              }
          </tbody>
        </table>
      </div>
      );
    }
  }

class BoardItem extends React.Component {
  render() {
    return(
    <tr>
      <td>{this.props.row.brdno}</td>
      <td>{this.props.row.brdtitle}</td>
      <td align="center">{this.props.row.brdwriter}</td>
      <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
    </tr>
    );
  }
}

class BoardForm extends Component {
  state = {};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveData(this.state);
    this.setState({});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="title" name="brdtitle" onChange={this.handleChange}/>
        <input placeholder="name" name="brdwriter" onChange={this.handleChange}/>
        <button type="submit">Save</button>
      </form>
    )
  }
}



export default App;