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
        <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">EDI-Documents</h1>
    {EDI_documents.length > 0 ? (
        EDI_documents.map(document => (
            <div key={document.id} className="mb-6 p-4 border rounded shadow">
                <h2 className="text-xl font-semibold">EDI {document.type} {document.partner.name}</h2>
                <p className="text-sm text-gray-600">
                    Template: {document.template ? "True" : "False"}
                </p>
                {document.structure.length > 0 ? (
                    document.structure.map(structure => (
                        <div key={structure.id} className="mt-4 p-4 border rounded bg-gray-50">
                            <h3 className="text-lg font-medium">{structure.name}</h3>
                            <p className="text-sm text-gray-600">
                                Template: {structure.template ? "True" : "False"}
                            </p>
                            <p className="text-sm mt-2">
                                Rules: 
                                <pre className="bg-gray-100 p-2 rounded mt-1">
                                    {JSON.stringify(structure.rules, null, 2)}
                                </pre>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-red-500 mt-2">No structure found</p>
                )}
            </div>
        ))
    ) : (
        <p className="text-red-500">No partnership available</p>
    )}
</div>
    );
};

export default EDI_Documents;