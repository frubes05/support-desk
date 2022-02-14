import React from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

export const Ticket = () => {
  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets);
  const {ticketId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  }, [isError, message, ticketId, dispatch])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket closed!');
    navigate('/tickets');
  }

  if (isError) return <h3>Something went wrong!</h3>

  if (isLoading) return <Spinner></Spinner>

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
      </header>
      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
      )}
    </div>
  )
}
