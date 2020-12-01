import React from 'react'
import './AddTodo.css'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

function AddTodo({value, setValue, setGlobalStatus, addTodo}) {
    return (
        <div className='app__form'>
            <form>
                <Input
                    className='app__formInput'
                    placeholder='Add todo...'
                    value = {value}
                    onChange = {e => setValue(e.target.value)}
                />
                <Button disabled={!value} type='submit' variant="contained" color='primary' onClick = {addTodo}>Add todo</Button>
            </form>
            <div className='app__formFilter'>
                <Select onChange = {e => setGlobalStatus(e.target.value)} native defaultValue = 'all'>
                    <option>all</option>
                    <option>ran out</option>
                    <option>have</option>
                </Select>
            </div>
        </div>
    )
}

export default AddTodo
