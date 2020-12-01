import { useState, useEffect } from 'react'
import db from './firebase/config'
import firebase from 'firebase/app'
import './App.css';
import AddTodo from './components/AddTodo'
import Todos from './components/Todos';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

function App() {
  const [todos, setTodos] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [globalStatus, setGlobalStatus] = useState('')
  const [value, setValue] = useState('')
  const [user, setUser] = useState(null)
  // GET ITEMS 
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({
        fields: doc.data(),
        id: doc.id
      })))
    })
  }, [globalStatus])
  // GET FILTERED ITEMS 
  useEffect(() => {
    const filterItems = () => {
      switch (globalStatus) {
        case 'ran out':
          setFilteredItems(todos.filter(todo => todo.fields.status === 'ran out'))
          break;
        case 'have':
          setFilteredItems(todos.filter(todo => todo.fields.status === 'have'))
          break
        default:
          setFilteredItems(todos)
      }
    }
    filterItems()
  }, [todos, globalStatus])
  const addTodo = (e) => {
    e.preventDefault()
    db.collection('todos').add({
      text: value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'ran out',
      priority: '1'
    })
    setValue('')
  }
  // GOOGLE AUTH 
  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        setUser(result.user.displayName)
      })
      .catch(err => console.log(err))
  }
  const signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        setUser(null)
        console.log('Signed out');
      })
      .catch(err => console.log(err))
  }
  // STYLE 
  const signBtn = {
    "margin": "20px 0"
  }
  const avatar = {
    "position": "absolute",
    "right": "0",
    "top": "55px"
  }
  return (
    <div className="app">
      <Button style={signBtn} variant='contained' color='primary' className='app__sign' onClick={user ? signOut : signIn}>{user ? 'Sign out' : 'Sign in'}</Button>
      {user ? <Avatar style={avatar}>{user.slice(0, 1)}</Avatar> : null}
      <AddTodo value={value} addTodo={addTodo} setValue={setValue} setGlobalStatus={setGlobalStatus} />
      {filteredItems.map(todo => <Todos key={todo.id} text={todo.fields.text} id={todo.id} status={todo.fields.status} priority={todo.fields.priority} time={todo.fields.timestamp} />)}
    </div>
  );
}

export default App;
