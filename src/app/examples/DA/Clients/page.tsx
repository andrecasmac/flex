"use client"
import React, { useState, useEffect } from 'react';
import { getAllClients } from '../../../../da/Clients/client-da'; 
import { Client } from '../../../../types/DbTypes';

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-20">
      <h1>Clients</h1>
      {clients.length > 0 ? (
        clients.map(client => (
          <div key={client.id} className='border border-gray-300 p-5 mb-10'>
            <h2>{client.name}</h2>
            {client.partnerships.length > 0 ? (
              client.partnerships.map(partnership => (
                <div key={partnership.id}>
                  <h3>Partnership</h3>
                  <p>ID: {partnership.id}</p>
                  {partnership.partner ? (
                    <div>
                      <h4>Partner Details</h4>
                      <p>Name: {partnership.partner.name}</p>
                      <p>EDI Version: {partnership.partner.edi_version}</p>
                      <p>Delimiters: {partnership.partner.delimiters}</p>
                      <p>EOL: {partnership.partner.EOL}</p>
                      <p>Type of Connection: {partnership.partner.type_of_connection}</p>
                    </div>
                    ):(
                      <p>No partner available</p>
                    )
                  }
                </div>
              ))) : (
              <p>No partnership available</p>
              )
            }
          </div>
          )
        )
      ) : (
        <p>No clients found</p>
        )
      }
    </div>
  );
};

export default ClientsList;
