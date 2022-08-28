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

    const onEdit = (id, isActive) => {
      if(isActive) {
        this.setState({active: null})
      }
      else {
        this.setState({active: id})
      }
    }

    const onDelete = (id) => {
      let res = this.state.data.filter((user) => user.id !== id);
      this.setState({data: res})
    }

    const onSave = (id) => {
      // this.setState({active: id})
    }

    return (
      <div>
        <h2>Name: {this.state.name}</h2>
        <h2>Surname: {this.state.surname}</h2>
        <input type="text" className="form-control w-25 d-inline-block" onChange={onChange} value={this.state.name} name="name" placeholder="name"/>
        <input type="text" className="form-control w-25 d-inline-block mx-2" onChange={onChange} value={this.state.surname} name="surname" placeholder="surname"/>
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
                  <td>{this.state.active === user.id ? <input className="form-control" defaultValue={user.name}/> : user.name}</td>
                  <td>{this.state.active === user.id ? <input className="form-control" defaultValue={user.surname}/> : user.surname}</td>
                  <td><button className="btn btn-danger" onClick={()=> onDelete(user.id)}>Delete</button></td>
                  <td><button className="btn btn-success px-4" onClick={() => onEdit(user.id, this.state.active === user.id)}>{this.state.active === user.id ? 'Save' : 'Edit'}</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
        :
        <div class="alert alert-warning text-center mt-4" role="alert">
          Ma'lumot topilmadi!
        </div>
        }
      </div>
    )
  }
}

export default App;