import { useNavigate, useParams } from "react-router";
import { Display, Display1 } from "./Display";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { useEffect } from "react";

// import { useState } from "react";

export function Userlist() {
    // const history = useHistory();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`https://6166c4e813aa1d00170a6717.mockapi.io/userlist`, { method: "GET", })
            .then((data) => data.json())
            .then((uls) => setUsers(uls));
    }, []);
    return (
        <div className="person">
            {users.map(({ name, EmployeeId, designation, salary, pic, id }, index) => <Display
                name={name}
                EmployeeId={EmployeeId}
                designation={designation}
                salary={salary}
                image={pic}
                id={id}
            />

            )}
        </div>
    );
}

export function UserDetails() {
    const { id } = useParams();
    console.log(id);
    const history = useNavigate();
    // const employee = users[id];
    const [employee, setEmployee] = useState({});
    useEffect(() => {
        fetch(`https://6166c4e813aa1d00170a6717.mockapi.io/userlist/${id}`, { method: "GET", })
            .then((data) => data.json())
            .then((uls) => setEmployee(uls));
    }, [id]);
    return (

        <div className="details person" >
            <img className="user_pic" src={employee.pic} alt={employee.name} />
            <div>
                <p>Name:{employee.name}</p>
                <p>EmployeeId:{employee.EmployeeId}</p>
                <p>Designation:{employee.designation}</p>
                <p>Salary:{employee.salary}</p>
                <button onClick={() => history.goBack()}>BACK</button>
            </div>
        </div>
    )
}

export function Editlist() {
    const sty = { color: "white" };
    const [users, setUsers] = useState([]);
    const getuser = () => {
        fetch(`https://6166c4e813aa1d00170a6717.mockapi.io/userlist`, { method: "GET", })
            .then((data) => data.json())
            .then((uls) => setUsers(uls));
    }
    useEffect(getuser, []);
    const deleteuser = (id) => {
        fetch(`https://6166c4e813aa1d00170a6717.mockapi.io/userlist/${id}`,
            { method: "DELETE", }
        )
            .then(() => getuser());
    }
    const navigate = useNavigate();
    return (
        <div className="person">
            {users.map(({ name, EmployeeId, designation, salary, pic, id }, index) => <Display1
                name={name}
                EmployeeId={EmployeeId}
                designation={designation}
                salary={salary}
                image={pic}
                id={id}
                deletebutton={

                    <IconButton
                        style={sty}
                        aria-label="delete"
                        size="large" onClick={() => {
                            console.log(id);
                            deleteuser(id);
                        }}>
                        <DeleteIcon />
                    </IconButton>


                }
                editbutton={

                    <IconButton style={sty}
                        aria-label="edit"
                        size="large"
                        onClick={() => {
                            console.log("editing");
                            navigate.push("/edit-user/" + id)
                        }}>

                        <EditIcon />
                    </IconButton>
                }
                infobutton={
                    
                    <IconButton style={sty}
                        aria-label="Profile"
                        size="large"
                        onClick={() => navigate.push("/profile/" + id)
                        }><AccountCircleIcon /></IconButton>}
            />

            )}
        </div>
    );
}
