import React from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTickets, reset} from '../features/tickets/ticketSlice';
import {Spinner} from '../components/Spinner';
import {BackButton} from '../components/BackButton';
import { TicketItem } from '../components/TicketItem';

export const Tickets = () => {
  const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets);

  const dispatch = useDispatch();



  useEffect(() => {
      dispatch(getTickets());
      return () => {
          if(isSuccess) {
              dispatch(reset());
          }
      }
  }, [dispatch, isSuccess])

  if (isLoading) return <Spinner></Spinner>

  return (
    <>
        <BackButton url='/'></BackButton>
        <h1>Tickets</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket}></TicketItem>
            ))}
        </div>
    </>
  )
}
