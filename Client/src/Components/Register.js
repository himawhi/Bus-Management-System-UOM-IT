import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import '../Css/register.scss'
import axios from "axios";
import image from '../Css/profile.png'

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [driverId, setDriverId] = useState("");
  const [busId, setBusId] = useState("");
  const navigate = useNavigate();


  async function save(event) {
    event.preventDefault();
    if (!busId) {
      alert("Please enter a value for Bus ID.")
    } else {
      // Check if any field is empty
      if (firstname.trim() === "" || lastname.trim() === "" || email.trim() === "" || password.trim() === "" || telephone.trim() === "" || busId.trim() === "") {
        alert("Please fill in all fields");
        return;
      }

      try {

        const res = await axios.post("http://localhost:8080/api/v1/drivers/register", {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
          telephone: telephone,
          driverId: driverId,
          busId: busId
        });
        if (res.data == "Email already exists.") {
          alert("Email already exists");
        }
        else if (res.data === 'Invalid busId.') {
          alert('Invalid busId');
        }
        else {
          
            alert("User Registation Successfully !");
            navigate('/driver');
            return res.data;
          
        }

      } catch (err) {
        alert(err);
      }
    }
  }


  return (
    <div className="registerContainer">
      <div className="form">
        <form>
          <div className="container">
            <h1>Sign Up</h1>
            <p className="h">Already have an account?
              <Link to="/login" style={{ textDecoration: "none" }}>
                <b>Log In</b>
              </Link>
            </p>
            <hr />
            <label for="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Firstname" id="firstname" value={firstname}
              onChange={(event) => {
                setFirstName(event.target.value);
              }} required />
            <input type="text" placeholder="Enter Lastname" id="lastname" value={lastname}
              onChange={(event) => {
                setLastName(event.target.value);
              }} required />

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" id="email" value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }} required />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" id="password" value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }} required />

            <label for="telephone"><b>Mobile No</b></label>
            <input type="text" placeholder="Enter Mobile No" id="telephone" value={telephone}
              onChange={(event) => {
                setTelephone(event.target.value);
              }} required />

            <label for="driverId"><b>Driver ID</b></label>
            <input type="text" placeholder="Enter Driver ID" id="driverId" value={driverId}
              onChange={(event) => {
                setDriverId(event.target.value);
              }} required />

            <label for="busID"><b>Bus ID </b></label>
            <input type="text" placeholder="Enter busID " id="busID" value={busId}
              onChange={(event) => {
                setBusId(event.target.value);
              }} required />

            <label>
              <input type="checkbox" checked="checked" /> Remember me
            </label>

            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

            <div className="clearfix">
              <Link to="/driver" style={{ textDecoration: "none" }}>
                <button type="button" class="cancelbtn">Cancel</button>
              </Link>
              <button type="submit" class="signupbtn" onClick={save}>Register</button>
            </div>
          </div>
        </form>

      </div>
    </div>

  )
}

export default Register