import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
class Home extends Component {
    constructor(props) {
        super(props)


    }
    state = {
        patientId: 0,
        patientDiag: '',
        date: '1/1/1999',
        rowData: []

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleInsert = (e) => {
        e.preventDefault()
        let data, type
        let reqBody = [
            data = {
                patientId: this.state.patientId,
                patientDiag: this.state.patientDiag,
                date: this.state.date
            },
            type = 1

        ]
        axios({
            method: "post",
            url: "http://localhost:3300/information",
            data: reqBody,
            headers: { 'Content-Type': 'application/json' }

        }).then((res) => {
            console.log(res)


        })
    }
    handleRetrieve = (e) => {
        
        this.setState({
            getData: true
        })
        let data, type
        let reqBody = [
            data = {
                patientId: this.state.patientId,
                patientDiag: this.state.patientDiag,
                date: this.state.date
            },
            type = 3

        ]
        axios({
            method: "post",
            url: "http://localhost:3300/information",
            data: reqBody,
            headers: { 'Content-Type': 'application/json' }

        }).then((res) => {
            console.log(res)
            console.log(res.data);
            if (res.data != 'not found') {
                this.setState({
                    rowData: res.data
                })
            }

        })
    }

    handleUpdate = (e) => {
        e.preventDefault()
        let data, type
        let reqBody = [
            data = {
                id: this.state.id,
                patientId: this.state.patientId,
                patientDiag: this.state.patientDiag,
                date: this.state.date
            },
            type = 2

        ]
        axios({
            method: "post",
            url: "http://localhost:3300/information",
            data: reqBody,
            headers: { 'Content-Type': 'application/json' }

        }).then((res) => {
            console.log(res)


        })
        
        this.setState({
            updateButton: false
        })
    }

    render() {
        let { getData, rowData } = this.state
        let date2

        const patientList = rowData.map((row) => {
        let date_time = (row.date_of_viste).split("T");
        let date = date_time[0]; // mm-dd-yyyy -----> dd/mm/yyyy
        date = date.replace(/\-/g, "/").split("/");
        date2 = date[0] + "/" + date[1] + "/" + date[2];
        date2 = date2.split("/").reverse().join("/");
            return (
                <tr key={row.id}>
                    <td>{row.patient_id}</td>
                    <td>{row.patient_diagnosies}</td>
                    <td>{date2}</td>
                    <td><Button className="btn btn-success"
                        onClick={() =>
                            this.setState({
                                updateButton: true,
                                getData : false,
                                id: row.id,
                                patientId: row.patient_id,
                                patientDiag: row.patient_diagnosies,
                                date: row.date_of_viste,

                            })
                        }
                        style={{ backgroundColor: "blue", color: "white", display: "block", margin: "10px auto" }}>Update</Button></td>

                </tr>


            )
        })
        return (
            <div>
                <div className='w-50 m-auto bg-black p-5 mt-5 text-center' style={{ color: 'white' }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Patient ID</Form.Label>
                            <Form.Control type="number" name="patientId" placeholder=".." onChange={this.handleChange} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Patient Diagnoseis</Form.Label>
                            <Form.Control type="text" name="patientDiag" placeholder=".." onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Date of Visit</Form.Label>
                            <Form.Control type="date" name="date" onChange={this.handleChange} />
                        </Form.Group>

                        <Button variant="primary" style={{ marginRight: '20px' }} onClick={this.handleInsert}>
                            insert
                        </Button>

                        <Button variant="primary" onClick={this.handleRetrieve} >
                            Retrieve
                        </Button>
                    </Form>
                </div>
                {getData ? (
                    <div className="container mt-5 w-75">
                        <table className="table bg-black " style={{ color: 'white' }}>
                            <thead>
                                <tr>

                                    <th>patient_id</th>
                                    <th>patient_diagnosies</th>
                                    <th>date_of_visit</th>
                                    <th>action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {patientList}
                            </tbody>
                        </table>
                    </div>
                ) : null}
                {this.state.updateButton ? (<div className='w-50 m-auto bg-black p-5 mt-5 text-center' style={{ color: 'white' }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Patient ID</Form.Label>
                            <Form.Control type="number" name="patientId" onChange={this.handleChange} value={this.state.patientId} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Patient Diagnoseis</Form.Label>
                            <Form.Control type="text" name="patientDiag" onChange={this.handleChange} value={this.state.patientDiag} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Date of Visit</Form.Label>
                            <Form.Control type="text" placeholder={date2} name="date" onFocus={(e) => e.target.type = 'date'} onChange={this.handleChange} />
                        </Form.Group>

                        <Button variant="primary" onClick={this.handleUpdate}>
                            save
                        </Button>


                    </Form>
                </div>) : null}
            </div>

        );
    }
}

export default Home;