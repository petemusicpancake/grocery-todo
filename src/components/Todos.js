import React from 'react'
import './Todos.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import db from '../firebase/config'
import Select from '@material-ui/core/Select';

function Todos({ text, id, status, time }) {
    const deleteTodo = () => {
        db.collection("todos").doc(`${id}`).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        })
    }
    const deleteBtn = {
        'backgroundColor': 'red',
    }
    const selectTag = {
        "margin": "0 5px",
        "border": "1px solid lightgrey",
        "color": "#303f9f",
        "padding": "3px"
    }
    const updatePriority = (e) => {
        db.collection('todos').doc(`${id}`).update({
            priority: e.target.value
        })
    }
    const updateStatus = (e) => {
        db.collection('todos').doc(`${id}`).update({
            status: e.target.value
        })
    }
    return (
        <div className='todos'>
            <h4 className='todos__item'>{text} <span className='date'></span> </h4>
            <div className='todos__actions'>
                <Button onClick={deleteTodo} variant='contained' style={deleteBtn}>
                    <DeleteIcon style={{ color: '#fff' }} />
                </Button>
                <Select onChange={updatePriority} style={selectTag} native>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Select>
                <Select onChange={updateStatus} style={selectTag} native defaultValue={status}>
                    <option>ran out</option>
                    <option>have</option>
                </Select>
            </div>
        </div>
    )
}

export default Todos
