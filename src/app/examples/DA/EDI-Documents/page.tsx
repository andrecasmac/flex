"use client"
import React, { useState, useEffect } from 'react';
import { getEDIdocuments } from '@/da/EDI-Documents/edi-document-da';
import { EDI_Document } from '../../../../../types/DbTypes';

const EDI_Documents: React.FC = () => {
    const [EDI_documents, setEDI_documents] = useState<EDI_Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEDIdocuments();
                setEDI_documents(data);
            } catch(err) {
                setError("Failed to fetch EDI_Documents");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading) {
        return <p>Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (
        <div>
            <h1>EDI-Documents</h1>
            {EDI_documents.length > 0 ? (
                EDI_documents.map(document => (
                    <div key={document.id}>
                        <h2>Type: {document.type}</h2>
                        {document.template ? (<p>Template: True</p>):(<p>Template: False</p>)}
                        {document.structure.length > 0 ? (
                            document.structure.map(structure => (
                                <div key={structure.id}>
                                    <h3>{structure.name}</h3>
                                    {structure.template ? (<p>Template: True</p>):(<p>Template: False</p>)}
                                    <p>Rules: <pre>{JSON.stringify(structure.rules, null, 2)}</pre></p>
                                </div>
                            ))
                        ) : (
                            <p>No structure found</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No partnership available</p>
            )}
        </div>
    );
};

export default EDI_Documents;