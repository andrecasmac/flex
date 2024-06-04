"use client"
import React, { useState, useEffect } from 'react';
import { getAllPartnerships } from '../../../../da/Partnerships/partnerships-da'; // Adjust the import path according to your project structure
import { AssociatedPartner } from '../../../../../types/DbTypes';

const PartnershipsList: React.FC = () => {
  const [partnerships, setPartnerships] = useState<AssociatedPartner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPartnerships();
        setPartnerships(data);
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
      <h1>Partnerships</h1>
      {partnerships.length > 0 ? (
        partnerships.map(partnership => (
          <div key={partnership.id} className='border border-gray-300 p-5 mb-10'>
            <h2>{partnership.client.name}-{partnership.partner?.name}</h2>
          </div>
        ))
      ) : (
        <p>No partnerships found</p>
      )}
    </div>
  );
};

export default PartnershipsList;
