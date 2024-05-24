"use client"
import React, { useState, useEffect } from 'react';
import { getAllPartners } from '../../../da/Partners/partner-da'; // Adjust the import path according to your project structure

//Types should go in a separate file, but for the sake of the example, they are defined here
type EDI_Document = {
  id: string;
  type: string;
  template: boolean;
};

type Partner = {
  id: string;
  name: string;
  edi_version: string;
  delimiters: string;
  EOL: string;
  type_of_connection: string;
  PO_Test: any;
  EDI_documents: EDI_Document[];
};

const PartnersList: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPartners();
        setPartners(data);
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
    <div className='p-20'>
      <h1>Partners</h1>
      {partners.length > 0 ? (
        partners.map(partner => (
          <div key={partner.id} className='border border-gray-300 p-5 mb-10'>
            <h2>{partner.name}</h2>
            <p>EDI Version: {partner.edi_version}</p>
            <p>Delimiters: {partner.delimiters}</p>
            <p>EOL: {partner.EOL}</p>
            <p>Type of Connection: {partner.type_of_connection}</p>
            <pre>PO Test: {JSON.stringify(partner.PO_Test, null, 2)}</pre>
            <h3>EDI Documents</h3>
            {partner.EDI_documents.length > 0 ? (
              partner.EDI_documents.map(doc => (
                <div key={doc.id} className='mb-10'>
                  <p>Type: {doc.type}</p>
                  <p>Template: {doc.template ? 'Yes' : 'No'}</p>
                </div>
              ))
            ) : (
              <p>No EDI documents available</p>
            )}
          </div>
        ))
      ) : (
        <p>No partners found</p>
      )}
    </div>
  );
};

export default PartnersList;
