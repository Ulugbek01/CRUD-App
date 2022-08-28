import React, {Component} from "react";
import users from "../utils";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      data: users,
      active: null,
      search: 'id',
    }
  }
  
  render() {

    const onChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    const onAdd = () => {
      if(this.state.name.length && this.state.surname) {
        const newUser = {
          id: this.state.data.length + 1,
          name: this.state.name,
          surname: this.state.surname
        }

        this.setState({
          data: [...this.state.data, newUser],
          name: '',
          surname: '',
        })
      } 
      else {
        alert('Iltmos malumot kiriting')
      }
    }

    const onDelete = (id) => {
      let res = this.state.data.filter((user) => user.id !== id);
      this.setState({data: res})
    }

    const onSelected = (e) => {
      this.setState({search: e.target.value})
    }

    const onSearch = (e) => {
      const filtered = users.filter((user) => `${user[this.state.search]}`.includes(e.target.value.toLowerCase()))
      this.setState({data: filtered})
      // console.log(e.target.value);
    }
  
    const onEdit = (user, isActive) => {
      if(isActive) {
        this.setState({active: null})
        let edited = this.state.data.map((item) => item.id === user.id ? {...item, name: this.state.name, surname: this.state.surname} : item)
        this.setState({data: edited});
      }
      else {
        this.setState({
          active: user.id,
          name: user.name,
          surname: user.surname,
        })
      }
    }

    return (
      <div>
        <h2>Name: {this.state.name}</h2>
        <h2>Surname: {this.state.surname}</h2>

        <input onChange={onSearch} type="text" placeholder="search" className="form-control w-25 d-inline-block me-2 border border-success"/>
        <select onChange={onSelected} className="form-select d-inline-block me-2 bg-primary" style={{width: '10%', color: '#fff'}}>
          <option value="id">Id</option>
          <option value="name">Name</option>
          <option value="surname">Surname</option>
        </select>

        <input type="text" className="form-control border border-primary w-25 d-inline-block" onChange={onChange} value={this.state.name} name="name" placeholder="name"/>
        <input type="text" className="form-control border border-primary w-25 d-inline-block mx-2" onChange={onChange} value={this.state.surname} name="surname" placeholder="surname"/>
        <button onClick={onAdd} className="btn btn-primary px-4">Add</button>

        { this.state.data.length ? 
        <table className="table table table-dark table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.data.map((user) => 
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{this.state.active === user.id ? <input onChange={onChange} name="name" className="form-control" value={this.state.name} /> : user.name}</td>
                  <td>{this.state.active === user.id ? <input onChange={onChange} name="surname" className="form-control" value={this.state.surname} /> : user.surname}</td>
                  <td><button className="btn btn-danger" onClick={()=> onDelete(user.id)}>Delete</button></td>
                  <td><button className="btn btn-success px-4" onClick={() => onEdit(user, this.state.active === user.id)}>{this.state.active === user.id ? 'Save' : 'Edit'}</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
        :
        <div className="alert alert-warning text-center mt-4" role="alert">
          Ma'lumot topilmadi!
        </div>
        }
      </div>
    )
  }
}

export default App;