"use client"
import React, { useState, useEffect } from 'react';
import { getAllClients } from '../../../da/Clients/client-da'; 

//Types should go in a separate file, but for the sake of the example, they are defined here
type Partner = {
  id: string;
  name: string;
  edi_version: string;
  delimiters: string;
  EOL: string;
  type_of_connection: string;
  PO_Test: any;
};

type AssociatedPartner = {
  id: string;
  partner: Partner | null;
};

type Client = {
  id: string;
  name: string;
  partnerships: AssociatedPartner | null;
};

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
            {client.partnerships ? (
              <div>
                <h3>Partnership</h3>
                <p>ID: {client.partnerships.id}</p>
                {client.partnerships.partner ? (
                  <div>
                    <h4>Partner Details</h4>
                    <p>Name: {client.partnerships.partner.name}</p>
                    <p>EDI Version: {client.partnerships.partner.edi_version}</p>
                    <p>Delimiters: {client.partnerships.partner.delimiters}</p>
                    <p>EOL: {client.partnerships.partner.EOL}</p>
                    <p>Type of Connection: {client.partnerships.partner.type_of_connection}</p>
                    <pre>PO Test: {JSON.stringify(client.partnerships.partner.PO_Test, null, 2)}</pre>
                  </div>
                ) : (
                  <p>No partner details available</p>
                )}
              </div>
            ) : (
              <p>No partnership available</p>
            )}
          </div>
        ))
      ) : (
        <p>No clients found</p>
      )}
    </div>
  );
};

export default ClientsList;
