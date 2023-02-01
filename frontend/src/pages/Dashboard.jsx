import { useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getNotes, reset } from '../features/notes/noteSlice'
import NotesForm from '../components/NotesForm'
import Spinner from '../components/Spinner'
import ItemNote from '../components/ItemNote'

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isSuccess, isError, message } = useSelector((state) => state.notes);
  
  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login');
    }

    dispatch(getNotes());

    // shit gives an infinite loop
    // return () => {
    //   dispatch(reset());
    // }
  }, [user, navigate, isError, message, dispatch]) 

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Notes dashboard</p>
      </section>
      <NotesForm/>
      <section className="content">
        {notes.length > 0 ? (
          <div className="goals">
            {notes.map((note) => (
              <ItemNote key={note._id} note={note} />
            ))}
          </div>
        ) : (<h3>You dont create any notes yet.</h3>)}
      </section>
    </>
  )
}

export default Dashboard
