import React from 'react';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { FaPlus } from 'react-icons/fa';
import { NoteItem } from '../components/NoteItem'
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Modal from 'react-modal';
import {getNotes, createNote, reset as notesReset} from '../features/notes/noteSlice'; 

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  }
}

Modal.setAppElement('#root')

export const Ticket = () => {
  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets);
  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  
  const {ticketId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, ticketId, dispatch]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket closed!');
    navigate('/tickets');
  }

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({noteText, ticketId}))
    closeModal();
  }

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  if (isError) return <h3>Something went wrong!</h3>

  if (isLoading || notesIsLoading) return <Spinner></Spinner>

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets'></BackButton>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('fr-FR')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'><FaPlus></FaPlus>Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style= {customStyles} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="noteText" id="noteText" className='form-control' placeholder='Note text' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Submit</button>
          </div>
        </form>
      </Modal>

      {notes.map(note => (
        <NoteItem key={note._id} note={note}></NoteItem>
      ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
      )}
    </div>
  )
}
