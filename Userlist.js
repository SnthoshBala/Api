import React, { Component } from 'react'
import {Card,Table,InputGroup,FormControl,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faStepBackward,faStepForward,faFastForward,faFastBackward} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default class Userlist extends Component {
constructor(props) {
    super(props)

    this.state = {
         users:[],
         currentpage:1,
         userperpage:5
    }
}

    componentDidMount()
    {
        this.findUsers()
    }
    findUsers()
    {
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
        .then(response=>response.data)
        .then((data)=>{
            this.setState({users:data})
            
        });
    }
    ChangePage= event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        const {users,userperpage,currentpage}=this.state;
        const lastIndex=currentpage * userperpage;
        const firstIndex=lastIndex - userperpage;
        const currentUsers =users.slice(firstIndex,lastIndex);
        const totalPage= users.length/userperpage; 
        const PageCss={
            border:"1px solid #17A2B8",
            color:"#17A2B8",
            textAlign:"center",
            fontWeight:"bold",
            width: "45px"
        }
        return (
            <div>
                
            <Card className="border border-dark bg-dark text-white">
            <Card.Header> <FontAwesomeIcon icon={faUsers} />UsersList</Card.Header>
            <Card.Body>
                <Table bordered hover striped variant="dark">
                <thead>
                    <tr>
    <td>Name</td>
    <td>Email</td>
    <td>Address</td>
    <td>Created</td>
    <td>Balance</td>
    </tr>
    </thead>
    <tbody>
        {
        users.length===0?
        <tr align="center">
            <td colspan="6">NO Users Available</td>
        </tr> :
        currentUsers.map((users,index)=>(
            <tr key={index}>
                <td>{users.first}{' '}{users.last}</td>
                <td>{users.email}</td>
                <td>{users.address}</td>
                <td>{users.created}</td>
                <td>{users.balance}</td>
            </tr>
        )
        )

    }
    </tbody>
    </Table>
    </Card.Body>
    <Card.Footer>
        <div style={{"float":"left"}}>
            Showing Pages {currentpage} of {totalPage}
        </div>
        <div style={{"float":"rigth"}}>
            <InputGroup size="sm">
            <InputGroup.Prepend>
            <Button type="button" variant="outline-info" disable={currentpage ===1 ? true :false}
            Onclick={this.FirstPage}>
            <FontAwesomeIcon icon={faFastBackward} />First
            </Button>
            <Button type="button" variant="outline-info" disable={currentpage ===1 ? true :false}
            Onclick={this.PrevPage}>
            <FontAwesomeIcon icon={faStepBackward} />Prev
            </Button>
            </InputGroup.Prepend>

            <FormControl style={PageCss} className="bg-dark" name="currentpage" value={currentpage} Onchange={this.bookChange}/>
            
            <InputGroup.Append>
            <Button type="button" variant="outline-info" disable={currentpage ===totalPage ? true :false}
            Onclick={this.NextPage}>
            <FontAwesomeIcon icon={faStepForward} />Next
            </Button>
            <Button type="button" variant="outline-info" disable={currentpage ===totalPage ? true :false}
            Onclick={this.LastPage}>
            <FontAwesomeIcon icon={faFastForward} />Last 
            </Button>
            </InputGroup.Append>
            </InputGroup>
        </div>
    </Card.Footer>
    </Card>
            </div>
        )
    }
}
